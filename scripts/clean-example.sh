#!/bin/bash

echo "🧹 Cleaning example directory..."
echo ""

# Run common AGI cleanup with --keep-orig flag to preserve example/orig/
bash scripts/clean-agi.sh example --keep-orig

echo "✅ Cleanup complete!"
echo ""
echo "The example/src/ and example/build/ directories have been removed."
echo "The example/orig/ directory has been preserved (it's committed to version control)."
echo "Run 'npm run example:setup' to re-extract resources."
