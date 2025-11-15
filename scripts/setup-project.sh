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

# Run agikit extraction
echo "🔧 Extracting AGI resources with agikit..."
npx agikit extract project/orig/ project/

if [ ! -d "project/src" ]; then
  echo "❌ Error: agikit extraction failed - project/src not created"
  exit 1
fi

echo "✓ Extracted resources to project/src/"
echo ""

# Create build directory
echo "📁 Creating build directory..."
mkdir -p project/build
echo "✓ Created project/build/"
echo ""

# Copy resources to viewer
echo "🖼️  Copying resources to viewer..."
mkdir -p viewer/public/resources
cp -r project/src/* viewer/public/resources/

# Create manifest.json
echo "📋 Creating resource manifest..."
node scripts/create-manifest.js

echo "✓ Resources copied to viewer/public/resources/"
echo ""

echo "✅ Setup complete!"
echo ""
echo "You can now:"
echo "  • Run the viewer: npm run viewer:dev"
echo "  • Build the game: npm run build"
