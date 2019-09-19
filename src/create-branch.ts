import { Context } from "@actions/github/lib/context";
import { GitHub } from "@actions/github";

export async function createBranch(github: any, context: Context, branch: string) {
  const toolkit : GitHub = new github(githubToken())
  await toolkit.git.createRef({
    ref: `refs/heads/${branch}`,
    sha: context.sha,
    ...context.repo
  })
}

function githubToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token)
    throw ReferenceError('No token defined in the environment variables');
  return token;
}
