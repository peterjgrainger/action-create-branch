import * as core from '@actions/core';
import { GitHub, context} from '@actions/github'
import { createBranch } from './create-branch';

async function run() {
  try {
    const myInput = core.getInput('branch');
    await createBranch(GitHub, context, myInput)
    core.debug(`Hello ${myInput}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
