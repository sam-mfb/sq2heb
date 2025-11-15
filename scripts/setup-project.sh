#!/bin/bash

set -e  # Exit on error

echo "🎮 Space Quest 2 Project Setup"
echo "================================"
echo ""

# Check if project directory exists
if [ ! -d "project" ]; then
  echo "❌ Error: project/ directory not found"
  exit 1
fi

# Find ZIP file in project/
ZIP_FILE=$(find project -maxdepth 1 -name "*.zip" | head -n 1)

if [ -z "$ZIP_FILE" ]; then
  echo "❌ Error: No ZIP file found in project/ directory"
  echo ""
  echo "Please add your Space Quest 2 game files as a ZIP archive to the project/ directory."
  echo "See project/README.md for instructions."
  exit 1
fi

echo "✓ Found game archive: $ZIP_FILE"
echo ""

# Clean up existing directories
echo "🧹 Cleaning up old files..."
rm -rf project/orig project/src project/build viewer/public/resources

# Extract ZIP to project/orig
echo "📦 Extracting game files..."
mkdir -p project/orig
unzip -q "$ZIP_FILE" -d project/orig

# Verify extraction
if [ ! -d "project/orig" ] || [ -z "$(ls -A project/orig)" ]; then
  echo "❌ Error: Failed to extract ZIP file"
  exit 1
fi

# Check if files are in a subdirectory and move them up if needed
SUBDIR=$(find project/orig -mindepth 1 -maxdepth 1 -type d | head -n 1)
if [ -n "$SUBDIR" ] && [ -z "$(find project/orig -mindepth 1 -maxdepth 1 -type f)" ]; then
  echo "📁 Moving files from subdirectory to root..."
  mv "$SUBDIR"/* project/orig/
  rmdir "$SUBDIR"
fi

echo "✓ Extracted to project/orig/"
echo ""

# Run common AGI setup
bash scripts/setup-agi.sh project

echo "✅ Setup complete!"
echo ""
echo "You can now:"
echo "  • Run the viewer: npm run viewer:dev"
echo "  • Build the game: npm run build"
