#!/bin/bash

echo "🧹 Cleaning project directory..."
echo ""

# Remove ZIP files
if ls project/*.zip 1> /dev/null 2>&1; then
  echo "  Removing ZIP files..."
  rm -f project/*.zip
fi

# Remove extracted directories
if [ -d "project/orig" ]; then
  echo "  Removing project/orig/..."
  rm -rf project/orig
fi

if [ -d "project/src" ]; then
  echo "  Removing project/src/..."
  rm -rf project/src
fi

if [ -d "project/build" ]; then
  echo "  Removing project/build/..."
  rm -rf project/build
fi

# Remove viewer resources
if [ -d "viewer/public/resources" ]; then
  echo "  Removing viewer/public/resources/..."
  rm -rf viewer/public/resources
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "The project/ directory is now clean."
echo "Add a new ZIP file to project/ and run 'npm run setup' to start over."
