import * as core from '@actions/core';
import { getOctokit, context} from '@actions/github'
import { createBranch } from './create-branch';

async function run() {
  try {
    const branch = core.getInput('branch');
    const sha = core.getInput('sha');
    core.debug(`Creating branch ${branch}`);
    await createBranch(getOctokit, context, branch, sha)
  } catch (error: any) {
    core.setFailed(error.message);
  }
}
run();
