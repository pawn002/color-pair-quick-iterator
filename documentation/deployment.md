# Deployment Guide

**Live URL**: https://pawn002.github.io/color-pair-quick-iterator/

The app is a static site on GitHub Pages, built by Vite and published by GitHub Actions.

## Deployment is automatic

Push to `main`. That is the whole procedure.

`.github/workflows/deploy.yml` runs on every push to `main`, and:

1. `npm ci`
2. `npm run typecheck` and `npm test` — a red build does not ship
3. `npm run build:gh-pages`
4. uploads `dist/` and publishes it via `actions/deploy-pages`

Authentication is OIDC with the built-in `GITHUB_TOKEN`. There are no stored secrets.

The workflow can also be run by hand from the Actions tab (`workflow_dispatch`), which is the way to redeploy an unchanged commit — after a Pages settings change, say — without an empty commit.

### Pages configuration

Repository **Settings → Pages** must have **Source: GitHub Actions**. Confirm from the CLI:

```bash
gh api repos/pawn002/color-pair-quick-iterator/pages --jq '.build_type'
# workflow
```

If that ever reads `legacy`, the site is being served from a branch instead, and **the deploy workflow will still report success while publishing nothing**. A green deploy job is not on its own evidence that the site updated — check `build_type` and fetch the live page.

### Why `build:gh-pages` and not `build`

The site is served from a repo subpath, not a domain root, so the build needs `--base=/color-pair-quick-iterator/`. Without it every asset URL resolves against `/` and the page loads blank. Plain `npm run build` is the portable build for hosting anywhere at a root.

## Verifying a deployment

```bash
# Which run deployed, and did it succeed
gh run list --workflow "Deploy to GitHub Pages" --limit 3

# Is the site actually up
curl -s -o /dev/null -w "%{http_code}\n" https://pawn002.github.io/color-pair-quick-iterator/
```

Then load the page and check the console is clean and the app renders a contrast score. A 200 alone only proves Pages served *something*.

## Rolling back

Revert the offending commit on `main` and push. The workflow redeploys from the new head.

```bash
git revert <commit>
git push origin main
```

There is no build output in the repository to restore — see below.

## History: the old manual flow

Until 2026-08-07 the built site was committed to a `docs/` directory on `main` and Pages served that directory. Deploying meant running a `deploy:gh-pages` script that rebuilt, copied into `docs/`, committed, and pushed.

Both the directory and the script are gone. If you find a reference to either, or to `angular.json` / `ng build`, it predates the Vite and Lit migrations and is wrong.

Reverting to that arrangement would mean restoring `docs/` from history *and* setting Pages back to `build_type=legacy`; the directory alone would do nothing.

## Local checks before pushing

The workflow runs these, but locally is cheaper than a red `main`:

```bash
npm run typecheck   # tsc --noEmit; `npm run build` does NOT type-check
npm test            # single vitest run, exits with a status code
npm run build       # verifies the bundle builds
```

To preview a production build:

```bash
npm run build && npx http-server dist -p 8080
```

Note `dist/`, not `docs/`. The `build:gh-pages` base path makes that output awkward to serve locally, so preview with the plain build.

## Releases

Pushing a `v*` tag triggers `.github/workflows/draft-release.yml`, which verifies the tag is on `main` and opens a **draft** release with notes generated from the commits since the previous tag. Drafts are not published automatically — review and publish from the Releases page.

```bash
npm version patch      # or minor / major
git push origin main --follow-tags
```

## Related

- [Architecture](./architecture.md) — build system and app structure
- [Getting Started](./getting-started.md) — local development
- [Testing](./testing.md) — the vitest suite
