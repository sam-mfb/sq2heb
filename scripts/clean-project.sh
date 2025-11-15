#!/bin/bash

echo "🧹 Cleaning project directory..."
echo ""

# Remove ZIP files
if ls project/*.zip 1> /dev/null 2>&1; then
  echo "  Removing ZIP files..."
  rm -f project/*.zip
fi

# Run common AGI cleanup (without --keep-orig, so it removes orig/ too)
bash scripts/clean-agi.sh project

echo "✅ Cleanup complete!"
echo ""
echo "The project/ directory is now clean."
echo "Add a new ZIP file to project/ and run 'npm run setup' to start over."
