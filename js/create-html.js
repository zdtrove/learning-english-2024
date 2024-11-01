const arrayExcept = ["forward", "open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "hi", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "fun", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "sounds", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "day", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "you", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thank", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "her", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "off", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "there", "me", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "all", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "hid", "him", "hip", "his", "hit", "hop", "hot", "how", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "now", "off", "oil", "old", "one", "our", "out", "pay", "pen", "pet",  "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy",  "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip",  "too", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "why", "win", "wow", "yam", "you", "zoo", "I'm", "you're", "he's", "she's", "it's", "we're", "they're", "I'll", "you'll", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "you'd", "he'd", "she'd", "it'd", "we'd", "they'd", "aren't", "isn't", "wasn't", "weren't", "can't", "couldn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "hadn't", "mustn't", "mightn't", "shan't", "oughtn't", "there's", "here's", "that's", "what's", "where's", "who's", "how's", "let's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "it's", "what're", "what've", "that'd", "that's", "who're", "who've", "where'd", "where's", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "i", "who", "whom", "whose", "what", "which", "when", "where", "why", "how", "me", "i've", "my", "so", "have", "your", "to"];
const string = `
🎧 Alright team, let's go over the Q3 sales report.
🎧 The numbers look good overall, but there's a drop in the Southeast area.
🎧 Yeah, I noticed that too.
🎧 Any ideas on what might be causing it?
🎧 We haven't figured out the exact cause yet.
🎧 It could be a seasonal slowdown
🎧 or maybe a competitor increase
🎧 their advertising in the area.
🎧 We should look into it more.
🎧 Maybe we could reach out to some of our top clients there to see what they're noticing.
🎧 Great suggestion, Jacob.
🎧 We can also check out any recent advertising
🎧 our competitors have done in the Southeast.
🎧 Have we thought about offering any local deals to boost sales there?
🎧 Interesting idea, Adam.
🎧 We could think of some special offers just for the Southeast.
🎧 But we'll need to be careful.
🎧 Maybe we could try a short-term plan focused on keeping customers.
🎧 Absolutely.
🎧 We can look into a loyalty program.
🎧 Or bonus points for people who buy more than once in the Southeast.
🎧 Agreed.
🎧 We'll put together a plan to talk with the Southeast team
🎧 and keep everyone updated on what we find.
🎧 Alright team
🎧 Let's start thinking of ideas for the new marketing campaign!
🎧 We need to get a lot of attention
🎧 with this product launch.
🎧 I suggest holding a contest
🎧 on social media.
🎧 We could get people talking about it and increase interest.
🎧 Interesting, Beth.
🎧 But how would the contest connect to the product itself?
🎧 We don't want just short-term excitement.
🎧 Hmm, how about a contest where users make content
🎧 that shows off the product's benefits in a creative way?
🎧 That sounds good!
🎧 We could also work with influencers
🎧 to help the contest reach more people.
🎧 I like that idea.
🎧 But we also need to think about a traditional marketing plan.
🎧 We could focus on online ads,
🎧 or maybe a TV commercial.
🎧 Great point Lucy.
🎧 We should try using many different channels.
🎧 We could also use email marketing
🎧 to reach our existing customers.
🎧 A pre-launch campaign could be a great idea.
🎧 Absolutely, Donald.
🎧 All these ideas are fantastic!
🎧 Let's write them down and decide based on our budget
🎧 and how many people we can reach.
🎧 I think we should also think
🎧 about the timeline.
🎧 We need to start this campaign soon to take advantage of the current trends.
🎧 Let's keep working on these ideas.
🎧 Once we have a better plan, we can show it to the client for approval.
🎧 Hey Tim, how's the presentation going?
🎧 Almost done, I think.
🎧 Just finishing up the slides.
🎧 Are you nervous?
🎧 A little, yeah.
🎧 It's a big proposal, and I want to make a good impression.
🎧 Don't worry, you've got this!
🎧 Your ideas are really good.
🎧 Just remember to keep it short and focus on what benefits they'll see.
🎧 That's the best way to win them over.
🎧 That's the problem, there's so much information I want to include!
🎧 I get it, but too many details might confuse them.
🎧 Maybe you could focus on the main points
🎧 and offer to send more details later in a document.
🎧 Hmm, that's a good idea.
🎧 I can also practice a few times to make sure I'm clear and interesting.
🎧 A smooth presentation will definitely leave a good impression.
🎧 Want to go over it with me this afternoon?
🎧 That would be great, thanks Paula!
🎧 You're a lifesaver.
🎧 Hey David, did you hear about the company picnic next month?
🎧 Yeah, I saw the email.
🎧 Sounds fun, free food and all.
🎧 Yeah, but I'm not a big fan of those team-building activities.
🎧 Remember the trust fall last year? So awkward!
🎧 Yeah, that was a bit much.
🎧 But maybe this year will be different?
🎧 I heard they're trying something new.
🎧 Really? What is it?
🎧 An escape room!
🎧 We'll work together to solve puzzles and escape a themed room in a set time.
🎧 That actually sounds fun.
🎧 I love puzzles, and a little friendly competition sounds good.
🎧 Right? Plus, it might be a good way to get to know some coworkers we don't know well.
🎧 Maybe I'll finally get to know
🎧 Kevin from accounting.
🎧 He always seems really quiet.
🎧 Maybe the escape room will show his puzzle skills.
🎧 We should sign up together!
🎧 Man, that report deadline was tough.
🎧 My brain feels like it's tired from staring at spreadsheets all morning.
🎧 Ready for a coffee break?
🎧 Almost. I just need to finish this email.
🎧 No worries, take your time.
🎧 But seriously, you've been looking at that screen for hours.
🎧 You deserve a break!
🎧 You're right.
🎧 My brain feels really tired.
🎧 Where are you thinking? The usual place?
🎧 Of course.
🎧 Maybe they finally restock those
🎧 blueberry muffins this time.
🎧 Now you're speaking my language!
🎧 Coffee and muffins are a perfect match.
🎧 So, what are you working on that's got you so focused today?
🎧 Is it another one of those big marketing
🎧 campaigns everyone's been talking about?
🎧 Just a presentation
🎧 for the marketing team.
🎧 We're thinking of some new social media ideas to get more people involved.
🎧 Oh, fun! Anything exciting you can share?
🎧 Maybe if you buy me that muffin...
🎧 Alright, alright, keep your secrets.
🎧 But seriously, I'm curious!
🎧 We'll see.
🎧 But for now, let's get some coffee, and maybe I'll tell you more.
🎧 Hi there, I'm Duke!
🎧 I work in marketing at Green Tech Solutions.
🎧 Duke, nice to meet you!
🎧 I'm with Sun City Solar. We install solar panels.
🎧 Oh, cool! That's a growing business, isn't it?
🎧 Yes, a lot of people are interested in clean energy.
🎧 At GreenTech, we're working on a project to help eco-friendly businesses in the city.
🎧 Interesting!
🎧 Maybe we could find some ways to work together.
🎧 We always look for ways to connect with
🎧 people who care about the environment.
🎧 Would you like to exchange business cards?
🎧 We could talk more about working together.
🎧 Sure!
🎧 What kind of marketing are you working on?
🎧 We're focusing on social media and local events.
🎧 Here's my card. Let's connect on LinkedIn too.
🎧 Sure. It was nice meeting you!
🎧 You too, Patrick.
🎧 Maybe I'll see you at another event soon.
🎧 Hey Mark, do you have a minute?
🎧 Sure, Amelia. Have a seat.
🎧 What's on your mind?
🎧 It's about the Johnson project.
🎧 I looked at our plan again,
🎧 and I think we need to change the time for the design part.
🎧 What's the problem?
🎧 Well, the client gave me new feedback yesterday
🎧 and it looks like the design needs
🎧 more work than I thought.
🎧 I see.
🎧 Maybe we should give the design an extra week.
🎧 Do you think that will change
🎧 the launch date?
🎧 I hope not.
🎧 We can move some other things,
🎧 like making the content or testing.
🎧 Okay, let's check the whole plan and see if we can change anything.
🎧 For sure.
🎧 I'll update the design schedule
🎧 and send it to you to look at.
🎧 Sounds good, Amelia.
🎧 Maybe we can have lunch this week
🎧 and talk about ideas for the new design.
🎧 Great idea!
🎧 Thanks, Mark.
🎧 I'm glad you're helping me with this.
🎧 No problem, Amelia.
🎧 We'll work it out!
🎧 Hey, I've noticed you've been posting some amazing photos recently.
🎧 Are you into photography?
🎧 Yeah, I've been getting into it lately.
🎧 It's such a fun hobby.
🎧 I can tell!
🎧 Your photos are really impressive.
🎧 What got you into photography?
🎧 I just want to capture special moments and memories.
🎧 Plus, it's a fun way to be creative.
🎧 Oh. That's cool.
🎧 What kind of things
🎧 do you usually take pictures of?
🎧 I love taking photos of landscapes,
🎧 especially at sunset.
🎧 The light is just beautiful.
🎧 Great choice.
🎧 I'm more into portraits,
🎧 but I haven't practiced much.
🎧 Portraits are great too.
🎧 You should try it out sometime.
🎧 It's all about experimenting
🎧 and enjoying the process.
🎧 Yeah, I'll have to dust off my camera and give it a try.
🎧 Thanks for the encouragement.
🎧 Anytime!
🎧 Let me know if you ever want to go on a photo adventure together.
🎧 Hey Mike, what are you up to this weekend?
🎧 Nothing much, probably just relaxing at home.
🎧 How about you?
🎧 Me too, actually.
🎧 I'm thinking of trying a new recipe.
🎧 Have you been cooking anything fun lately?
🎧 You know me and fancy recipes, haha.
🎧 But I did try these veggie burgers the other day.
🎧 They were pretty good.
🎧 Veggie burgers, huh? Sounds healthy.
🎧 I'm in the mood for something a bit greasier.
🎧 Maybe some macaroni and cheese?
🎧 Not a bad idea.
🎧 Last night, I made a delicious pasta dish with homemade sauce.
🎧 That sounds amazing!
🎧 What's your secret
🎧 ingredient for the sauce?
🎧 I added a bit of red wine
🎧 for extra flavor.
🎧 It turned out really rich and tasty.
🎧 Nice touch!
🎧 I've been wanting to try more new things with cooking too.
🎧 Do you have any favorite cooking blogs
🎧 or YouTube channels that you watch?
🎧 I often watch Tasty videos on YouTube for quick and easy recipes.
🎧 Thanks, I'll check it out.
🎧 Wow, these colors are amazing.
🎧 What are you looking at?
🎧 This artist on Instagram, their paintings are so bright.
🎧 It makes me want to get out my old watercolors.
🎧 Really? You used to paint?
🎧 Yeah, back in high school.
🎧 I haven't used them in ages, though.
🎧 Life just got too busy.
🎧 I get that.
🎧 You should definitely try again.
🎧 Maybe even try something new,
🎧 like acrylics or something.
🎧 That's a good idea.
🎧 Maybe I'll look for a local art class for beginners.
🎧 There is a great community
🎧 art center downtown.
🎧 They offer all kinds of classes.
🎧 We could even check it out together sometime!
🎧 You'd come with me?
🎧 Of course.
🎧 We could make a day of it and explore the art supply store too.
🎧 That sounds like so much fun.
🎧 Let me know when you're free.
🎧 Is it always this cold in the morning here?
🎧 Only in the spring and fall!
🎧 It gets nice and hot in the summer though.
🎧 Perfect for hiking.
🎧 Do you like hiking?
🎧 Of course.
🎧 I try to go at least once a month.
🎧 It's a great way to clear my head and get some exercise.
🎧 I'm the opposite.
🎧 I haven't been hiking in ages.
🎧 I'm not sure if my knees can handle it when I go again.
🎧 Don't worry.
🎧 You'll get beautiful views
🎧 without the really steep climbs.
🎧 Really?
🎧 I might have to check that out.
🎧 What do you usually take with you?
🎧 Just the basics: backpack, water, snacks, and a good pair of shoes.
🎧 And sometimes a camera
🎧 to take pictures of the scenery.
🎧 Sounds simple enough.
🎧 Maybe we could plan a hike together sometime?
🎧 I'd be up for that!
🎧 This is for your birthday, Anna.
🎧 Thank you so much!
🎧 This must have taken you a lot of time, huh?
🎧 You're right, but it was worth it.
🎧 Did someone teach you to knit,
🎧 or did you learn by yourself?
🎧 I learned it by myself, actually.
🎧 I just started two weeks ago.
🎧 The pattern is really impressive for a beginner!
🎧 Thanks.
🎧 I wish I could knit like this.
🎧 Oh, trust me, it takes practice.
🎧 But it's really relaxing once you get the hang of it.
🎧 You should try it!
🎧 Maybe I should.
🎧 It seems like a good way to relax after work.
🎧 Do you think it's hard to learn?
🎧 Not at all!
🎧 I can teach you the basic stitches if you want.
🎧 We could even have a little knitting night sometime.
🎧 That would be amazing!
🎧 I'd love to learn from you.
🎧 Maybe we could pick out some yarn together too?
🎧 We can make a whole day of it.
🎧 Knitting, yarn shopping, maybe some coffee...
🎧 Sounds like my kind of day!
🎧 Let me know when you're free.
🎧 How's the guitar practice going?
🎧 Not bad.
🎧 I'm finally getting the hang of that fingerpicking pattern you showed me.
🎧 Good job.
🎧 That one can be tricky.
🎧 You have to keep your fingers moving separately.
🎧 Yeah, it takes some practice for sure.
🎧 But it sounds so cool once you get it right.
🎧 Definitely.
🎧 By the way, did you see the flyer for the open mic night at our favorite coffee shop next week?
🎧 No, I must have missed it.
🎧 That sounds interesting.
🎧 Yeah, they have it every other Wednesday.
🎧 Local musicians can play a song or two. It's pretty relaxed.
🎧 Hmm, that could be fun.
🎧 Maybe I could try playing something simple.
🎧 You should!
🎧 It's a good way to get over stage fright and get feedback from other musicians.
🎧 Yeah. You're right.
🎧 Maybe I'll work on a short piece and give it a try.
🎧 Cool! Let me know if you do.
🎧 I'd love to come and cheer you on.
🎧 Hey Nancy, how's it going?
🎧 Hey David, I'm good!
🎧 Just catching up on some emails.
🎧 What about you?
🎧 Same here.
🎧 Actually, I was checking out your social media earlier and saw you mentioned a blog.
🎧 Oh yeah!
🎧 I recently started one about baking.
🎧 I love trying new recipes and thought it'd be fun to share them.
🎧 That's awesome.
🎧 I've been thinking about starting a blog myself
🎧 but on something completely different.
🎧 More on the tech side of things.
🎧 You're a software developer, right?
🎧 So your blog must be about coding.
🎧 That's right.
🎧 I love sharing tips and tricks for beginners.
🎧 That sounds interesting!
🎧 I might need to check that out.
🎧 Definitely!
🎧 Maybe we can swap some blog promotion tips sometime.
🎧 We could even do a guest post on each
🎧 other's blogs to help promote them.
🎧 Oh no, that's a great idea.
🎧 Let's chat more about it later.
🎧 I have a presentation soon.
🎧 Good luck with your presentation.
🎧 Okay everyone, let's start on this biology chapter.
🎧 The exam is next week, remember?
🎧 There's so much to study.
🎧 Don't worry.
🎧 If we work together, it won't feel so hard.
🎧 Exactly. Liam, you did great on the last bio exam.
🎧 Any tips for studying the cell cycle?
🎧 Sure! The most important thing is to understand the different phases.
🎧 Flashcards can really help
🎧 with learning the order.
🎧 Good idea. Maybe we can make some flashcards together for the key words?
🎧 I'm in! Flashcards are better than just reading the textbook again and again.
🎧 Liam, did you say something about practice problems?
🎧 Yeah, there are some good practice problems at the end of each chapter.
🎧 Doing those will help us use what we've learned.
🎧 I think we can split up the problems and quiz each other on them.
🎧 This is starting to feel a little less scary.
🎧 Thanks for setting up this study group, Chris!
🎧 Alright everyone, thanks for coming to tonight's Green Club meeting!
🎧 Hey Isabella, glad I could make it!
🎧 What are we talking about tonight?
🎧 We have a lot to talk about.
🎧 First, I wanted to hear everyone's ideas
🎧 for the Earth Day event on campus.
🎧 I think we could set up a booth with information about how to live in an eco-friendly way.
🎧 Maybe we can have some fun games or activities.
🎧 Great idea, Sarah! 
🎧 We could also give away reusable shopping bags or seed packets.
🎧 Those are both good ideas!
🎧 We could work with the Environmental
🎧 Science Club to reach more people.
🎧 Love that idea, Noah!
🎧 We can talk to them later.
🎧 Now, let's think of more Earth Day event ideas.
🎧 We could have a clothing swap
🎧 to promote sustainable fashion.
🎧 People could bring clothes they don't want and trade them with others.
🎧 I had the same idea as Daniel!
🎧 Oh my, that practice was tough!
🎧 Tell me about it.
🎧 Coach Miller really pushed us today.
🎧 Did you see him running with us during the drills?
🎧 Yeah, no kidding! He has more energy than all of us together.
🎧 It makes you want to work harder when you see your coach trying so much.
🎧 Totally. He really makes us want to do our best.
🎧 So how's your ankle?
🎧 I saw you fall hard during the practice game.
🎧 It's a little sore, but I think I'll be okay.
🎧 I'll put ice on it tonight and see how it feels in the morning.
🎧 Good.
🎧 We can't have any injuries
🎧 before the big game next week.
🎧 I know right?
🎧 We need everyone to be at their best to beat the Wildcats.
🎧 Speaking of the game, are you coming
🎧 to the pre-game pep rally on Friday?
🎧 Absolutely!
🎧 We need to get excited for the win!
🎧 This research paper
🎧 is giving me a headache.
🎧 I feel like I'm not getting anywhere.
🎧 Me too.
🎧 I've been looking at the same paragraph for about 20 minutes.
🎧 Maybe we're not on the right path.
🎧 Have you found any good sources recently?
🎧 Not really.
🎧 Most of the articles I found are too technical
🎧 and don't talk about the social impacts we wanted to focus on.
🎧 Ugh, that's frustrating.
🎧 Wait, Professor Lee mentioned a documentary that might help.
🎧 Did you check the library database for it?
🎧 No, I completely forgot!
🎧 That's a good idea.
🎧 Maybe it will give us some new ideas.
🎧 Hopefully.
🎧 In the meantime, I'll search some social science journals.
🎧 We just need to find the right keywords.
🎧 Maybe we can think of some together.
🎧 Definitely! Two heads are better than one.
🎧 Let's grab some coffee first.
🎧 Maybe a little caffeine will help us figure this out.
🎧 I totally agree.
🎧 If nothing works, we can always meet with Professor Lee for some help.
🎧 May I ask you some questions about your company?
🎧 Absolutely! Welcome to the Technovation booth.
🎧 My name's Ben.
🎧 What are you interested in?
🎧 My name's Jake.
🎧 I'm studying computer science, and I'm
🎧 really interested in software development.
🎧 What kind of opportunities do
🎧 you have for new graduates?
🎧 Technovation is always looking for talented developers.
🎧 We have an internship program that's a great way to get started.
🎧 Oh, interesting! Can you tell me more about the internship program?
🎧 What kind of projects would interns work on?
🎧 Interns will get to work
🎧 on different projects,
🎧 from adding new features to our software
🎧 to creating new applications.
🎧 We encourage interns to share their ideas and take part in the development process.
🎧 That sounds really good.
🎧 Do you have any brochures or information I can take with me?
🎧 Absolutely! Here you go.
🎧 And be sure to check our website
🎧 for more details
🎧 on the internship program
🎧 and other career opportunities.
🎧 We also attend other career fairs
🎧 throughout the year
🎧 so if you don't hear back from us this time, feel free to meet us at another event.
🎧 Thank you so much.
🎧 This has been really helpful.
🎧 You're welcome, Jake!
🎧 Good luck with your job search.
🎧 Hey May, have you seen this?
🎧 Oh wow, a Vietnamese Culture Festival on campus next week! That's cool!
🎧 Right? I didn't know they were doing something like this.
🎧 This makes me feel homesick already.
🎧 We should definitely go!
🎧 It would be a fun way
🎧 to celebrate our culture
🎧 and share Vietnamese traditions
🎧 with others.
🎧 The poster says there will be traditional food vendors.
🎧 I miss banh mi and rice noodles already.
🎧 My mouth is watering just thinking about them.
🎧 Maybe they'll even have sweet soup for dessert!
🎧 Will there be any performances?
🎧 Yes, there will be Vietnamese
🎧 folk music performances.
🎧 What about Vietnamese coffee?
🎧 I hope so!
🎧 Nothing beats a strong cup of iced milk
🎧 coffee to finish the experience.
🎧 We should bring some of our friends
🎧 who don't know about Vietnamese culture.
🎧 It would be a great way
🎧 to show them our traditions.
🎧 Let's check the poster for the time and place.
🎧 Okay, it looks like it's happening next Saturday afternoon at the student center.
🎧 Let's mark it on our calendars so we don't miss it.
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