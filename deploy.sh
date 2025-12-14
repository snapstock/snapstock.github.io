#!/usr/bin/env bash
set -euo pipefail

BRANCH_NAME="${1:-static-build}"
BUILD_DIR="out"
REMOTE_NAME="origin"

# Clean check
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree not clean. Commit/stash first."
  exit 1
fi

# Build (your pnpm build succeeded ✅)
pnpm build

if [ ! -d "$BUILD_DIR" ]; then
  echo "No '$BUILD_DIR' found after build."
  exit 1
fi

# Clean up old worktree/branch SAFELY
if git worktree list | grep -q "/tmp/static-build"; then
  git worktree remove /tmp/static-build
fi

# Delete branch only if it exists and we're not on it
if git show-ref --verify --quiet refs/heads/"$BRANCH_NAME" && [ "$(git rev-parse --abbrev-ref HEAD)" != "$BRANCH_NAME" ]; then
  git branch -D "$BRANCH_NAME"
fi

# Create FRESH worktree from CURRENT commit
git checkout --orphan temp-static
git rm -rf .
git commit --allow-empty -m "temp: base for static"
git branch -D temp-static

git worktree add /tmp/static-build "$BRANCH_NAME"

# Switch to worktree and populate
cd /tmp/static-build

# Clear everything but keep .git intact
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true

# Copy ONLY static files
rsync -av --delete "$BUILD_DIR/." ./ \
  --exclude='.git' --prune-empty-dirs

# Commit & force push
git add .
git commit -m "Static build $(date -Iseconds) [skip ci]"
git push "$REMOTE_NAME" "$BRANCH_NAME" --force-with-lease

echo "✅ Static branch '$BRANCH_NAME' pushed successfully!"
cd -
git worktree prune  # cleanup
