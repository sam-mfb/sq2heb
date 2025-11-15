#!/bin/bash

set -e  # Exit on error

# Usage: setup-agi.sh <directory>
# Example: setup-agi.sh project
# Example: setup-agi.sh example

DIR=$1

if [ -z "$DIR" ]; then
  echo "❌ Error: No directory specified"
  echo "Usage: $0 <directory>"
  exit 1
fi

if [ ! -d "$DIR" ]; then
  echo "❌ Error: $DIR/ directory not found"
  exit 1
fi

if [ ! -d "$DIR/orig" ]; then
  echo "❌ Error: $DIR/orig/ directory not found"
  echo "Please ensure $DIR/orig/ contains AGI game files"
  exit 1
fi

echo "🔧 Extracting AGI resources with agikit..."
npx agikit extract "$DIR/orig/" "$DIR/"

if [ ! -d "$DIR/src" ]; then
  echo "❌ Error: agikit extraction failed - $DIR/src not created"
  exit 1
fi

echo "✓ Extracted resources to $DIR/src/"
echo ""

# Create build directory
echo "📁 Creating build directory..."
mkdir -p "$DIR/build"
echo "✓ Created $DIR/build/"
echo ""

# Copy resources to viewer
echo "🖼️  Copying resources to viewer..."
mkdir -p viewer/public/resources
cp -r "$DIR/src"/* viewer/public/resources/

# Create manifest.json
echo "📋 Creating resource manifest..."
node scripts/create-manifest.js

echo "✓ Resources copied to viewer/public/resources/"
echo ""
