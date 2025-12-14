#!/usr/bin/env bash
set -euo pipefail

BRANCH_NAME="${1:-gh-pages}"
BUILD_DIR="out"

echo "1. Building static site..."
pnpm build

[ -d "$BUILD_DIR" ] || { echo "❌ No $BUILD_DIR found"; exit 1; }

echo "2. Creating new branch '$BRANCH_NAME'..."
git checkout --orphan "$BRANCH_NAME"
git rm -rf . 2>/dev/null || true

echo "3. Copying ./out/* to branch root..."
rsync -av --delete "$BUILD_DIR/." ./

echo "4. Committing and pushing..."
git add .
git commit -m "Static deploy $(date -Iseconds) [skip ci]"
git push origin "$BRANCH_NAME" --force-with-lease

echo "5. Returning to main branch..."
git checkout main  # or master

echo "6. Cleaning up branch..."
git branch -D "$BRANCH_NAME"

echo "✅ Done! Static files were temporarily on '$BRANCH_NAME' and cleaned up."
