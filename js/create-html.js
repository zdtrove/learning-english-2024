const arrayExcept = ["girl", "while", "whole", "must", "online", "oh", "tough", "we've", "short", "empty", "mr", "ms", "issues", "issue", "already", "touch", "somewhere", "simple", "focus", "easy", "ready", "leaves", "leave", "pm", "fine", "okay", "forward", "open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "hi", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "fun", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "sounds", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "day", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thank", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "her", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "off", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "all", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "hid", "him", "hip", "his", "hit", "hop", "hot", "how", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "now", "off", "oil", "old", "our", "pay", "pen", "pet", "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy", "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "win", "wow", "yam", "you", "zoo", "I'm", "you're", "he's", "she's", "it's", "we're", "they're", "I'll", "you'll", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "you'd", "he'd", "she'd", "it'd", "we'd", "they'd", "aren't", "isn't", "wasn't", "weren't", "can't", "couldn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "hadn't", "mustn't", "mightn't", "shan't", "oughtn't", "there's", "here's", "that's", "what's", "where's", "who's", "how's", "let's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "it's", "what're", "what've", "that'd", "that's", "who're", "who've", "where'd", "where's", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "i", "who", "whom", "whose", "what", "which", "when", "where", "why", "how", "i've", "my", "so", "have", "your"];
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
  if (item.endsWith('.') || item.endsWith(',') || item.endsWith('!') || item.endsWith('?')) {
    lastChar = item.slice(-1);
    item = item.slice(0, -1);
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

  if (!arrayExcept.includes(item.toLowerCase())) {
    return `<span>${item}</span>${lastChar}`;
  }

  return `${item}${lastChar}`;
});
const outputHtml = arrayHtml.join(' ') + '<br/><br/>';
const listTimes = [1];
listTimes.forEach(item => {
  console.log(convertToSeconds(item));
});
