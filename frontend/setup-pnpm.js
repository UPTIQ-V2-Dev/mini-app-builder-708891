#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const { existsSync, unlinkSync } = require('fs');
const path = require('path');

console.log('🔍 Checking for pnpm...');

// Check if pnpm is available
function isPnpmAvailable() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Install pnpm using npm
function installPnpm() {
  console.log('📦 Installing pnpm globally...');
  try {
    execSync('npm install -g pnpm', { stdio: 'inherit' });
    console.log('✅ pnpm installed successfully!');
    return true;
  } catch (error) {
    console.log('❌ Failed to install pnpm globally');
    return false;
  }
}

// Use npm instead
function useNpm() {
  console.log('🔄 Using npm instead of pnpm...');
  
  // Remove pnpm-lock.yaml if it exists
  const lockFile = path.join(__dirname, 'pnpm-lock.yaml');
  if (existsSync(lockFile)) {
    console.log('🗑️  Removing pnpm-lock.yaml...');
    unlinkSync(lockFile);
  }
  
  // Install with npm
  console.log('📦 Installing dependencies with npm...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully with npm!');
    
    console.log('\n🎉 Setup complete! You can now run:');
    console.log('   npm run dev    - Start development server');
    console.log('   npm run build  - Build for production');
    
    return true;
  } catch (error) {
    console.log('❌ Failed to install dependencies with npm');
    return false;
  }
}

// Main logic
if (isPnpmAvailable()) {
  console.log('✅ pnpm is available');
  console.log('You can use: pnpm install && pnpm run build');
} else {
  console.log('❌ pnpm is not available');
  
  // Try to install pnpm first
  if (!installPnpm()) {
    // If pnpm installation fails, use npm
    console.log('🔄 Falling back to npm...');
    useNpm();
  }
}