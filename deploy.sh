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

# Build
pnpm build  # or npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "No '$BUILD_DIR' found after build."
  exit 1
fi

# Remove old branch/worktree if exists
git worktree remove /tmp/static-build 2>/dev/null || true
git branch -D "$BRANCH_NAME" 2>/dev/null || true

# Create fresh worktree from current commit
git worktree add /tmp/static-build "$BRANCH_NAME"

# Clear worktree but PRESERVE .git
cd /tmp/static-build
git rm -rf . 2>/dev/null || true
git commit --allow-empty -m "Clear for static build" || true

# Sync ONLY static files (exclude .git and source)
rsync -av --delete \
  --exclude='.git' \
  --exclude='*.ts*' --exclude='*.tsx' --exclude='*.js*' --exclude='*.jsx' \
  --exclude='*.json' --exclude='*.yaml' --exclude='*.yml' \
  --exclude='*.css' --exclude='*.scss' --exclude='package*' \
  --exclude='next.config*' --exclude='tsconfig*' --exclude='.env*' \
  --exclude='*.md' --exclude='*.sh' --exclude='.gitignore' \
  "$BUILD_DIR/" ./

# Commit & push
git add .
git commit -m "Static build $(date -Iseconds)" || echo "No changes."
git push "$REMOTE_NAME" "$BRANCH_NAME" --force

echo "✅ Static branch '$BRANCH_NAME' pushed to $REMOTE_NAME"
cd -  # back to original dir
