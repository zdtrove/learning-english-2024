const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'js');
const outputDir = path.join(__dirname, 'minify/js');

fs.readdirSync(inputDir)
  .filter(f => f.endsWith('.js') && !f.endsWith('.min.js'))
  .forEach(file => {
    const input = path.join(inputDir, file);
    const output = path.join(outputDir, file.replace(/\.js$/, '.min.js'));
    execSync(`npx terser "${input}" -o "${output}" -c -m`, { stdio: 'inherit' });
  });
