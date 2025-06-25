#!/bin/sh

# Build script for cursor-jason-demo
# POSIX compatible shell script

set -e  # Exit on any error

echo "Building cursor-jason-demo..."

# Build client library
echo "Building client library..."
npx parcel build src-lib/lib-client.ts --target lib-client

# Build server library
echo "Building server library..."
npx parcel build src-lib/lib-server.ts --target lib-server

# Build server
echo "Building server..."
npx parcel build src/server/index.ts --target server

# Copy assets to client directory
echo "Copying assets..."
if [ -d "src-assets" ]; then
    cp -r src-assets/* src/client/ 2>/dev/null || true
else
    echo "src-assets directory not found, skipping asset copy"
fi

# Build client
echo "Building client..."
npx parcel build src/client/index.html --target client

echo "Build complete!"
echo "Starting server..."
node _dist/server/index.js 