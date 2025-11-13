#!/bin/bash

# Remove pnpm-lock.yaml if it exists
if [ -f "pnpm-lock.yaml" ]; then
    echo "Removing pnpm-lock.yaml..."
    rm pnpm-lock.yaml
fi

# Install with npm
echo "Installing dependencies with npm..."
npm install

echo "Installation complete!"