# Create Branch GitHub Action

This action creates a new branch with the same commit reference as the branch it is being ran on, or your chosen reference when specified.

## Inputs

### `branch`

**Optional** The name of the branch to create. Default `"release-candidate"`. If your branch conains forward slashes (`/`) use the full branch reference. Instead of `/long/branch/name` use `refs/heads/long/branch/name`. It's an issue with the GitHub API https://gist.github.com/jasonrudolph/10727108

### `sha`

**Optional** The SHA1 value for the branch reference.

## Outputs

### `created` 

***WARNING. DEPRECATED. USE BRANCH_CREATED ENVIRONMENT VARIABLE***

Boolean value representing whether or not a new branch was created.

## Environment Variables Set

### `BRANCH_CREATED`

Boolean value representing whether or not a new branch was created. This environment variable can be used in susequent steps in your workflow.

## Example usage

```
uses: peterjgrainger/action-create-branch@v2.2.0
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
with:
  branch: 'release-notes'
  sha: '${{ github.event.pull_request.head.sha }}'
```
