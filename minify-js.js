const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'js');

fs.readdirSync(dir)
  .filter(f => f.endsWith('.js') && !f.endsWith('.min.js'))
  .forEach(file => {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(/\.js$/, '.min.js'));
    execSync(`npx terser "${input}" -o "${output}" -c -m`, { stdio: 'inherit' });
  });
