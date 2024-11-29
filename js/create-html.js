const arrayExcept = ["ahead", "serious", "product", "company", "practice", "remember", "amount", "students", "personal", "university", "wonderful", "order", "large", "success", "number", "group", "heard", "second", "watching", "finally", "amazing", "children", "date", "month", "student", "option", "options", "important", "perfect", "says", "looking", "yourself", "likes", "show", "girls", "books", "movie", "lots", "lately", "bye", "until", "sorry", "drink", "ah", "shall", "speak", "room", "Mrs", "interested", "answer", "called", "call", "want", "wanted", "although", "hello", "hours", "actually", "everyday", "uh", "meet", "girl", "while", "whole", "must", "online", "oh", "tough", "we've", "short", "empty", "mr", "ms", "issues", "issue", "already", "touch", "somewhere", "simple", "focus", "easy", "ready", "leaves", "leave", "pm", "fine", "okay", "forward", "open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "his", "hit", "hop", "hot", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "off", "oil", "old", "our", "pay", "pen", "pet", "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy", "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "win", "wow", "yam", "you", "zoo", "it's", "we're", "they're", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "he'd", "she'd", "it'd", "we'd", "they'd", "mightn't", "oughtn't", "there's", "here's", "what's", "where's", "how's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "what're", "what've", "that'd", "that's", "who're", "where'd", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "needn't", "hadn't", "mustn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hasn't", "haven't", "isn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "i", "whom", "whose", "what", "which", "when", "where", "why", "how", "i've", "my", "so", "have", "your"];
const string = `

`;

function replaceNewlineWithBr(str) {
  return str.replace(/\n/g, '<br/> ');
}

function convertToSeconds(input) {
  const [minutes, secondsPart] = input.toString().split('.');
  const minutesInSeconds = parseInt(minutes, 10) * 60;
  const seconds = secondsPart ? parseInt(secondsPart.padEnd(2, '0'), 10) : 0;

  return minutesInSeconds + seconds;
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

  if (item.startsWith('[')) {
    item = `<br/>\n\n<h2>${item.replace(/[\[\]]/g, '')}`;
    return item;
  }

  if (item.endsWith("]<br/>")) {
    item = `${item.replace("<br/>", "").replace(/[\[\]]/g, '')}</h2>\n\n`;
    return item;
  }

  if (item.endsWith('<br/>')) {
    item = `${item}\n`;
  }

  if (lastChar.endsWith('.<br/>') || lastChar.endsWith(',<br/>') || lastChar.endsWith('!<br/>') || lastChar.endsWith('?<br/>') || lastChar.endsWith(':<br/>')) {
    lastChar = `${lastChar}\n`;
  }

  if (!arrayExcept.includes(item.toLowerCase())) {
    return `<span>${item}</span>${lastChar}`;
  }

  return `${item}${lastChar}`;
});

const listTimes = [];
listTimes.length && listTimes.forEach(item => {
  console.log(convertToSeconds(item));
});

const outputHtml = arrayHtml.join(' ') + '<br/><br/>';
string.trim() !== "" && console.log(outputHtml);

// const result = string
//   .split('\n')
//   .map(line => `🎧 ${line}`)
//   .join('\n');

// console.log(result);