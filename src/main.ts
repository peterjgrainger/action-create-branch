import * as core from '@actions/core';
import { GitHub, context} from '@actions/github'
import { createBranch } from './create-branch';

async function run() {
  try {
    const branch = core.getInput('branch');
    const sha = core.getInput('sha');
    core.debug(`Creating branch ${branch}`);
    await createBranch(GitHub, context, branch, sha)
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
