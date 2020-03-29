import {createBranch} from '../src/create-branch'
import { readFileSync } from 'fs';
import { context } from '@actions/github';

describe('Create a branch based on the input', () => {

  let githubMock;
  let contextMock;
  let branch = 'release-v1';
  let octokitMock;

  beforeEach(()=> {
    octokitMock = {
      git: {
        createRef: jest.fn()
      },
      repos: {
        getBranch: jest.fn()
      }
    }
  })

  beforeEach(()=> {
    githubMock = jest.fn().mockImplementation(() => {
      return octokitMock;
    })
  })

  beforeEach(() => {
    contextMock = JSON.parse(readFileSync('__tests__/context.json', 'utf8'))
  })

  beforeEach(() => {
    process.env.GITHUB_TOKEN = 'token'
  })

  it('gets a branch', async () => {
    octokitMock.repos.getBranch.mockRejectedValue(new HttpError())
    process.env.GITHUB_REPOSITORY = 'peterjgrainger/test-action-changelog-reminder'
    await createBranch(githubMock, context, branch)
    expect(octokitMock.repos.getBranch).toHaveBeenCalledWith({
      repo: 'test-action-changelog-reminder',
      owner: 'peterjgrainger',
      branch
    })
  })


  it('Create new branch if not already there', async () => {
    octokitMock.repos.getBranch.mockRejectedValue(new HttpError())
    await createBranch(githubMock, contextMock, branch)
    expect(octokitMock.git.createRef).toHaveBeenCalledWith({
      ref: 'refs/heads/release-v1',
      sha: 'ebb4992dc72451c1c6c99e1cce9d741ec0b5b7d7'
    })
  });

  it('fails if github token isn\'t defined', async() => {
    delete process.env.GITHUB_TOKEN
    expect.assertions(1);
    try {
      await createBranch(githubMock, contextMock, branch)
    } catch (error) {
      expect(error).toEqual(new ReferenceError('No token defined in the environment variables'))
    }
  })
});

class HttpError extends Error {
  name = 'HttpError'
  status = 404
}
