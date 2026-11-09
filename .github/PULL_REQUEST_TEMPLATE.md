## Issue: https://github.com/elastic/REPO/issues/NUMBER

<!-- REPLACE THE LINE ABOVE with the full URL of the issue this PR solves,
for example https://github.com/elastic/some-repo/issues/123.
Always use the full URL, not just `#123`, so the link resolves even when the
issue lives in another repository. Do not merge this PR with the placeholder
URL still in place. -->

<!-- Provide a general description of the code changes in your pull request.

If this is an ad-hoc/trivial change and does not have a corresponding
issue, please describe your changes in enough detail, so that reviewers
and other team members can understand the reasoning behind the pull request. -->

## Checklists

<!-- You can remove unrelated items from checklists below and/or add new
items that may help during the review. -->

#### Pre-Review Checklist
- [ ] This PR does NOT contain credentials of any kind, such as API keys or engine keys
- [ ] Changed code is covered with tests (`yarn install && yarn test`)
- [ ] Tested the changes locally
- [ ] `version` in `package.json` bumped if this changes the published package (dependency, fix or feature)
- [ ] Considered corresponding documentation changes (`README.md`)

#### Changes Requiring Extra Attention

<!-- Please call out any changes that require special attention from the
reviewers and/or increase the risk to availability or security of the
system after deployment. Remove the ones that don't apply. -->

- [ ] Security-related changes (dependency CVEs, encryption, TLS, etc)
- [ ] New external dependencies added, or `resolutions` changed in `package.json` (`resolutions` is honored by yarn only, not by `npm install`)

<!--
## Related Pull Requests

* https://github.com/elastic/.../pull/123
-->
