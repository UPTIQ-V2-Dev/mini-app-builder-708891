#!/bin/bash

# Check if pnpm is available, otherwise use npm
if command -v pnpm &> /dev/null; then
    pnpm build
else
    echo "pnpm not found, using npm instead..."
    npm run build
fi