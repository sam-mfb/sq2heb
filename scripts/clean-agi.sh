#!/bin/bash

# Usage: clean-agi.sh <directory> [--keep-orig]
# Example: clean-agi.sh project
# Example: clean-agi.sh example --keep-orig

DIR=$1
KEEP_ORIG=false

if [ -z "$DIR" ]; then
  echo "❌ Error: No directory specified"
  echo "Usage: $0 <directory> [--keep-orig]"
  exit 1
fi

# Check for --keep-orig flag
if [ "$2" = "--keep-orig" ]; then
  KEEP_ORIG=true
fi

echo "🧹 Cleaning $DIR directory..."
echo ""

# Remove extracted directories
if [ "$KEEP_ORIG" = false ] && [ -d "$DIR/orig" ]; then
  echo "  Removing $DIR/orig/..."
  rm -rf "$DIR/orig"
fi

if [ -d "$DIR/src" ]; then
  echo "  Removing $DIR/src/..."
  rm -rf "$DIR/src"
fi

if [ -d "$DIR/build" ]; then
  echo "  Removing $DIR/build/..."
  rm -rf "$DIR/build"
fi

# Remove viewer resources
if [ -d "viewer/public/resources" ]; then
  echo "  Removing viewer/public/resources/..."
  rm -rf viewer/public/resources
fi

echo ""
