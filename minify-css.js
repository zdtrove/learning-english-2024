const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'css');
const outputDir = path.join(__dirname, 'minify/css');

fs.readdirSync(inputDir)
  .filter(f => f.endsWith('.css') && !f.endsWith('.min.css'))
  .forEach(file => {
    const input = path.join(inputDir, file);
    const output = path.join(outputDir, file.replace(/\.css$/, '.min.css'));

    execSync(`npx cleancss "${input}" -o "${output}"`, { stdio: 'inherit' });
  });
