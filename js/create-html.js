const arrayExcept = ["there", "me", "🎧", ".", ",", "!", "?", "a", "ace", "act", "add", "age", "ago", "aid", "aim", "air", "all", "amp", "an", "and", "any", "ape", "apt", "arc", "are", "ark", "arm", "art", "ash", "ask", "ate", "awe", "axe", "bad", "bag", "ban", "bar", "bat", "bay", "be", "bed", "bee", "beg", "bet", "big", "bin", "bit", "bob", "boo", "bow", "box", "boy", "bud", "bug", "bun", "bus", "but", "buy", "by", "cab", "can", "cap", "car", "cat", "cod", "cog", "con", "cop", "cow", "cry", "cub", "cup", "cut", "dad", "dam", "day", "den", "did", "dig", "dim", "dip", "do", "dog", "dot", "dry", "dub", "dug", "due", "duo", "dye", "ear", "eat", "egg", "ego", "elf", "end", "era", "err", "eye", "fad", "fan", "far", "fat", "fax", "fed", "fee", "few", "fig", "fin", "fit", "fix", "flu", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "hay", "hem", "her", "hey", "hid", "him", "hip", "his", "hit", "hop", "hot", "how", "hug", "hum", "ice", "icy", "ill", "ink", "inn", "its", "jab", "jam", "jar", "jaw", "jet", "jog", "jot", "joy", "jug", "key", "kid", "kin", "kit", "lab", "lag", "lap", "law", "lay", "led", "leg", "let", "lid", "lie", "lip", "lit", "log", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "mop", "mud", "nap", "net", "new", "nil", "nod", "not", "now", "nut", "oak", "odd", "off", "oil", "old", "one", "our", "out", "owl", "pad", "pal", "pan", "pat", "paw", "pay", "pea", "pen", "pet", "pie", "pig", "pin", "pit", "pop", "pot", "pro", "pub", "pun", "put", "rad", "rag", "ram", "ran", "rat", "raw", "ray", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "rub", "rug", "rum", "run", "sad", "saw", "say", "sea", "see", "set", "sew", "she", "shy", "sin", "sip", "sir", "sit", "six", "ski", "sky", "sob", "son", "sow", "soy", "spy", "sub", "sue", "sun", "tab", "tag", "tan", "tap", "tar", "tax", "tea", "ten", "the", "tie", "tip", "toe", "ton", "too", "top", "toy", "try", "tub", "two", "use", "van", "vet", "via", "vie", "wag", "war", "was", "wax", "way", "web", "wed", "wet", "who", "why", "wig", "win", "wit", "wow", "yak", "yam", "you", "zap", "zip", "zoo", "I'm", "you're", "he's", "she's", "it's", "we're", "they're", "I'll", "you'll", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "you'd", "he'd", "she'd", "it'd", "we'd", "they'd", "aren't", "isn't", "wasn't", "weren't", "can't", "couldn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "hadn't", "mustn't", "mightn't", "shan't", "oughtn't", "there's", "here's", "that's", "what's", "where's", "who's", "how's", "let's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "it's", "what're", "what've", "that'd", "that's", "who're", "who've", "where'd", "where's", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "i", "who", "whom", "whose", "what", "which", "when", "where", "why", "how", "me", "i've", "my", "so", "have", "your", "to"];
const string = `
🎧 Hey Joe. Have you seen Sandy?
🎧 No, Bill. Why?
🎧 We had a misunderstanding and she is not talking to me.
🎧 Oh. I'm sorry to hear that.
🎧 Yeah. I said something silly and hurt her feelings.
🎧 What did you say?
🎧 It's not important. I don't want to discuss it. I just want to apologize to her.
🎧 She always hangs out at Linda's house or the library.
🎧 I've already checked both places.
🎧 How about her house.
🎧 Her roommate said she wasn't home.
🎧 Have you called her cell phone.
🎧 Yeah, several times.
🎧 She must really be mad at you.
🎧 She was! She stormed off and I didn't get to explain what I meant.
🎧 I'm really curious now. What did you say to her?
🎧 I told her to exercise.
🎧 Well, that probably wasn't a smart thing to say to a woman.
🎧 I meant that she should exercise to stay healthy.
🎧 That sounds better. Hope you find her.
====
🎧 Hi Sally. What are you doing here?
🎧 Hey Susie. I need to buy my sister a new necklace. I accidentally lost her necklace and she is really mad at me now.
🎧 But you said it was an accident.
🎧 Yeah, but I didn't ask if I could borrow it.
🎧 Oh, that's not good.
🎧 She wasn't home and it looked nice with my outfit, so I wore it.
🎧 That's like stealing.
🎧 I know. I feel terrible. I was going to put it back when I got home.
🎧 How did you lose it?
🎧 I don't know. I was on my way home and I noticed it was gone.
🎧 Was it an expensive necklace?
🎧 I don't know. I'm looking for a replacement here.
🎧 What does it look like?
🎧 It's a gold butterfly.
🎧 Like this one?
🎧 That's it! That's exactly like hers? How much is it?
🎧 The price tag says $100.
🎧 Wow! That's expensive. Now I see why she was really mad.
🎧 Are you going to buy it?
🎧 Yeah. That's all the money I have until my next paycheck.
====
🎧 Hey Nancy, why do you look so worried?
🎧 Oh, hi Betty. Christine and I had a big argument and she has decided to move out.
🎧 What did you argue about?
🎧 I told her that she needs to help clean up around the apartment.
🎧 What happened after you told her that?
🎧 She got upset and said she is moving out. But it's the truth. She never helps around house.
🎧 Yeah, that could be a problem.
🎧 I had to say something since we're roommates and I'm tired of cleaning her mess.
🎧 I totally understand. I like things neat and organized too.
🎧 But the bigger problem is that she never pays her rent on time. She is late every month.
🎧 What are you going to do?
🎧 I need to find a roommate soon. I can't afford the rent by myself. Do you know anyone looking for a roommate?
🎧 Yes, I do.
🎧 Who?
🎧 Me.
🎧 That would be awesome!
====
🎧 Hello?
🎧 Hi John. This is Steven. What are you doing tonight?
🎧 Hey Steven. Nothing much. I don't have any plans yet.
🎧 Do you want to hang out?
🎧 Sure. What did you have in mind?
🎧 I don't know. It's Friday and I'm bored.
🎧 Want to go to the movies?
🎧 Is there a good movie to see?
🎧 Let's check the Internet.
🎧 Ok. Let me log onto my computer.
🎧 Do you want to see a comedy or a drama?
🎧 Nothing sad or depressing. I had a hard work week. I want to see something funny.
🎧 I agree. Work was stressful for me too.
🎧 There aren't any new comedies right now. I only see dramas and horror movies.
🎧 Yeah, that's all I see too.
🎧 Hey, let's go to comedy club. My favorite comedian is performing tonight at the local theater.
🎧 That sounds great. What time?
🎧 It starts at 7 pm. Let's do dinner too.
🎧 Good idea! I'll meet you at your house at 5 pm.
🎧 See you tonight.
====
🎧 Hey Carol, are you done with your final exams?
🎧 Yes, Jane! I had my last one this morning. How about you?
🎧 Yeah, I got done an hour ago.
🎧 Do you want to celebrate?
🎧 Sure! What should we do?
🎧 I don't know. Should we throw a party?
🎧 What if our friends are not done with exams.
🎧 Yeah, you're right. Do you want to go dancing?
🎧 I don't know how to dance.
🎧 You don't? It's easy. Just move your body to music.
🎧 I look silly when I dance.
🎧 Me too. I don't care.
🎧 Let's do something else.
🎧 Ok. Do you have any ideas?
🎧 Do you want to go see a play?
🎧 That sounds boring. I want to do something active.
🎧 I think we have different ideas of fun.
🎧 Yeah. How about shopping? Do you want to go to the mall?
🎧 I love shopping. Let's do that. We can eat dinner there too.
🎧 Great! Let's meet at the department store at 4 pm.
====
🎧 Hello?
🎧 Hi Linda. This is Stacy. Are you free tomorrow night?
🎧 No, I'm not. Why?
🎧 I'm inviting a couple of friends to sleep over.
🎧 I wish I could go, but I have to babysit my younger sister.
🎧 That's too bad. We were going to rent a movie and order pizza.
🎧 Now I really wish I could go. That sounds like so much fun.
🎧 Can your parents find another babysitter?
🎧 No. Our regular babysitter got sick, so they asked me.
🎧 I see. What time will your parents be back?
🎧 9 o'clock pm.
🎧 Do you want to come over after you finish babysitting?
🎧 Will you still be awake?
🎧 Of course! It's a sleepover party. We're all going to sleep late.
🎧 Ok! Please save me some pizza.
🎧 I will. See you tomorrow night.
====
🎧 Hello?
🎧 Hi Karen. This is Janet. Did you hear that Joanne is moving to England?
🎧 Yeah, what a great opportunity for her.
🎧 I'm thinking about throwing her a going-away party. What do you think?
🎧 I think that's wonderful idea. She is such a good co-worker.
🎧 Would you like to help me plan it?
🎧 Sure. Let's make it a potluck, so everyone can bring a dish to share.
🎧 That's a great idea. Less stress if I don't have to cook.
🎧 Right! How many people do you want to invite?
🎧 How about all of the people she works with. How many is that?
🎧 I think there are about 30 people in our department, including us.
🎧 Should we keep it a secret or let her know?
🎧 She doesn't like people making a big fuss over her, so let's keep it a secret.
🎧 When should we have the party?
🎧 When is she moving?
🎧 Next month, I think.
🎧 Then we should do it soon. She'll be busy packing and getting ready for the move.
🎧 How about next Friday? It's her last day at work too.
🎧 Perfect!
🎧 I'll send out an email to everyone tonight. Thanks for your help.
====
🎧 Sally, what's wrong? Why do you look so sad?
🎧 Mom, Candace is moving away.
🎧 Oh, I'm sorry to hear that. Why is she moving?
🎧 Her dad got a job in another state.
🎧 Where is she moving?
🎧 To California. That's across the country.
🎧 There are many ways you can still keep in touch. You can e-mail, text, and call each other on the phone.
🎧 But it won't be the same as seeing each other every day. She is my best friend. I'm going to miss her.
🎧 I know you will. When are they moving?
🎧 At the end of June when the school year ends. In two months.
🎧 Would you like to invite her over this weekend? You can have a sleepover.
🎧 Yes, please. That would be great. We're going to try to hang out as much as possible before she moves.
🎧 That sounds like a good plan.
🎧 Can we visit her in California?
🎧 It's pretty far from us. We don't know anyone there.
🎧 Yes, we do. Candace and her family.
====
🎧 Hey Jeff. Are you ok?
🎧 Hi Dad. Yeah, I'm just a little sad that we are selling my childhood home.
🎧 I know. I'm sad too. But it's just too big for your mother and me.
🎧 I understand. I just have a lot of memories here.
🎧 Me too. This is the first home your mother and I bought.
🎧 Do you remember all of our holiday parties here? Everyone came to our house.
🎧 Of course I remember them. Those were the best times.
🎧 Now I'm married and have a family of my own.
🎧 I wish we didn't have to sell it, but we can no longer take care of it. We're getting old and it's too much work.
🎧 Do you know who bought our house?
🎧 A young couple with two kids. They seem like a loving family.
🎧 Where will you and mom go?
🎧 We found a beautiful, small condo a few blocks away.
🎧 That's nice. Will there be enough room when the grandchildren visit?
🎧 Yes. We have an extra room for guests, so your kids can stay over any time.
🎧 Where's Mom?
🎧 She's at the fabric store. She wants to sew new curtains for the condo.
====
🎧 Hi Carol. You look tired today.
🎧 I am tired. I didn't get any sleep last night.
🎧 Why?
🎧 Our neighbor's dog would not stop barking. He barked all night long.
🎧 That's awful! Did you complain to your neighbor?
🎧 I knocked on his door, but he didn't answer. I don't think he was home.
🎧 What did you do all night?
🎧 I couldn't sleep, so I tried to read a book. But the dog's barking kept distracting me. So, I just watched TV.
🎧 I would be so angry. You should've called the police.
🎧 I didn't want to bother the police with a barking dog.
🎧 I would have called them. What if there was an emergency at your neighbor's house and the dog was trying to alert someone.
🎧 That's true. I didn't think about that. But this dog usually barks because he's bored.
🎧 That's annoying.
🎧 I know.
🎧 Hey Carol. Is that your neighbor? He's walking towards us.
🎧 What is he holding?
🎧 It looks like a plate of cookies.
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