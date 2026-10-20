# Dependabot automation

Dependabot checks npm/Yarn dependencies and GitHub Actions weekly. It targets the
repository default branch, currently `master`. The automation approves and enables
squash auto-merge for verified Dependabot patch, minor, and major updates after
CI passes. Unknown update types require manual review.

## One-time GitHub repository settings

These settings are stored on GitHub and cannot be enabled by committing files:

1. Settings → General → Pull Requests: enable **Allow auto-merge** and
   **Allow squash merging**.
2. Settings → Actions → General → Workflow permissions: enable
   **Allow GitHub Actions to create and approve pull requests**. Job permissions
   are explicitly scoped in the workflows; the default token can remain read-only.
3. After the first CI run, Settings → Branches: add a **branch protection
   rule** for `master`. Require a pull request, at least one approval, and status
   checks; select **Build and test** from the CI workflow (GitHub Actions as the
   expected source). Enable **Dismiss stale pull request approvals when new
   commits are pushed** and preferably require branches to be up to date.
   Do not grant the automation a bypass of these requirements.
4. Settings → Advanced Security (or Code security): enable Dependabot alerts and
   security updates if desired. The checked-in configuration enables scheduled
   version updates; security update switches are separate repository settings.

The workflow waits for a successful run of `ci.yml` for the exact PR head commit
before approving or enabling auto-merge. Failed, cancelled, missing or timed-out
CI never reaches approval/merge. Branch protection remains recommended to enforce
the same checks for all PRs and later updates. Other requirements (CODEOWNERS,
extra approvals, merge queues, etc.) can still require human action. If an
organization policy blocks approvals, resolve that setting rather than adding a
personal access token or bypass.

CI uses Node 22, Yarn 1.22.22, the frozen lockfile, lint/build, and the existing
Karma browser tests with ChromeHeadless. It runs on every PR to master, including
major updates, with a read-only token and no saved checkout credentials.
The privileged pull_request_target workflow never checks out or executes PR code,
uses a pinned metadata action with verification enabled, approves the event's
exact commit, and matches that commit before requesting auto-merge. No PAT needed.

After these files land on master and settings are ready, new or updated Dependabot
PRs trigger automation. For an existing PR, close/reopen it or ask Dependabot to
rebase it to trigger another run. Major updates follow the same CI gate as patch/minor updates.
