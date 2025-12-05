const string = `

`;

function replaceNewlineWithBr(str) {
  return str.replace(/\n/g, '<br/> ');
}

let newString = replaceNewlineWithBr(string);
newString = newString.split(' ');
const arrayFilter = newString.filter(item => item !== '');
const arrayHtml = arrayFilter.map((item) => {
  let lastChar = '';
  if (item.endsWith('.') || item.endsWith(',') || item.endsWith('!') || item.endsWith('?') || item.endsWith(':')) {
    lastChar = item.slice(-1);
    item = item.slice(0, -1);
  }

  if (item.endsWith('.<br/>') || item.endsWith(',<br/>') || item.endsWith('!<br/>') || item.endsWith('?<br/>') || item.endsWith(':<br/>')) {
    lastChar = item.slice(-6);
    item = item.slice(0, -6);
  }

  if (item.endsWith('<br/>')) {
    item = `${item}\n`;
  }

  if (lastChar.endsWith('.<br/>') || lastChar.endsWith(',<br/>') || lastChar.endsWith('!<br/>') || lastChar.endsWith('?<br/>') || lastChar.endsWith(':<br/>')) {
    lastChar = `${lastChar}\n`;
  }

  return `${item}${lastChar}`;
});

const outputHtml = arrayHtml.join(' ') + '<br/><br/>';
string.trim() !== "" && console.log(outputHtml);
