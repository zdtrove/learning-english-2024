const arrayExcept = ["forward", "open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "hi", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "fun", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "sounds", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "day", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "you", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thank", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "her", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "off", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "there", "me", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "all", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "hid", "him", "hip", "his", "hit", "hop", "hot", "how", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "now", "off", "oil", "old", "one", "our", "out", "pay", "pen", "pet",  "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy",  "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip",  "too", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "why", "win", "wow", "yam", "you", "zoo", "I'm", "you're", "he's", "she's", "it's", "we're", "they're", "I'll", "you'll", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "you'd", "he'd", "she'd", "it'd", "we'd", "they'd", "aren't", "isn't", "wasn't", "weren't", "can't", "couldn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "hadn't", "mustn't", "mightn't", "shan't", "oughtn't", "there's", "here's", "that's", "what's", "where's", "who's", "how's", "let's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "it's", "what're", "what've", "that'd", "that's", "who're", "who've", "where'd", "where's", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "i", "who", "whom", "whose", "what", "which", "when", "where", "why", "how", "me", "i've", "my", "so", "have", "your", "to"];
const string = `
Starting the day

🎧 Oh good morning, Tom!
🎧 How are you today?
🎧 Did you get enough sleep last night?
🎧 I feel like I barely slept at all.
🎧 Morning, Alice!
🎧 I'm okay, I guess.
🎧 But to be honest, I stayed up a bit too late watching that new series on TV.
🎧 You know how it goes.
🎧 You say, “Just one more episode,” and then suddenly it's 1 AM.
🎧 How about you?
🎧 Oh, I know that feeling all too well.
🎧 I was up late to trying to finish a book I was reading.
🎧 It was so good that I couldn't put it down.
🎧 But now I'm definitely feeling it.
🎧 I need a strong coffee to wake me up.
🎧 Me too!
🎧 A good cup of coffee sounds like the perfect way to start the day.
🎧 Let's do this and make it a productive day.

Team Meetings

🎧 Good morning, everyone.
🎧 I hope you're all ready for today's meeting.
🎧 Let's start by going over the progress on our current projects.
🎧 Alice, would you like to begin?
🎧 Of course, Mr. Smith.
🎧 The research phase is complete, and we've started the development stage.
🎧 We did face a slight delay due to some unexpected challenges with the data,
🎧 but we managed to resolve them quickly.
🎧 Actually, Alice, I'm not sure I agree with that.
🎧 I think the delay was longer than you're suggesting,
🎧 and it's going to push us behind schedule if we don't address it properly.
🎧 I understand your concern, Jimmy,
🎧 but I've already made changes to handle the delay.
🎧 I'm sure we can still meet our deadlines.
🎧 But Alice, we need to be realistic about what we can achieve.
🎧 Alright, I see both of your points.
🎧 Let's go over the timeline and see what changes we can make to stay on track.
🎧 We'll solve any issues to make sure we deliver great results for our clients.
🎧 That makes sense, Mr. Smith.
🎧 I didn't mean to ignore the issue. I just wanted to stay positive.
🎧 I get that, Alice.

Lunch Break

🎧 Hi Alice, hi Tom! Mind if I join you for lunch today?
🎧 I brought my lunch from home, but it's always nicer to eat with company.
🎧 Sure, Sarah. I could use a break after that meeting.
🎧 Yeah, let's take a breather.
🎧 That meeting was a bit intense, huh?
🎧 But, hey, we're all on the same team, right?
🎧 Oh no, what happened in the meeting?
🎧 You both look like you can use some comfort food.
🎧 Just a little disagreement about our project timeline.
🎧 I know Tom was just trying to be realistic,
🎧 but it felt like he was challenging everything I said.
🎧 I didn't mean to come off that way, Alice.
🎧 I respect your work a lot.
🎧 I just think we need to be careful with our deadlines.
🎧 It's good for us, right?
🎧 You're right. I don't want a small disagreement to spoil our day.
🎧 We're all putting in a lot of effort and I appreciate your feedback, Tom.
🎧 Let's take a break, enjoy lunch, and come back to the project with a fresh perspective.
🎧 Agreed. I'm glad we talked it out.

Client Calls

🎧 Hello, this is Alice from Brand New Company.
🎧 How can I help you today?
🎧 Hi Alice, I wanted to discuss the details of our new project.
🎧 Certainly! Let me pull up the information.
🎧 What specific details would you like to go over?
🎧 I want to confirm the timeline and the main tasks.
🎧 We have an eight-week schedule,
🎧 with the first task due in two weeks.
🎧 Does that work for you?
🎧 Yes, that's perfect. Thank you for the clarification.
🎧 You're welcome.
🎧 Please feel free to reach out if you have any other questions.
🎧 I will. Thanks, Alice.
🎧 How did the call go, Alice?
🎧 It went well.
🎧 The client is happy with the timeline.
🎧 I'm glad to hear that!
🎧 Me too.

Reporting to the Manager

🎧 Here are your documents, sir.
🎧 Tom, do you have a moment to discuss your report?
🎧 Of course, Mr. Smith.
🎧 Here is the latest update.
🎧 I see you've made great progress.
🎧 Just a few more details to add.
🎧 Can you include the client feedback in the next report?
🎧 Sure. I'll add that right away.
🎧 Thank you. Tom. Keep up the good work.
🎧 Thank you, Mr. Smith.
🎧 I'll send you the revised report by the end of the day.
🎧 Perfect. Let me know if you need any help.
🎧 Sure, Mr. Smith.

Leaving the Office

🎧 Alice, are you heading out now?
🎧 Yes, I am. It's been a long day.
🎧 Me too. Ready to go home and relax.
🎧 I have to go to the grocery store to buy some things for dinner.
🎧 It's tiring.
🎧 Oh, if that's the case, it'll take you at least two hours to finish dinner.
🎧 Why don't we go out for dinner?
🎧 Just for today. Because we've worked hard all day long.
🎧 That sounds good.
🎧 I agree.
🎧 The Korean restaurant near my house is famous.
🎧 You should definitely try it once.
🎧 Deal. Let's fill our empty stomachs.
🎧 Go go go!

Waking Up

🎧 Ugh, is it morning already?
🎧 I feel like I just went to bed.
🎧 Yeah, it's morning.
🎧 The alarm's been going off for a while now.
🎧 We should probably get up.
🎧 Another busy day ahead.
🎧 I know, I know. But five more minutes wouldn't hurt, right?
🎧 So cozy here.
🎧 You always say that, and then we end up rushing.
🎧 But I get it.
🎧 Mornings are tough.
🎧 Let's make a deal, five more minutes, and then we'll start the day.
🎧 Deal.
🎧 You know, I've been thinking about changing our morning routine.
🎧 Maybe adding some stretches or a quick workout.
🎧 It might help us wake up better.
🎧 That's not a bad idea.

Morning Exercise

🎧 Alright, so I've found a short morning workout routine online.
🎧 It's only 15 minutes. It's perfect for beginners like us.
🎧 Ready to give it a try?
🎧 As ready as I'll ever be.
🎧 I'm still waking up, but I think this could be good for us.
🎧 Lead the way, Coach Emma!
🎧 Okay, let's start with some light stretches.
🎧 I'm not usually a morning person, but this actually feels nice.
🎧 Yeah, I can see why people do this.
🎧 It's like we're shaking off the sleepiness.
🎧 Exactly! Just something to get us moving.
🎧 Now, let's try some jumping jacks,
🎧 just a few to get our heart rates up.
🎧 Jumping jacks, huh? Alright, let's do this.
🎧 You know, this might be the first time I've done jumping jacks since school.
🎧 Really?
🎧 But it's kind of fun, right?
🎧 For sure.

Breakfast

🎧 Morning exercise done, now it's time for breakfast.
🎧 I'm making pancakes with banana and honey!
🎧 It's been a long time since I cooked this dish.
🎧 That sounds fancy! Do you need any help?
🎧 Yes, can you mash the bananas?
🎧 I'll mix the batter.
🎧 Pancakes are a nice change.
🎧 We haven't had them in a while.
🎧 What made you think of this?
🎧 I wanted something comforting and sweet.
🎧 Plus, it's quick and easy.
🎧 We can add some fresh berries on top to.
🎧 I'll get the berries ready.
🎧 Oh, these are turning out perfectly.
🎧 I love the smell of pancakes cooking.
🎧 It's so warm and inviting.
🎧 It's the perfect way to start the day.

Getting Ready for Work

🎧 What to wear, what to wear…
🎧 I've got a meeting today, so...
🎧 I should probably go with something a little bit more formal.
🎧 You always look great, Emma.
🎧 But yeah, a meeting calls for the power outfit.
🎧 You want to make a good impression?
🎧 Thanks, James.
🎧 I think I'll go with the blue blouse and black pants.
🎧 It's professional, but still comfortable.
🎧 Good choice.
🎧 Comfort is key, especially when you're going to be stuck in meetings all day.
🎧 I'm going with my usual shirt and tie.
🎧 Nothing fancy.
🎧 Yeah. It's funny how getting dressed can set the tone for the day, too
🎧 When I wear something I feel good in, it boosts my confidence.
🎧 I get that.
🎧 Ready to head out?
🎧 Ready!

Lunch Break

🎧 Hey, Emma! How's your day going?
🎧 Do you want to grab lunch together?
🎧 Sure, Emily!
🎧 My day's been pretty busy, but I'm surviving.
🎧 How about you?
🎧 Same here. I've been running around all morning.
🎧 I'm so glad it's lunch time.
🎧 I need a break.
🎧 What did you bring?
🎧 Oh, just a simple salad with grilled chicken.
🎧 I'm trying to keep it healthy, especially after our morning workout.
🎧 Oh. That's awesome!
🎧 I brought a sandwich,
🎧 but now I'm wishing I had something healthier.
🎧 Maybe I'll join you on the salad train tomorrow.
🎧 Oh, it's never too late to start.

Evening Relaxation

🎧 Finally home.
🎧 What a day!
🎧 How about we do something relaxing?
🎧 What about a board game?
🎧 We haven't played one in ages, and it could be fun.
🎧 That's a great idea! Let's play Settlers of Catan.
🎧 It's been a while, and I'm feeling competitive.
🎧 You're on. I'll grab the game.
🎧 Just remember, I've won the last few rounds,
🎧 so don't get too upset if I win again.
🎧 We'll see about that! Tonight might be my night.
🎧 Alright, let the best player win!
🎧 And by that, I mean me, of course.
🎧 Let's go!

Preparing Dinner

🎧 So, what should we make for dinner?
🎧 I'm thinking of something quick and easy.
🎧 Maybe pasta?
🎧 Pasta sounds good.
🎧 How about we make a simple tomato and basil sauce?
🎧 We've got all the ingredients.
🎧 Perfect.
🎧 I'll start boiling the water, and you can chop the tomatoes.
🎧 We make a pretty good team in the kitchen, don't we?
🎧 Definitely.
🎧 Cooking together is one of my favorite parts of the day.
🎧 It's like our own little ritual.
🎧 You're so funny.

Bedtime Routine

🎧 I'm so ready for bed. How about you?
🎧 Definitely.
🎧 I'm going to read a bit before sleeping.
🎧 Do you want to join me?
🎧 Sure, just a few pages of my mystery novel.
🎧 Sounds good. Let's relax for a bit.
🎧 Reading before bed is the best way to relax.
🎧 It helps me clear my mind.
🎧 I'm re-reading “The Alchemist.”
🎧 It always helps me reflect on life a bit.
🎧 That's a good choice. I'm reading a mystery novel.
🎧 It keeps me guessing until the end.
🎧 Perfect way to end the day.
🎧 Let's read for a bit and then lights out.
🎧 Okay, I'm done for the night.
🎧 I feel sleepy already.
🎧 Let's get some rest. Tomorrow's another busy day.
🎧 Goodnight, James. Sweet dreams.
🎧 Good night, Emma. Sleep well.

Planning the Trip

🎧 I'm so excited for our trip!
🎧 But I don't know where to start. How do we plan it?
🎧 Don't worry, Anna.
🎧 First we need to decide where to go.
🎧 Do you guys have a place in mind?
🎧 I've always wanted to visit Japan.
🎧 The cherry blossoms look so beautiful.
🎧 Japan is a great choice!
🎧 We can start by booking our flights and accommodation.
🎧 Do you have a budget?
🎧 I think around 1500. Is that enough?
🎧 Yes, that should be enough.
🎧 That's great!
🎧 We'll find some good deals.
🎧 Let's check online for flights first.

Packing the Luggage

🎧 Are you all set for packing, Anna?
🎧 Not really... I'm confused about what to pack.
🎧 It's my first time traveling.
🎧 Just pack the essentials.
🎧 Clothes, phone backup charger, and don't forget your passport!
🎧 Right! Should I bring a lot of clothes?
🎧 No need to overpack. Just enough for a few days.
🎧 You can always do laundry there.
🎧 I got it. What about shoes?
🎧 Should I bring fancy ones?
🎧 Comfortable shoes are a must.
🎧 You'll be walking a lot.
🎧 Okay, I'm packing my sneakers.
🎧 I think I'm ready.
🎧 Awesome!

Airport Check-In

🎧 I'm so nervous.
🎧 What do we do now?
🎧 Relax, Anna.
🎧 First, we need to check in.
🎧 Do you have your passport and ticket?
🎧 Yes. I have them here.
🎧 Katherine reminded me of this.
🎧 Great! Let's go to the counter.
🎧 Hello! May I have your passports, please?
🎧 Here you go.
🎧 Thank you. How many bags are you checking in?
🎧 Just one for me.
🎧 Same here.
🎧 Me too.
🎧 Alright. Your flight leaves from Gate 5.
🎧 Have a nice trip!
🎧 Thank you!
🎧 See, that wasn't so bad.
🎧 You're right. I feel better now.

Boarding the Flight

🎧 They're calling our row.
🎧 Are you two ready to board?
🎧 Ready as ever.
🎧 Yes. I'm ready.
🎧 What do we do?
🎧 Just follow the line.
🎧 Have your boarding pass and passport ready.
🎧 Boarding passes, please.
🎧 Thank you.
🎧 Enjoy your flight!
🎧 Wow, this is exciting! Where are our seats?
🎧 Right here. You have the window seat.
🎧 Yay! I can't wait to see the view.

Call a Taxi

🎧 How do we get to the hotel?
🎧 They have subways, taxis, and many other means of transportation here.
🎧 Let's call a taxi. It's the easiest way.
🎧 That's a good idea.
🎧 But we don't speak Japanese.
🎧 What if they don't understand us?
🎧 Don't worry. Many drivers speak some English.
🎧 Let's give it a try.
🎧 We can also use translation apps if needed.
🎧 Hello! Where to go?
🎧 Hi, we're going to the Grand Tokyo Hotel.
🎧 Grand Tokyo Hotel? Okay!
🎧 That was easier than I thought!
🎧 See? No problem at all.

Buying Souvenirs

🎧 These are so cute! I want to buy something for my family.
🎧 Good idea.
🎧 What about those keychains?
🎧 They're small and easy to carry.
🎧 I also want to buy them.
🎧 Let me ask the shopkeeper about the cost.
🎧 Hello! Can I help you with anything?
🎧 Yes, I'd like to buy these keychains.
🎧 How much are they?
🎧 500 yen each.
🎧 I'll take four, please.
🎧 Thank you! Do you need a bag?
🎧 Yes, please.
🎧 Oh, you guys found some great souvenirs.
🎧 I'm so excited to give these to my family.

Local Food

🎧 This place looks amazing.
🎧 I've never tried sushi before.
🎧 You'll love it.
🎧 Let's order a few dishes to share.
🎧 Good evening! Are you ready to order?
🎧 Yes, we'll have some sushi, tempura, and miso soup, please.
🎧 Great choices! Anything to drink?
🎧 Matcha tea for me, please.
🎧 I'll have a green tea, please.
🎧 Same for me.
🎧 Coming right up!
🎧 I'm a little nervous to try new food, but I'm excited too.
🎧 Don't worry, it's delicious.
🎧 Just take small bites and enjoy the flavors.
🎧 Wow, this is so good! I'm glad I tried it.
🎧 I knew you'd like it.
🎧 Trying local food is one of the best parts of traveling.
🎧 I agree! I can't wait to try more.

First Impressions

🎧 Sophie, I'm so nervous!
🎧 What if he doesn't like me?
🎧 Relax, Emily. Just be yourself.
🎧 He's already interested, so you're halfway there!
🎧 But what if I say something silly?
🎧 It's okay.
🎧 Just smile, be polite, and ask him about himself.
🎧 Everyone likes to talk about themselves.
🎧 You're right. I'll just focus on having a good time.
🎧 Exactly!
🎧 And remember, first impressions matter.
🎧 But they're not everything.
🎧 Just enjoy the moment.
🎧 What about clothes, should I dress mature or sweet?
🎧 Which style do you feel most comfortable with?
🎧 I like sweet things,
🎧 But I'm also a grown woman,
🎧 I'm worried if it's okay to dress like that.
🎧 Why not?
🎧 If he is a good man, he will respect your style.
🎧 You can't live your whole life for someone else, right?
🎧 Wear what you like,
🎧 as long as it's polite and comfortable.
🎧 Thanks, Sophie.
🎧 You always know what to say.
🎧 Hey man, are you ready for the date?
🎧 I think so, but I'm kind of nervous.
🎧 It's been a while since my last date.
🎧 Just remember, it's not about impressing her with big gestures.
🎧 Focus on having a good time and getting to know her.
🎧 I got it.
🎧 But there is one more thing.
🎧 I can't decide what to wear.
🎧 Should I go with the blue shirt or the grey one?
🎧 Go with the blue. It's more casual but still looks sharp.
🎧 Also, it brings out your eyes.
🎧 Good point. What about jeans or chinos?
🎧 Chinos, definitely.
🎧 They're a bit more dressed up but still comfortable.
🎧 You want to look like you put in some effort without overdoing it.
🎧 Got it.
🎧 Should I bring flowers or is that too much for a first date?
🎧 How about something simple, like a box of chocolates?
🎧 It's thoughtful without being overwhelming.
🎧 Thanks, Lucas. I feel more prepared now.

Planning the Date

🎧 So, Emily, do you have any favorite places in town?
🎧 I really like the park by the river.
🎧 It's peaceful and has a great view.
🎧 That sounds nice.
🎧 How about we take a walk there after dinner?
🎧 I love that. It's a perfect spot for a quiet chat.
🎧 Great! We can grab some ice cream on the way too.
🎧 That sounds like a perfect evening.
🎧 I'm in.
🎧 What time should we meet?
🎧 How about 7 PM tomorrow?
🎧 That gives us plenty of time to enjoy dinner
🎧 and catch the music before it gets too late.
🎧 7 PM works for me.
🎧 Okay. See you later.

Choosing the Restaurant

🎧 Have you been to the AC Italian Cuisine restaurant before?
🎧 I tried that restaurant once a year ago,
🎧 but I want to make sure it is still as good as before.
🎧 I need to prepare carefully so that Emily will have good memories.
🎧 No, but I've heard good things about it.
🎧 You know Jimmy?
🎧 He just proposed to his girlfriend successfully two weeks ago at that restaurant.
🎧 That place is Cupid.
🎧 That might be a good start for you and Emily.
🎧 I don't believe in such things, but it seems like a good thing.
🎧 Thanks, Lucas.
🎧 I'll invite Emily to this restaurant.
🎧 Good luck, Jake.
🎧 Emily, would you like to try the Italian restaurant near the city center?
🎧 It's worth a try.
🎧 Of course, I'm looking forward to it.
🎧 You plan so carefully.
🎧 No big deal.
🎧 I just want us to have a great date.
🎧 See you tomorrow.
🎧 Cool.

Conversation Starters

🎧 So, Emily, what do you like to do in your free time?
🎧 I enjoy reading and painting.
🎧 It helps me relax.
🎧 That's cool.
🎧 What kind of books do you like?
🎧 Mostly fiction.
🎧 I love getting lost in a good story.
🎧 What about you?
🎧 I'm into hiking and photography.
🎧 Nature is my escape.
🎧 That sounds amazing. I've always wanted to try hiking.
🎧 Maybe we can go together sometime.
🎧 I know some great trails.
🎧 I'd like that.
🎧 Are you ready to order?
🎧 Yes, we'll start with the bruschetta,
🎧 and then we'd like to share the lasagna and carbonara.
🎧 Excellent choices.
🎧 I'll bring those out shortly.
🎧 This place has such a nice atmosphere.
🎧 It's perfect for a first date.
🎧 I'm glad you like it.
🎧 I wanted to choose somewhere special.

Saying Goodbye

🎧 I had a really great time tonight, Emily.
🎧 Dinner, the walk, the music. It was all perfect.
🎧 I did too, Jake. Everything was just right.
🎧 You planned it so well.
🎧 I'm glad you think so.
🎧 I was a little nervous about everything going smoothly,
🎧 but it turned out better than I hoped.
🎧 You didn't need to worry.
🎧 It was one of the best evenings I've had in a long time.
🎧 So I guess this is where we say goodbye.
🎧 Yeah, I suppose so. But hopefully, not for too long.
🎧 Definitely. I'd love to do this again sometime soon.
🎧 Maybe next weekend.
🎧 I'd like that.
🎧 Let's keep in touch and plan something.
🎧 Do you need a ride home?
🎧 I can call a taxi for you.
🎧 That's sweet, but I'm okay.
🎧 Sophie has something to do nearby,
🎧 so she'll be here to pick me up in five minutes.
🎧 Emily, here!
🎧 She was faster than I thought.
🎧 Take care, Emily. I had a great time.
🎧 You too, Jake. Have a good night.
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