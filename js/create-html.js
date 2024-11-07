const arrayExcept = ["girl", "while", "whole", "must", "online", "oh", "tough", "we've", "short", "empty", "mr", "ms", "issues", "issue", "already", "touch", "somewhere", "simple", "focus", "easy", "ready", "leaves", "leave", "pm", "fine", "okay", "forward", "open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "hi", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "fun", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "sounds", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "day", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thank", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "her", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "off", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "all", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "hid", "him", "hip", "his", "hit", "hop", "hot", "how", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "now", "off", "oil", "old", "our", "pay", "pen", "pet", "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy", "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "win", "wow", "yam", "you", "zoo", "I'm", "you're", "he's", "she's", "it's", "we're", "they're", "I'll", "you'll", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "you'd", "he'd", "she'd", "it'd", "we'd", "they'd", "aren't", "isn't", "wasn't", "weren't", "can't", "couldn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "hadn't", "mustn't", "mightn't", "shan't", "oughtn't", "there's", "here's", "that's", "what's", "where's", "who's", "how's", "let's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "it's", "what're", "what've", "that'd", "that's", "who're", "who've", "where'd", "where's", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "ain't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hadn't", "hasn't", "haven't", "isn't", "mustn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't", "i", "who", "whom", "whose", "what", "which", "when", "where", "why", "how", "i've", "my", "so", "have", "your"];
const string = `
[What do you want?]

🎧 Hey, Jim. Are you free now?
🎧 I think so. I don't have any homework to do now, so yeah!
🎧 Could you do me a favor?
🎧 Sure thing. What do you want?
🎧 I have homework for my business class.
🎧 That is to conduct an interview about fast food.
🎧 Would you mind if I ask you a few questions?
🎧 No, go ahead.
🎧 Okay, so what is your favorite fast-food restaurant?
🎧 Mcdonald, I guess.
🎧 Why do you like it?
🎧 Well, because of the varied menu and the comfortable and passionate decor.

[Now let me check it once again.]

🎧 Dad! Dad!
🎧 What's wrong, Lucy?
🎧 I want to write a letter to grandma.
🎧 Aw! How lovely you are!
🎧 What do you want to write?
🎧 I want to tell her about my grades at school.
🎧 And I will visit her this summer vacation.
🎧 It is gonna be a nice letter!
🎧 Let me help you write.
🎧 Okay! We're done with the letter.
🎧 Can I send it now?
🎧 No. You have to put it in an envelope,
🎧 and you will need to write down your and her address.
🎧 I don't know grandma's address.
🎧 Let me help you.
🎧 Here. Write down this address.
🎧 Alright! Now let me check it once again.
🎧 And then we can send it to grandma, right?
🎧 Yeah!

[Stop kidding.]

🎧 Are you going to join the party tonight, Adam?
🎧 Which party?
🎧 Alex's birthday party. You didn't know about it?
🎧 No, I didn't.
🎧 But I don't think I can go...
🎧 You'd better go, man! It's gonna be super fun!
🎧 And maybe you can find a girlfriend there.
🎧 Stop kidding, man.
🎧 Seriously, bro! There will be a lot of pretty girls at the party!
🎧 Nah. Nobody's gonna pay attention to me.
🎧 Why don't you give it a try?
🎧 No, thanks. I already have a plan.
🎧 Oh! Come on!

[Are you sure?]

🎧 I think we're getting lost.
🎧 I agree! I don't know where are we right now.
🎧 Don't worry, just follow the map, okay?
🎧 Are you sure? What if we get stuck in this forest forever?
🎧 No way! Trust me, okay?
🎧 What if we meet any wild animals?
🎧 Like lions?!
🎧 Oh no! They're gonna eat us!
🎧 Stop it! Just follow me and don't say anything else!
🎧 Hey, look! I can see the village!
🎧 See, I told ya. All we have to do is to believe in the map!
🎧 Okay, we trust you now.

[No, I don't want to]

🎧 Jenny? Do you have a moment?
🎧 What's the matter, Luke?
🎧 Last night, I checked your file. And I saw that you haven't finished the report.
🎧 Oh, yeah...I'm sorry for that.
🎧 I couldn't meet the deadline.
🎧 Don't worry, we still have today to finish it.
🎧 You'd better work on it now before we submit it to our boss.
🎧 Should we just give up?
🎧 Listen, Jenny. Do you want to work overtime?
🎧 No, I don't want to.
🎧 And do you want to be scolded by our boss?
🎧 Definitely no!
🎧 That's why we cannot give up, Jen.
🎧 Let's work hard and go home early today.
🎧 Got it!

[That's strange.]

🎧 Are you in your room, Sarah?
🎧 Yes, mom.
🎧 Can you check for me whether there is any necklace there?
🎧 I think I dropped it in your room.
🎧 I'm looking for it now, Mom.
🎧 Sorry, but I couldn't find anything!
🎧 That's strange! I remember that I put it on your table.
🎧 I just checked my table and there's no necklace mom
🎧 That's so weird...
🎧 How about the bathroom?
🎧 Maybe you took it off when you were changing clothes.
🎧 Oh, yeah! It makes sense!
🎧 Let me check it!
🎧 Ah! Found it!
🎧 Thank God.

[Can you show me your answer sheet?]

🎧 I've just distributed to everybody a question sheet and an answer sheet.
🎧 Please fill in your answer in 15 minutes.
🎧 Don't forget to read the question as well.
🎧 Hey, Mike.
🎧 What?
🎧 Could you show me your answer sheet?
🎧 There are some parts that I'm not sure about...
🎧 I'm sorry, but I can't.
🎧 If Mr. Henry knew this, he would give us an F!
🎧 Dustin! Mike! Are there any problems?
🎧 No, Mr. Henry.
🎧 Please keep quiet and do your work.
🎧 Okay!

[I'm sorry to interrupt you.]

🎧 ...So, I just finished discussing the main goals of this project.
🎧 Excuse me?
🎧 Yes, please.
🎧 I'm sorry to interrupt you,
🎧 but I have a question about the deadline for this project.
🎧 Oh, don't worry. I haven't mentioned the deadline yet!
🎧 After talking about the marketing strategies, I'm gonna move to that part.
🎧 Thank you.
🎧 You're welcome.
🎧 Before I move to the next slide, does anyone have any other questions?
🎧 I'm sorry, could you explain the goals again for me?
🎧 I didn't really focus...
🎧 No problem. I will talk about the goals once again for everyone.

[Allow me]

🎧 Hey, Dylan. I am here!
🎧 How are you doing?
🎧 I'm okay! You?
🎧 I'm pretty good, I guess!
🎧 Oh! Let me introduce you to my wife, Linda.
🎧 Nice to meet you, sir.
🎧 It's a pleasure to meet you.
🎧 Can I call you by your first name?
🎧 Yes. Please feel free to do so.
🎧 I heard a lot about you, Mrs. Linda.
🎧 James sometimes mentions how wonderful you are.
🎧 Oh, come on. Just sometimes, okay?
🎧 Hahaha. You don't have to be shy...
🎧 James always mentions how wonderful you are.
🎧 Stop it! Stop it!
🎧 Wow, that surprised me!

[Will you go there or shall I?]

🎧 Alright. We can end our lessons today.
🎧 Don't forget to clean the classroom before you leave!
🎧 It's our duty today, right, Nancy?
🎧 Yeah.
🎧 We have to borrow the vacuum first.
🎧 Where can we find it?
🎧 At the security office on the 1st floor, I guess.
🎧 Do you want to go there or should I?
🎧 Let me do it. While I'm gone, you can arrange the desks.
🎧 Okay, got it!
🎧 I've got the vacuum now.
🎧 I've also finished arranging the desks.
🎧 Maybe I can do the vacuum and you can clean the desks.
🎧 Sure thing.
🎧 Let's do it!

[What do you think?]

🎧 What's the date of today?
🎧 It's the 6th of July.
🎧 Oh...Wait! Isn't this Sunday Sandra's birthday?
🎧 Sunday is the 10th of July...Ah, yes!
🎧 We can go to the shopping center and buy a gift for her.
🎧 What do you think?
🎧 I'll go with it!
🎧 Do you know what she likes?
🎧 I guess she likes listening to US-UK music.
🎧 Then we can go to the CD shop to buy her a vinyl record!
🎧 Fantastic!
🎧 I believe she's gonna love it!
🎧 Let's go!

[What are your hobbies?]

🎧 Are you reading books, Tracy?
🎧 That's right. I'm reading a manga.
🎧 What is manga?
🎧 Oh, it's like comics. But it comes from Japan.
🎧 Ah, I see. Is it your hobby to read manga?
🎧 You can say so! And I also read sci-fi novels!
🎧 Hey, cool! I love sci-fi, but I tend to watch sci-fi movies!
🎧 What are your hobbies? I mean, other hobbies than movies.
🎧 Hmmm, let me think...
🎧 I enjoy listening to music in my free time.
🎧 Besides, I also love partying!
🎧 Partying? I love parties, too!
🎧 Talking about partying, I heard that there will be a farewell party before we graduate!
🎧 Yeah, I also heard about it!
🎧 We should definitely go!

[What did you say?]

🎧 Today is gonna be a great day!
🎧 Yeah! We finally have time to hang out together!
🎧 What do you want to do today?
🎧 I heard that there's a new cafe opening in town.
🎧 Want to check it out?
🎧 Sorry, what did you say?
🎧 I said there's a new coffee shop in town.
🎧 Oh, really?
🎧 Yeah! We can go there first if you want.
🎧 OK! Let's go!
🎧 I wanna take a lot of photos with you!
🎧 It's a great idea because this coffee has a city view!
🎧 City view?
🎧 That's the best!
🎧 I bet we're gonna have a lot of nice photo.

[What do you need?]

🎧 I'm going camping with my class
🎧 this Saturday, Mom.
🎧 Wonderful!
🎧 But I don't know how to prepare for the trip.
🎧 Alright... So what do you need?
🎧 My teacher only said that please prepare well. That's all!
🎧 Hahaha. Don't worry. You have me. I'll help you to prepare
🎧 Do I need to bring a lot of food, Mom?
🎧 It's a good idea, but you will need other things as well.
🎧 How about sleeping bags and pillows?
🎧 Oh, yeah! I will definitely need those things!
🎧 Please write it down so that you won't forget.
🎧 I think I'm gonna bring some water bottles as well.
🎧 You're going to need a flashlight as well.
🎧 Oh, yes! You are right.
🎧 Let me write it down.

[What do you want to do?]

🎧 Summer is coming.
🎧 What do you want to do?
🎧 Me? I think I will go swimming!
🎧 Are you going to the swimming pool?
🎧 No! I will go to the beach!
🎧 Wow! But there aren't any beaches here!
🎧 I intend to travel to Hawaii with my family.
🎧 Hawaii is paradise on Earth, right?
🎧 Exactly!
🎧 You can relax and enjoy the Hawaiian culture.
🎧 One day, I will definitely make enough money to go to Hawaii!

[What are you up to?]

🎧 Hey, Luna. What are you up to?
🎧 I'm just making a shopping list.
🎧 Shopping list?
🎧 Are you going to the supermarket?
🎧 Yeah! Wanna join?
🎧 I'm not sure what I'm going to buy but...
🎧 Okay! I will go with you!
🎧 I heard that there's gonna be a lot of discounts today.
🎧 Really?
🎧 Yeah! Especially the vegetables and fruits.
🎧 Great! I'm gonna buy some watermelons!
🎧 How about you, what are you going to buy?
🎧 Apart from vegetables and fruits, I think I will buy some frozen food.
🎧 What kind of frozen food are you going to buy?
🎧 A lot, I guess: Sausages, Pizza,...
🎧 Oh! Ice-creams as well!

[What do you want?]

🎧 Today is your birthday, Lucas!
🎧 What do you want?
🎧 I can buy everything for you!
🎧 How rich you are! Hahaha!
🎧 Honestly, I just want to hang out with you today.
🎧 You don't have to buy me anything.
🎧 Are you sure?
🎧 You're gonna regret it if you don't receive my gifts.
🎧 Okay...okay...
🎧 I think I want a pair of shoes.
🎧 Alright, let's go to the shoe shop now.
🎧 What color do you like?
🎧 I love red.
🎧 How about this pair?
🎧 It's too big, I guess.
🎧 Will this one be better?
🎧 Wow! It looks so cool!
🎧 I'm going to choose it!
🎧 Sure! Let me pay it for you!
🎧 You're so generous!

[What's your email address?]

🎧 Oh..I was so sleepy this morning that I missed Economics class...
🎧 Wait...you didn't come to class?
🎧 Yeah...I couldn't catch the bus.
🎧 Don't worry, I guess the professor always records the lecture.
🎧 Do you know where we can find the recording?
🎧 Let me send it to you.
🎧 What's your email address?
🎧 It's linda@gmail.com
🎧 Alright...I've just sent it!
🎧 I got your email!
🎧 Thank you so much, Jane!
🎧 You're welcome.
🎧 Please try to come to class next time.
🎧 Will do.

[What is your job?]

🎧 How have you been, Bob?
🎧 I've got a job and I will start working next week.
🎧 Wow! Congratulations! What is your job?
🎧 I'm a sales assistant in a small company.
🎧 Oh, really? I thought that you would become a teacher!
🎧 Well, I love talking and sharing experiences with people,
🎧 and becoming a teacher is one of them.
🎧 But after all, I feel like I'm not suitable for that job.
🎧 So how did you get your current job?
🎧 Well, I just found the company's job description on the Internet.
🎧 Then I thought, "Wow! Interesting!"
🎧 So I applied for the job, had an interview and got accepted!
🎧 This is your destiny!
🎧 I believe so!

[What's your phone number?]

🎧 Hello. I'm Joan.
🎧 I'm looking forward to being your deskmate through this semester.
🎧 Nice to meet you, Joan. I'm Chloe.
🎧 I hope that we can become friends and study together!
🎧 Do you want to exchange our phone numbers?
🎧 Sure! What's your phone number?
🎧 Mine is 1248593850.
🎧 Alright...Got it!
🎧 Let me try to call you now real quick.
🎧 Oh, I received your phone call.
🎧 This is your phone number, right?
🎧 Yeah! Please save my number!
🎧 Do you have any social media accounts?
🎧 Hmmm, I only use Instagram and Facebook.
🎧 Me, too.
🎧 Let's exchange our accounts as well.
🎧 If there's anything that we miss in class, we can tell each other.
🎧 Sure thing!

[She is not my best friend]

🎧 Hey Jennifer. Are you going to Sally's birthday party tonight?
🎧 Is that tonight?
🎧 Yeah. Can you go?
🎧 I was thinking about it. Are you?
🎧 Yeah, I heard it's gonna be a lot of fun.
🎧 Oh.
🎧 Well... I think you should go. It's your best friend's birthday, after all.
🎧 No, she isn't my best friend.
🎧 What happened?
🎧 She slandered me.
🎧 Although she apologized, we can't be good friends anymore.
🎧 That's really bad.

[Even Steven]

🎧 Thank you so much.
🎧 If you hadn't helped me last week, I wouldn't have finished the job on time.
🎧 Oh. It's nothing.
🎧 We are friends and colleagues, aren't we?
🎧 And you often helped me.
🎧 It was such a difficult project.
🎧 Without your help, I wouldn't be able to do it alone.
🎧 So I have to say thank you, anyway.
🎧 I'm glad to have helped.
🎧 If there's anything else I can do, please let me know.
🎧 I will. And may I offer you a meal as a thank you?
🎧 Oh, just buy me a drink and we're even-steven.
🎧 Okay, so tomorrow morning I'll buy you a glass of starbuck.
🎧 Great! Well.. I have to go. See ya!
🎧 See ya!

[You have a lot of explaining to do]

🎧 Where have you been?
🎧 Do you know what time it is?
🎧 I'm sorry, Dad. I lost track of time.
🎧 Alright, I have something to tell you and you have a lot of explaining to do.
🎧 First, tell me why you're late.
🎧 I forgot my phone and had to go back to class to get it.
🎧 That still doesn't explain why you're late, but okay.
🎧 Now I want you to explain this.
🎧 What's the matter, Dad?
🎧 Why did you get an F in Literature?
🎧 I didn't study enough.
🎧 I'm disappointed in you.
🎧 You won't be allowed to go out until you pass the test.

[Feel free to call me any time]

🎧 We haven't been apart for so long.
🎧 I'll miss you.
🎧 Yeah, I'll miss you too. It's just a year.
🎧 I promise we'll stay in touch.
🎧 We can have video calls every week.
🎧 Yeah. Feel free to call me any time.
🎧 Sure. Maybe you could come visit me while I'm there.
🎧 I wish I could, but you know I need to finish my studies.
🎧 Yeah, right.
🎧 So we'll be in touch for sure.
🎧 Definitely!
🎧 Well, I have to go now. I need to pack my bags and get ready.
🎧 Thanks for having me and showing me around.
🎧 It was nothing, really.
🎧 Don't forget to let me know when you get there okay?
🎧 Will do. I'll text.
🎧 Now get going before you miss your flight.
🎧 Take care and see you again soon.
🎧 Bye!
🎧 Bye, Rachel.

[I love my job]

🎧 Hey, how are you?
🎧 I'm good. How about you?
🎧 I am fine. So in which company are you working?
🎧 I am working at Golden Hotel.
🎧 What is your post?
🎧 I am in the security department.
🎧 That's great!
🎧 Yeah, I really love my job.
🎧 Why?
🎧 Yeah, I like that it's mostly a stable job with opportunities even in a bad economy.
🎧 I agree with you.

[Describe yourself in one word]

🎧 Welcome to PG Group, David.
🎧 I'm Tom.
🎧 Hello, it's nice to meet you.
🎧 Nice to meet you too, how are you today?
🎧 I am doing well, and yourself?
🎧 Great, thanks. So David, shall we start?
🎧 Yeah, sure.
🎧 First of all, let me introduce myself.
🎧 I am the manager of our engineering department here and we have an open position.
🎧 Yes sir, I read about the position on your website, and I think I am a good fit.
🎧 Great! So which school did you graduate from?
🎧 I was a student at Oxford University, and I graduated with a bachelor degree in computer science.
🎧 Amazing.
🎧 Yeah, I've also worked as a computer lab tutor in school for about 2 years.
🎧 What are you looking for in a job?
🎧 The job should definitely help me grow in my career.
🎧 I'd be happy to learn and develop while working in a company as passionate as yours.
🎧 So can you describe yourself in one word?
🎧 Diligent.
🎧 Very well. Now, do you mind working overtime?
🎧 No, I don't mind.
🎧 Okay, do you have any questions for me?
🎧 No, I think I have a pretty good understanding of the requirements.
🎧 I hope to have the opportunity to work for you.
🎧 I can tell that you are a good candidate.
🎧 Expect to hear from us within a week or so about the job.
🎧 Thanks, sir. Have a nice day.

[It feels like ages ago]

🎧 Well, hello there, Diana!
🎧 Wow. Long time no see.
🎧 It is great to see you again!
🎧 Linda! Hello! What a coincidence!
🎧 I haven't seen you in ages! It is great to see you.
🎧 Yeah, right. It feels like ages ago.
🎧 So what brings you to Manchester? Are you just visiting?
🎧 I travel with my boyfriend.
🎧 Anyway, really happy to see you here.
🎧 Yeah... it's a small world.
🎧 We must keep in touch. Do you still have my mobile number?
🎧 No. I lost my phone here is my new number.
🎧 OK. I will save your number.
🎧 I've got to go back to work. But give me a ring so we can arrange dinner sometime.
🎧 For sure, take care. Bye!

[You're important to me]

🎧 Hey listen, now that our anniversary is just a few days after,
🎧 why don't we plan to go somewhere?
🎧 That's a great idea.
🎧 I want to go on that dream vacation you've always promised me.
🎧 You mean, to Europe, right?
🎧 Yes right. You still remember?
🎧 Of course. I know you want to fly first class and stay at 5-star hotels and of course,
🎧 I booked a plane ticket to Europe.
🎧 That's so sweet.
🎧 Baby. You know, you were important to me and you matter to me in every way.
🎧 I can do anything for you.
🎧 So sweet, I love you.

[He's away right]

🎧 What happened? You look so sad.
🎧 Yesterday, my bag was stolen.
🎧 Gosh, that's bad.
🎧 That's right, I left my car keys, phone and wallet in there.
🎧 So how did you get home?
🎧 I borrowed a girl's phone and called my husband. He's on his way.
🎧 Have you reported it to the police?
🎧 Yes, I have.
🎧 I hope you find your bag.
🎧 Me too.

[Have you ever tried this?]

🎧 Wow this is so delicious.
🎧 This is apple pie, right?
🎧 Yes, right. Have you ever tried this?
🎧 Yeah, I've had this before.
🎧 Well... you know, apple pie originated in England.
🎧 Oh really?
🎧 Yeah. Apple pie is an unofficial symbol of the United States
🎧 and one of its signature comfort foods.
🎧 Can you teach me to make this?
🎧 Of course.
🎧 Great!
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

  if (item.endsWith('.<br/>') || item.endsWith(',<br/>') || item.endsWith('!<br/>') || item.endsWith('?<br/>')) {
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

  if (lastChar.endsWith('.<br/>') || lastChar.endsWith(',<br/>') || lastChar.endsWith('!<br/>') || lastChar.endsWith('?<br/>')) {
    lastChar = `${lastChar}\n`;
  }

  if (!arrayExcept.includes(item.toLowerCase())) {
    return `<span>${item}</span>${lastChar}`;
  }

  return `${item}${lastChar}`;
});
const outputHtml = arrayHtml.join(' ') + '<br/><br/>';
const listTimes = [0.04, 0.58, 2.1, 3.07, 4.05, 5.02, 6.06, 6.59, 7.57, 8.58, 9.54, 10.45, 11.53, 12.43, 13.45, 14.35, 15.42, 16.47, 17.38, 18.40, 19.49, 20.36, 21.32, 22.27, 23.40, 24.27, 26.22, 27.28, 28.24, 29.09];
listTimes.forEach(item => {
  console.log(convertToSeconds(item));
});
console.log(outputHtml);