#!/bin/bash

set -e  # Exit on error

echo "🎮 Example AGI Project Setup"
echo "============================"
echo ""

# Check if example directory exists
if [ ! -d "example" ]; then
  echo "❌ Error: example/ directory not found"
  exit 1
fi

# Check if orig exists
if [ ! -d "example/orig" ]; then
  echo "❌ Error: example/orig/ directory not found"
  echo "The example project should have pre-compiled AGI files in example/orig/"
  exit 1
fi

echo "✓ Found example AGI files in example/orig/"
echo ""

# Clean up existing directories (keep orig/ intact)
echo "🧹 Cleaning up old files..."
rm -rf example/src example/build viewer/public/resources

# Run common AGI setup
bash scripts/setup-agi.sh example

echo "✅ Setup complete!"
echo ""
echo "You can now:"
echo "  • Run the viewer: npm run viewer:dev"
echo "  • Build the example: npm run example:build"
