#!/usr/bin/env node

// Simple script to check npm installation
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Checking npm installation...');

try {
  // Check npm version
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);

  // Check if package.json exists
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    console.log('✅ package.json found');
    
    // Try to install dependencies
    console.log('Installing dependencies with npm...');
    execSync('npm install --silent', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
    
    // Generate Prisma client
    console.log('Generating Prisma client...');
    execSync('npm run db:generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated successfully');
    
    // Run typecheck
    console.log('Running TypeScript typecheck...');
    execSync('npm run typecheck', { stdio: 'inherit' });
    console.log('✅ TypeScript typecheck passed');
    
    console.log('\n🎉 All checks passed! Project is ready to use with npm.');
  } else {
    console.log('❌ package.json not found');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}