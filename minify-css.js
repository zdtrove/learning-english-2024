const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'css');

if (!fs.existsSync(dir)) {
  process.exit(0);
}

fs.readdirSync(dir)
  .filter(f => f.endsWith('.css') && !f.endsWith('.min.css'))
  .forEach(file => {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(/\.css$/, '.min.css'));

    execSync(`npx cleancss "${input}" -o "${output}"`, { stdio: 'inherit' });
  });
