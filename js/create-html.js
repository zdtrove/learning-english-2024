const arrayExcept = ["serious", "product", "company", "practice", "remember", "amount", "students", "personal", "university", "wonderful", "order", "large", "success", "number", "group", "heard", "second", "watching", "finally", "amazing", "children", "date", "month", "student", "option", "options", "important", "perfect", "says", "looking", "yourself", "likes", "show", "girls", "books", "movie", "lots", "lately", "bye", "until", "sorry", "drink", "ah", "shall", "speak", "room", "Mrs", "interested", "answer", "called", "call", "want", "wanted", "although", "hello", "hours", "actually", "everyday", "uh", "meet", "girl", "while", "whole", "must", "online", "oh", "tough", "we've", "short", "empty", "mr", "ms", "issues", "issue", "already", "touch", "somewhere", "simple", "focus", "easy", "ready", "leaves", "leave", "pm", "fine", "okay", "forward", "open", "those", "garden", "rather", "young", "often", "less", "trying", "name", "taken", "through", "wish", "alright", "thank", "having", "because", "makes", "plan", "english", "exactly", "myself", "glad", "agreed", "down", "idea", "playing", "weekend", "could", "feeling", "friends", "sounds", "thought", "definitely", "friend", "join", "living", "everyone", "today", "taking", "phone", "wait", "went", "wrong", "does", "check", "together", "color", "ever", "never", "either", "choose", "agree", "now", "quickly", "working", "another", "free", "class", "travel", "first", "spending", "catch", "everything", "too", "near", "comes", "though", "famous", "future", "hobby", "maybe", "whatever", "sell", "sometimes", "since", "once", "outside", "behind", "change", "changes", "needs", "lives", "came", "loved", "getting", "decide", "week", "before", "i'd", "every", "cooking", "lunch", "done", "hi", "listen", "probably", "thinking", "dinner", "food", "yeah", "place", "really", "might", "able", "later", "funny", "morning", "talking", "anything", "advice", "side", "else", "absolutely", "helps", "quite", "something", "planning", "things", "thing", "under", "great", "start", "share", "along", "hear", "different", "best", "almost", "sound", "money", "visit", "music", "house", "after", "please", "tell", "tells", "help", "size", "drive", "become", "takes", "driving", "inside", "between", "read", "year", "years", "again", "then", "water", "course", "i'm", "game", "mean", "without", "yet", "been", "ok", "saying", "keep", "move", "example", "during", "most", "across", "soon", "also", "full", "hope", "right", "told", "case", "home", "special", "both", "kind", "small", "their", "next", "happy", "good", "well", "nice", "yes", "no", "enough", "around", "away", "come", "doing", "going", "want", "person", "people", "only", "same", "i'll", "these", "last", "sure", "used", "play", "back", "took", "would", "should", "about", "him", "find", "book", "over", "learn", "talk", "said", "life", "live", "with", "all", "better", "little", "feel", "am", "even", "gave", "being", "long", "need", "we", "time", "own", "other", "each", "usually", "sometime", "always", "love", "thanks", "than", "more", "much", "into", "still", "give", "this", "us", "made", "take", "one", "just", "know", "were", "them", "here", "out", "think", "look", "looks", "they", "up", "that", "he", "there", "or", "like", "if", "go", "will", "very", "as", "such", "is", "it", "me", "to", "in", "at", "on", "of", "from", "some", "enjoy", "work", "school", "make", "high", "many", "🎧", ".", ",", "!", "?", "a", "act", "add", "age", "ago", "air", "an", "and", "any", "are", "ask", "bad", "bag", "ban", "be", "bed", "bee", "beg", "bet", "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "by", "can", "cap", "car", "cat", "cod", "cow", "cry", "cub", "cup", "cut", "dad", "day", "did", "do", "dog", "dot", "dry", "eat", "egg", "end", "era", "eye", "fad", "fan", "fat", "fax", "few", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun", "fur", "gas", "get", "gig", "got", "gum", "gun", "gut", "guy", "gym", "had", "has", "hat", "her", "hey", "his", "hit", "hop", "hot", "hug", "ice", "its", "key", "law", "lay", "leg", "let", "lot", "low", "mad", "man", "map", "may", "men", "mix", "mom", "new", "not", "off", "oil", "old", "our", "pay", "pen", "pet", "pop", "pot", "pro", "pub", "pun", "put", "ran", "raw", "red", "rib", "rid", "rim", "rip", "rob", "rod", "rot", "row", "run", "sad", "saw", "say", "sea", "see", "set", "she", "shy", "sir", "sit", "six", "sky", "son", "sub", "sun", "tag", "tap", "tea", "ten", "the", "tie", "tip", "top", "toy", "try", "two", "use", "war", "was", "way", "web", "wed", "wet", "who", "win", "wow", "yam", "you", "zoo", "it's", "we're", "they're", "he'll", "she'll", "it'll", "we'll", "they'll", "I'd", "he'd", "she'd", "it'd", "we'd", "they'd", "mightn't", "oughtn't", "there's", "here's", "what's", "where's", "how's", "who'll", "who'd", "who've", "who's", "let's", "could've", "should've", "would've", "must've", "might've", "he's", "she's", "what're", "what've", "that'd", "that's", "who're", "where'd", "when's", "why'd", "why're", "why's", "wouldn't", "you'd", "you'll", "you're", "you've", "gimme", "gonna", "gotta", "lemme", "wanna", "ain't", "needn't", "hadn't", "mustn't", "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "hasn't", "haven't", "isn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "i", "whom", "whose", "what", "which", "when", "where", "why", "how", "i've", "my", "so", "have", "your"];
const string = `
[109] Cam9 - Test 4 - Part 1

🎧 Can I help you?
🎧 Yes, I've just moved to this area with my wife and children
🎧 and I'd like to know where we can all register with a doctor at a Health Centre.
🎧 Okay.
🎧 Well, there's Doctor Green at The Harvey Clinic.
🎧 We always recommend her for babies, because she's very good with them and she runs a special clinic.
🎧 Oh... actually my youngest child is five, so that wouldn't be any good for us.
🎧 Right.
🎧 Is there anywhere else I could try?
🎧 Yes, the Eshcol Health Practice is the next one on my list.
🎧 How do you spell that?
🎧 ESHCOL.
🎧 And it's Doctor Fuller, who has space on his list.
🎧 The clinic only opened a year ago, so the facilities are all very modern.
🎧 That sounds good.
🎧 And it's particularly good if you're busy during the day,
🎧 because they also do appointments in the evening.
🎧 They're closed on Saturday, though.
🎧 The only other place on the list is the Health Centre on Shore Lane.
🎧 You can register with Doctor Gormley,
🎧 that's GORMLEY.
🎧 He's new there, but the centre has a very good reputation.
🎧 Oh yes, I think I know the road.
🎧 That would be the best one.
🎧 Thanks.
🎧 Could you tell me, will all their services be free?
🎧 Erm... there are usually some small charges that doctors make.
🎧 Let me see what it says about the Shore Lane Centre.
🎧 If you need to be vaccinated before any trips abroad, you won't have to pay for this.
🎧 Erm, what else?
🎧 The sports injury treatment service operates on a paying basis,
🎧 as does the nutritional therapy service.
🎧 Some health centres do offer alternative therapies like homeopathy as part of their pay-to-use service.
🎧 Shore Lane are hoping to do this soon.
🎧 I think they may start with acupuncture.
🎧 And finally, if you need to prove you're healthy
🎧 or haven't had any serious injuries before a new employer will accept you,
🎧 you can get a free fitness check-up there,
🎧 but you'd most likely have to pay for insurance medicals though.
🎧 Okay, thanks.
🎧 You might also be interested to know the Centre is running a pilot scheme of talks for patients.
🎧 I've got the list here.
🎧 Actually, they look very interesting.
🎧 What sort of things?
🎧 Well, the first one's about giving up smoking.
🎧 It's next week, the twenty-fifth of February, at 7 pm,
🎧 and that's in Room 4.
🎧 It says, the talk will stress the health benefits, particularly for people with asthma or heart disease.
🎧 That sounds very interesting.
🎧 There's also a talk for families with children.
🎧 It's on Healthy Eating, and takes place on the first of March at five o'clock.
🎧 Will that be at the Health Centre?
🎧 Erm, actually it's at the primary school on Shore Lane.
🎧 I imagine they're inviting the parents of pupils there - it says here 'all welcome'.
🎧 I might go to that if I have time.
🎧 There's a couple of other talks -
🎧 one giving advice about how to avoid injuries while doing exercise.
🎧 It's on the ninth of March.
🎧 Oh, it's a late afternoon talk, at 4:30
🎧 and it'll be in Room 6.
🎧 It also says the talk is suitable for all ages.
🎧 And finally, there's a talk called 'Stress Management'...

[110] Cam9 - Test 4 - Part 2

🎧 Hello?
🎧 Hi. It's Laura Cariton here.
🎧 We've just arrived at the holiday flat, but I can't get the hot water and heating to work.
🎧 Oh right!
🎧 That's easy.
🎧 Don't worry.
🎧 In the upstairs cupboard, you'll find the water heater.
🎧 You'll see three main controls on the left at the bottom of the heater.
🎧 The first one - the round one on the far left -
🎧 is the most important one for the heating and hot water.
🎧 It's the main control switch.
🎧 Make sure it's in the 'on' position.
🎧 The switch itself doesn't light up.
🎧 But the little square below will be black if the switch is 'off'.
🎧 That's probably what's happened - it's got switched off by mistake.
🎧 The middle one of these three controls - you'll see it's slightly larger than the first one - controls the radiators.
🎧 If you feel cold while you're there and need the radiators on,
🎧 this needs to be turned to maximum.
🎧 The last of the three controls - the one on the right -
🎧 is usually on about a number four setting which, for the water in the taps, is usually quite hot enough.
🎧 Below the heating controls in the middle is a small round plastic button.
🎧 If there isn't enough water in the pipes, sometimes the heater goes out.
🎧 If this happens you'll need to press this button to reset the heater.
🎧 Hold it in for about five seconds
🎧 and the heater should come on again.
🎧 Then there's a little square indicator under the third knob that's a kind of alarm light.
🎧 It'll flash if you need to reset the heater.
🎧 It sounds complicated...
🎧 I'm sure you won't have any problems with it.
🎧 There should be some more instructions on the side of the heater.
🎧 Call me back if you can't make it work.
🎧 Okay.
🎧 While you're on the phone, we haven't managed to find a few things we need,
🎧 like extra pillows for the beds and some washing powder.
🎧 Is there any here?
🎧 Pillows... yes.
🎧 If you look in the cupboard,
🎧 the large white one upstairs - to the left of the bathroom door -
🎧 there should be four or five on the top shelf.
🎧 And if you want to do some washing,
🎧 there's some powder for that...
🎧 probably by the back door.
🎧 There's a kind of shelf there above the sink.
🎧 In fact, I'm sure there's some there, in a large blue box.
🎧 You need about half a cup full for each wash.
🎧 Oh... and that reminds me,
🎧 the spare key to the back door is hanging on a hook on the wall by the sitting room window.
🎧 Please make sure to put it back when you've used it.
🎧 The previous guests lost it in the garden and I had to get another one made.
🎧 And, if you have any trouble with the lamps.
🎧 you'll find some spare bulbs in a large cardboard box.
🎧 It's on top of the washing machine with all kinds of useful things in it.
🎧 Oh, and another thing I forgot to mention when we last spoke...
🎧 Yes?
🎧 I've left you a local map, so you'll be able to find your way around easily.
🎧 It shows the whole area.
🎧 I put it in the top drawer of the chest under the TV in your bedroom.
🎧 There's a whole file of local information in there too.
🎧 Thanks.
🎧 What about visiting the town?
🎧 Can you give us any advice?
🎧 Yes.
🎧 You'll need to take the car.
🎧 It's too far to walk from the flat really.
🎧 You have to pay to leave your car in all the car parks now I'm afraid...
🎧 I like the one that's by the station best
🎧 and you can walk to the town centre from there in five minutes.
🎧 That's where all the best restaurants are.
🎧 But if you want a takeaway,
🎧 the Italian one does really good pasta and pizzas.
🎧 Call 732281 for that one,
🎧 or 766119 for the Chinese.
🎧 They're both good and they'll both deliver to the flat.
🎧 As for places to visit,
🎧 yes, do go and see the railway museum.
🎧 The exhibition is small but really good.
🎧 It gets very crowded on Sundays,
🎧 so I suggest you visit it on a quieter day, later in the week,
🎧 but not on Thursdays which is market day -
🎧 you won't find anywhere to park
🎧 and it's also the only day of the week when they're not open!
🎧 Anything else?
🎧 Not for the moment. Thanks!

[111] Cam9 - Test 4 - Part 3

🎧 Hello, Kira, how are you?
🎧 Fine thanks, Paul, how are you?
🎧 Well, thanks.
🎧 It's good to see you.
🎧 It must be 12 months since you did our course?
🎧 That's right.
🎧 It's nice to come back and say hello.
🎧 What course did you enroll in?
🎧 Actually, I went straight into third year Pharmacy.
🎧 They credited me with two years, which probably made it more difficult for me.
🎧 On the other hand, you were lucky to be granted credits.
🎧 Is that why you chose the course?
🎧 Yes.
🎧 And, as I'd already finished a course in it in my country.
🎧 I thought it would be easier if I studied something I already knew.
🎧 I didn't realise you went into third year.
🎧 I thought you started in first year.
🎧 No wonder it was so hard!
🎧 And what do you think is one of the big differences between studying at a university here and studying in your country?
🎧 Well, I've found it very difficult to write assignments,
🎧 because I wasn't familiar with that aspect of the system here.
🎧 The main problem is that the lecturers expect you to be critical.
🎧 That made me feel really terrible.
🎧 I thought "How can I possibly do it?"
🎧 "How can I comment on someone else's research when they probably spent five years doing it?"
🎧 I think a lot of people who come from overseas countries have similar problems.
🎧 But after a while, it became easier for me.
🎧 People expect you to have problems with the process of reading and writing
🎧 but, in fact, it is more a question of altering your viewpoint towards academic study.
🎧 How was the content of the lectures?
🎧 Was it easy for you?
🎧 I didn't really have many problems understanding lectures.
🎧 The content was very similar to what I'd studied before.
🎧 And what about the lecturers themselves?
🎧 Are they essentially the same as lecturers in your country?
🎧 Well, actually, no.
🎧 Here, they're much easier to approach.
🎧 After every lecture, you can go and ask them something you didn't understand.
🎧 Or you can make an appointment and talk to them about anything in the course.
🎧 Maybe you found them different because you're a more mature student now,
🎧 whereas when you were studying in your country, you were younger and not so assertive.
🎧 No, I don't think that's the difference.
🎧 Most of the students here do it.
🎧 In my faculty, they all seem to make appointments -
🎧 usually to talk about something in the course that's worrying them,
🎧 but sometimes just about something that might really interest them,
🎧 something they might want to specialise in.
🎧 The lecturers must set aside certain times every week when they're available for students.
🎧 That's good to hear.
🎧 And how was your timetable?
🎧 Was it a very busy year?
🎧 Very, very busy.
🎧 They make you work very hard.
🎧 Apart from lectures, we had practical sessions in a lot of subjects.
🎧 We did these in small groups.
🎧 I had to go and work four hours every week in a community pharmacy.
🎧 Actually, I enjoyed this very much - meeting new people all the time.
🎧 Then in second semester, we had to get experience in hospital dispensaries,
🎧 so every second day we went to one of the big hospitals and worked there.
🎧 And on top of all that we had our assignments,
🎧 which took me a lot of time.
🎧 Oh, I nearly forgot, between first and second semesters,
🎧 we had to work full-time for two weeks in a hospital.
🎧 That does sound a very heavy year.
🎧 So are you pleased now that you did it?
🎧 Do you feel some sense of achievement?
🎧 Yeah, I do feel much more confident,
🎧 which I suppose is the most important thing.
🎧 And have you got any recommendations for people who are studying from overseas?
🎧 Well, I suppose they need very good English.
🎧 It would be much better if they spent more time learning English before they enter the university,
🎧 because you can be in big trouble if you don't understand what people are saying
🎧 and you haven't got time to translate.
🎧 Anything else?
🎧 Well, as I said before,
🎧 the biggest problem for me was a lack of familiarity with the education system here.
🎧 It sounds as if it was a real challenge.
🎧 Congratulations, Kira.
🎧 Thanks, Paul.

[112] Cam9 - Test 4 - Part 4

🎧 Good morning.
🎧 Today I'd like to present the findings of our Year 2 project on wildlife found in gardens throughout our city.
🎧 I'll start by saying something about the background to the project,
🎧 then talk a little bit about our research techniques,
🎧 and then indicate some of our interim findings.
🎧 First of all, how did we choose our topic?
🎧 Well, there are four of us in the group and one day while we were discussing a possible focus,
🎧 two of the group mentioned that they had seen yet more sparrow-hawks - one of Britain's most interesting birds of prey -
🎧 in their own city centre gardens
🎧 and wondered why they were turning up in these gardens in great numbers.
🎧 We were all very engaged by the idea of why wild animals would choose to inhabit a city garden.
🎧 Why is it so popular with wildlife when the countryside itself is becoming less so?
🎧 The first thing we did was to establish what proportion of the urban land is taken up by private gardens.
🎧 We estimated that it was about 1/5,
🎧 and this was endorsed by looking at large-scale usage maps in the town land survey office -
🎧 24% to be precise.
🎧 Our own informal discussions with neighbours and friends led us to believe that
🎧 many garden owners had interesting experiences to relate regarding wild animal sightings
🎧 so we decided to survey garden owners from different areas of the city.
🎧 Just over 100 of them completed a survey once every two weeks for twelve months -
🎧 ticking off species they had seen from a pro forma list -
🎧 and adding the names of any rarer ones.
🎧 Meanwhile, we were doing our own observations in selected gardens throughout the city.
🎧 We deliberately chose smaller ones because they were by far the most typical in the city.
🎧 The whole point of the project was to look at the norm not the exception.
🎧 Alongside this primary research on urban gardens,
🎧 we were studying a lot of books about the decline of wild animals in the countryside
🎧 and thinking of possible causes for this.
🎧 So what did we find?
🎧 Well, so much that I just won't have time to tell you about here.
🎧 If you're interested in reading our more comprehensive findings,
🎧 we've produced detailed graphic representations on the college website
🎧 and of course any of the group would be happy to talk to you about them.
🎧 Just email us.
🎧 What we've decided to present today is information about just three species -
🎧 because we felt these gave a good indication of the processes at work
🎧 in rural and urban settings as a whole.
🎧 The first species to generate a lot of interesting information was frogs.
🎧 And there was a clear pattern here -
🎧 they proliferate where there is suitable water.
🎧 Garden ponds are on the increase,
🎧 rural ponds are disappearing,
🎧 leading to massive migration to the towns.
🎧 Hedgehogs are also finding it easier to live in urban areas -
🎧 this time because their predators are not finding it quite so attractive to leave their rural environment,
🎧 so hedgehogs have a better survival rate in cities.
🎧 We had lots of sightings,
🎧 so all in all, we had no difficulties with our efforts to count their numbers precisely.
🎧 Our final species is the finest of bird singers, the song thrush.
🎧 On the decline in the countryside,
🎧 they are experiencing a resurgence in urban gardens
🎧 because these days gardeners are buying lots of different plants
🎧 which means there's an extensive range of seeds around,
🎧 which is what they feed on.
🎧 Another factor is the provision of nesting places -
🎧 which is actually better in gardens than the countryside.
🎧 Hard to believe it, but it's true.
🎧 Incidentally, we discovered that a massive new survey on song thrushes is about to be launched,
🎧 so you should keep an eye open for that.
🎧 Now, I'd be happy to answer...
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

const listTimes = [];
listTimes.length && listTimes.forEach(item => {
  console.log(convertToSeconds(item));
});

const outputHtml = arrayHtml.join(' ') + '<br/><br/>';
string.trim() !== "" && console.log(outputHtml);