const arrayExcept = ["open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "hi", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "fun", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "sounds", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "day", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "you", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thank", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "her", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "off", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "there", "me", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "all", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "hid", "him", "hip", "his", "hit", "hop", "hot", "how", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "now", "off", "oil", "old", "one", "our", "out", "pay", "pen", "pet",  "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy",  "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip",  "too", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "why", "win", "wow", "yam", "you", "zoo", "I'm", "you're", "he's", "she's", "it's", "we're", "they're", "I'll", "you'll", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "you'd", "he'd", "she'd", "it'd", "we'd", "they'd", "aren't", "isn't", "wasn't", "weren't", "can't", "couldn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "hadn't", "mustn't", "mightn't", "shan't", "oughtn't", "there's", "here's", "that's", "what's", "where's", "who's", "how's", "let's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "it's", "what're", "what've", "that'd", "that's", "who're", "who've", "where'd", "where's", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "i", "who", "whom", "whose", "what", "which", "when", "where", "why", "how", "me", "i've", "my", "so", "have", "your", "to"];
const string = `
At the Convenience Store

🎧 Hey there! Do you have any gluten-free snacks?  
🎧 Yes, we do! Right over there in aisle 3, we've got some gluten-free chips and protein bars.  
🎧 Awesome! I'll check those out. Oh, I'll also grab a bottle of sparkling water.  
🎧 Great choice! We have a few flavors in the fridge if you want to take a look.  
🎧 I'll go with the lemon-lime.  
🎧 Perfect! That'll be $88.50.  
🎧 Here you go.  
🎧 Thanks! Enjoy your snacks!  
🎧 Hey, do you have any energy drinks?  
🎧 Yep! We have a whole section in the cooler. It's next to the snacks.  
🎧 Cool! I'll check it out. Oh, and do you have any sugar-free options?  
🎧 Yes, we do! Just look for the labels; they're marked.  
🎧 Got one. How much is it?  
🎧 That'll be $3.25.  
🎧 Thanks. By the way, do you sell phone chargers?  
🎧 Sure do! We have a few different types. Here they are.  
🎧 This one is perfect.  
🎧 Okay. Is that everything?  
🎧 Yep, that's it.  
🎧 All right, your total is $10.50.  
🎧 Thanks.  
🎧 Hi there! Do you have any fresh fruit?  
🎧 Yes, we do! We've got apples, bananas, and some oranges over by the front.  
🎧 Great! I'll take a couple of bananas. And I also need some avocados, too.  
🎧 I'm afraid we ran out of avocados. We should have more in tomorrow if you want to check back.  
🎧 That sounds good. I'll just grab some bananas then. And do you have any yogurt?  
🎧 We do! It's in the dairy section at the back.  
🎧 What types of yogurt do you have?  
🎧 We have plain and flavored yogurt.  
🎧 I'll go take a look.  
🎧 Your total is $10.75.  
🎧 I'll pay by card.  
🎧 Thank you! Here you go. Have a great day!  

A Visit to the Doctor

🎧 Good morning, John. How are you today?  
🎧 Morning, Doc. I'm okay, I guess. Just here for my regular checkup.  
🎧 Great, let's get started. Any concerns or symptoms you want to discuss?  
🎧 Actually, yeah. I've been having some abdominal pain and cramping lately.  
🎧 I see. How often does that happen?  
🎧 It varies, but I've noticed it happens more when I eat certain foods. Plus, I've been bloated, gassy, and sometimes I either have diarrhea or constipation. It's frustrating.  
🎧 That does sound uncomfortable. Have you noticed any patterns with your diet?  
🎧 Yeah, I think certain things like dairy and spicy foods might trigger it, but I'm not sure.  
🎧 It sounds like you might be dealing with irritable bowel syndrome, or IBS. Let's talk about some dietary changes that could help.  
🎧 IBS? What does that mean for me?  
🎧 It means we need to pay attention to what you're eating. Reducing high-fat foods, increasing fiber gradually, and keeping a food diary can help identify triggers.  
🎧 Sounds manageable. What about medication?  
🎧 I'm going to prescribe you a medication that can help with the cramps and discomfort. It should ease your symptoms a bit.  
🎧 Thanks, Doc. I appreciate it.  
🎧 Of course! Let's schedule a follow-up in a month to see how you're doing with the changes.  
🎧 Sounds good. I'll do my best.  
🎧 That's the spirit! Take care, John.  
🎧 You too, Doc. Thanks again.

At the Dentist

🎧 Let's take a look at your x-rays. It looks like you have some overcrowding and a bit of misalignment. I recommend braces to help straighten everything out.  
🎧 Braces? Really? I thought I was too old for that.  
🎧 Not at all! It's quite common for adults to get braces. We have several options you can choose from.  
🎧 Like what?  
🎧 We have traditional metal braces, ceramic braces, and even clear aligners like Invisalign.  
🎧 Hm, what's the difference in terms of visibility?  
🎧 Well, metal braces are the most visible, but they're very effective. Ceramic braces blend in more with your teeth, so they're less noticeable. Invisalign is completely clear, but it requires more discipline to wear them for the recommended hours.  
🎧 Gotcha. What about the price?  
🎧 The metal braces cost $3,000. The ceramic braces are a bit more, around $4,000. Invisalign is around $4,500, but it varies based on your treatment plan.  
🎧 Okay, I see. I think I prefer the ceramic braces since I want something less noticeable.  
🎧 Great choice! They'll work well for you. Let's get you started with the next steps.  
🎧 Awesome! I'm excited to see the results.  
🎧 You will be amazed! Let's schedule your appointment for the fitting.
`;

function replaceNewlineWithBr(str) {
  return str.replace(/\n/g, '<br/> ');
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

  if (item.endsWith('<br/>')) {
    item = `${item}\n`;
  }

  if (!arrayExcept.includes(item.toLowerCase())) {
    return `<span>${item}</span>${lastChar}`;
  }

  return `${item}${lastChar}`;
});
const outputHtml = arrayHtml.join(' ') + '<br/><br/>';
console.log(outputHtml);
