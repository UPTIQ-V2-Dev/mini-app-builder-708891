#!/bin/bash

# Check if pnpm is available, otherwise use npm
if command -v pnpm &> /dev/null; then
    pnpm install
else
    echo "pnpm not found, using npm instead..."
    # Remove pnpm-lock.yaml if it exists to avoid conflicts
    [ -f pnpm-lock.yaml ] && rm pnpm-lock.yaml
    npm install
fi