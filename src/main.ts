import * as core from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { createBranch } from './create-branch';

async function run() {
  try {
    const branch = core.getInput('branch');
    const sha = core.getInput('sha');
    core.debug(`Creating branch ${branch}`);
    const isCreated = await createBranch(getOctokit, context, branch, sha);
    core.setOutput('created', Boolean(isCreated));
    core.warning('Deprecation warning: If you are using the created output, this will be removed in future versions. Please use the BRANCH_CREATED environment variable instead.');
    core.exportVariable('BRANCH_CREATED', Boolean(isCreated));
  } catch (error: any) {
    core.setFailed(error.message);
  }
}
run();
