#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {  console.error('❌ Error: Please specify a project name or use "./" for current directory');
  console.log('');
  console.log('Usage:');
  console.log('  npx toolkit-react-cli my-app     # Create new project');
  console.log('  npx toolkit-react-cli ./         # Install in current directory');
  process.exit(1);
}

const currentDir = process.cwd();
let targetDir;
let isCurrentDir = false;

if (projectName === './') {
  targetDir = currentDir;
  isCurrentDir = true;
  console.log('🚀 Installing React Toolkit in current directory...');
} else {
  targetDir = path.join(currentDir, projectName);
  console.log(`🚀 Creating React project: ${projectName}`);
  
  // Check if directory already exists
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Error: Directory "${projectName}" already exists!`);
    process.exit(1);
  }
  
  // Create project directory
  fs.mkdirSync(targetDir, { recursive: true });
}

const templateDir = path.join(__dirname, '../template');

try {
  // Copy template files
  console.log('📁 Copying template files...');
  copyDirectory(templateDir, targetDir);
  
  // Update package.json with project name
  if (!isCurrentDir) {
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
  
  // Install dependencies
  console.log('📦 Installing dependencies...');
  process.chdir(targetDir);
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Success! React Toolkit project is ready!');
  console.log('');
  
  if (!isCurrentDir) {
    console.log(`📁 Project created in: ${projectName}`);
    console.log('');
    console.log('To get started:');
    console.log(`  cd ${projectName}`);
    console.log('  npm run dev');
  } else {
    console.log('🎯 Project setup complete in current directory!');
    console.log('');
    console.log('To get started:');
    console.log('  npm run dev');
  }
  
  console.log('');
  console.log('📚 What you get:');
  console.log('  ✅ React with Vite');
  console.log('  ✅ axios for HTTP requests');
  console.log('  ✅ react-router-dom for routing');
  console.log('  ✅ react-toastify for notifications');
  console.log('  ✅ Tailwind CSS for styling');
  console.log('  ✅ React Toolkit utilities');
  console.log('');
  console.log('🚀 Happy coding!');
  
} catch (error) {
  console.error('❌ Error during setup:', error.message);
  process.exit(1);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.error('❌ Template directory not found!');
    process.exit(1);
  }
  
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
