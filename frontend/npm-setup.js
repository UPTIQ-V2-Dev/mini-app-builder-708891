#!/usr/bin/env node

/**
 * Simple npm setup script to replace pnpm functionality
 * This script ensures the project works with npm instead of pnpm
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Setting up project for npm...\n');

// Remove pnpm lock file if it exists
const pnpmLock = path.join(__dirname, 'pnpm-lock.yaml');
if (fs.existsSync(pnpmLock)) {
    console.log('📁 Removing pnpm-lock.yaml...');
    fs.unlinkSync(pnpmLock);
    console.log('✅ pnpm-lock.yaml removed\n');
}

// Check if npm is available
try {
    execSync('npm --version', { stdio: 'ignore' });
    console.log('✅ npm is available');
} catch (error) {
    console.error('❌ npm is not available. Please install Node.js and npm.');
    process.exit(1);
}

// Install dependencies with npm
console.log('\n📦 Installing dependencies with npm...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('\n✅ Dependencies installed successfully!');
} catch (error) {
    console.error('\n❌ Failed to install dependencies');
    process.exit(1);
}

console.log('\n🎉 Setup complete!');
console.log('\nYou can now run:');
console.log('  npm run dev    - Start development server');
console.log('  npm run build  - Build for production');
console.log('  npm run preview - Preview production build');

console.log('\n📖 For more help, see README.md or SETUP.md');