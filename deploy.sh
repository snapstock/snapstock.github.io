#!/usr/bin/env bash
set -euo pipefail

BRANCH_NAME="static-build"     # or pass in as $1
BUILD_DIR="out"                # where Next.js exports static files
REMOTE_NAME="origin"           # change if needed

# Ensure clean worktree
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree not clean. Commit or stash changes first."
  exit 1
fi

# Build static site
npm run build                  # or: pnpm build / yarn build
# If you use pages router + export, use instead:
# npm run build && npm run export

if [ ! -d "$BUILD_DIR" ]; then
  echo "Build directory '$BUILD_DIR' not found."
  exit 1
fi

# Create a temporary worktree for the static branch
git worktree add /tmp/static-build "$BRANCH_NAME" 2>/dev/null || {
  git branch "$BRANCH_NAME" || true
  git worktree add /tmp/static-build "$BRANCH_NAME"
}

# Sync build output into the worktree
rsync -av --delete "$BUILD_DIR"/ /tmp/static-build/

cd /tmp/static-build

# Commit and push
git add .
git commit -m "Update static build $(date -Iseconds)" || echo "No changes to commit."
git push "$REMOTE_NAME" "$BRANCH_NAME"

echo "Static site branch '$BRANCH_NAME' updated and pushed."
