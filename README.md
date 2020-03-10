# Create Branch Github Action

This action creates a new branch with the same commit reference as the branch it is being ran on.

## Inputs

### `branch`

**Optional** The name of the branch to create. Default `"release-candidate"`.

## Example usage

```
uses: peterjgrainger/action-create-branch@v1.0.0
env: 
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
with:
  branch: 'release-notes'
```
