# Codex Handoff

## Project and task

- Project: [billorcutt/Cracked](https://github.com/billorcutt/Cracked), an MIT-licensed Electron/Web Audio music application.
- Task: modernize the application for current Electron and native Apple silicon, restore broken Themes and Help > Examples/Demos behavior, update packaging/notarization, and contribute the work upstream.
- Public fork: [davidhminor/Cracked](https://github.com/davidhminor/Cracked).

## Git state

- Current branch: `agent/modernize-electron-apple-silicon`.
- Base branch: `upstream/master` at `26dd88e` (`0.2.22`).
- `origin`: `https://github.com/davidhminor/Cracked.git`.
- `upstream`: `https://github.com/billorcutt/Cracked.git`.
- The topic branch tracks `origin/agent/modernize-electron-apple-silicon`.
- The working tree was clean before this handoff file was added. `CODEX_HANDOFF.md` is intentionally uncommitted at handoff creation.

## Commits created

- `01efc61c1882cd7e3b30f0697f76443fb603f39a` - `Modernize Electron and Apple silicon support`.

## GitHub pull request and issues

- Draft PR: [billorcutt/Cracked#29 - Modernize Electron and restore Apple silicon support](https://github.com/billorcutt/Cracked/pull/29).
- Verified PR state on 2026-08-10: open, draft, mergeable, one commit, eight changed files, targeting `billorcutt/Cracked:master` from `davidhminor:agent/modernize-electron-apple-silicon`.
- No upstream issue is linked to this work, and a search found no matching open issue for the Apple silicon, Electron, Themes, Examples, or Demos changes.
- Maintainer response: Bill Orcutt acknowledged the PR and said he would review it. No review decision or requested changes have been posted.

## Files changed in PR #29

- `.gitignore` - ignore the local build cache.
- `README.md` - document Node.js 22.12+, the smoke test, Apple silicon packaging, and the Intel target.
- `app/index.js` - replace removed `electron.remote` access with `@electron/remote`.
- `main.js` - initialize/enable `@electron/remote`, wait for renderer readiness before restoring themes or opening files, and add the smoke-test path.
- `package-lock.json` - regenerate the dependency lock for the modern package set and npm lockfile format.
- `package.json` - update Electron/build dependencies and scripts while retaining version `0.2.22` for the maintainer to control releases.
- `scripts/make-dmg.sh` - add Apple silicon DMG creation.
- `scripts/notarize.js` - migrate to `@electron/notarize` and current Apple credential environment-variable names.

PR totals: 3,909 additions and 2,510 deletions. Most of the volume is the npm lockfile-format and dependency update.

## Important decisions

- Kept the contribution as one cohesive commit because the Electron runtime, `@electron/remote` compatibility changes, dependency lockfile, functional fixes, and packaging changes depend on one another.
- Removed the local `0.2.23` version bump; upstream should choose the release version.
- Made `npm run package` target macOS ARM64 and retained `npm run package-mac-intel` for Intel builds.
- Used `did-finish-load` before executing renderer code. This fixes the race that made Themes and Examples/Demos appear nonfunctional.
- Used `@electron/remote` as a minimal compatibility bridge for the legacy architecture rather than attempting a larger preload/IPC rewrite.
- Kept the root MIT license and original copyright notice unchanged.
- Excluded personal audio, generated binaries, dependency caches, alternate package-manager residue, credentials, and the separately authored handbook from the PR.
- Published source through a GitHub fork to preserve upstream history and attribution.

## Tests and checks

- Native Apple silicon app built and ran successfully during development.
- Manually verified that Themes change the editor appearance.
- Manually verified that bundled Examples and Demos open and load their source.
- The automated smoke test completed successfully during development, covering editor initialization, theme selection, and bundled Demo loading.
- JavaScript syntax checks passed for `main.js`, `app/index.js`, and `scripts/notarize.js` using `node --check`.
- Shell syntax check passed for `scripts/make-dmg.sh` using `/bin/sh -n`.
- `git diff --check` passed before commit.
- GitHub confirms that PR #29 is currently mergeable.

## Unresolved problems and limitations

- PR #29 remains a draft and is awaiting maintainer review.
- Intel macOS and Linux builds have not been tested.
- There is no repository CI workflow providing cross-platform build or smoke-test coverage.
- A later attempt to repeat the GUI smoke test inside the Codex sandbox was aborted by GUI sandbox restrictions; this was an environment limitation, not a smoke-test assertion failure.
- A later fresh package attempt was stopped after the unusually large local dependency/cache tree made packaging stall. The earlier clean-source Apple silicon package succeeded.
- `@electron/remote`, `nodeIntegration: true`, `contextIsolation: false`, and `webSecurity: false` preserve the legacy execution model. A future security-focused rewrite should replace remote renderer access with a preload script and explicit IPC, but that was intentionally kept outside this compatibility PR.
- Notarization requires the maintainer's own Apple developer credentials. No credentials are stored in the repository.
- The separate handbook is not included in the fork or PR and contains local-use documentation that should be sanitized and licensed before any separate public release.

## Recommended next steps

1. Monitor [PR #29](https://github.com/billorcutt/Cracked/pull/29) for review comments or requested changes.
2. Address maintainer feedback on the existing topic branch and push follow-up commits to the same branch so the PR updates automatically.
3. Test `npm run package-mac-intel` on Intel hardware or under an appropriate CI runner.
4. Test the Linux start and packaging paths on Linux.
5. Add a small CI workflow for syntax checks and, where practical, platform packaging checks.
6. When the maintainer is satisfied, mark the PR ready for review unless the maintainer has already done so or prefers to merge the draft directly.
7. Keep the public fork synchronized with `upstream/master` after the PR is merged or otherwise resolved.
8. Treat the preload/IPC security migration and public handbook release as separate future work rather than expanding PR #29.
