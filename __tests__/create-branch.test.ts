import {createBranch} from '../src/create-branch'
import { readFileSync } from 'fs';

describe('Create a branch based on the input', () => {

  let githubMock;
  let contextMock;
  let branch = 'release-v1';
  let octokitMock;

  beforeEach(()=> {
    octokitMock = {
      git: {
        createRef: jest.fn()
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


  it('Create new branch', async () => {
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
