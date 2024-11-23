let isFirstScroll = true;
let currentSeconds = 0;

function changeTab(evt, lessonName) {
  let i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("tab-content");

  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(lessonName).style.display = "block";
  evt.currentTarget.className += " active";

  activeFirstItemSection(lessonName);
}

function activeFirstItemSection(sectionClass) {
  [
    'english-speaking-course',
    'easy-english',
    'english-at-work',
    'ielts-speaking',
    'ielts-listening',
    'level2',
    'toeic-600-words'
  ].forEach((item) => {
    if (sectionClass === item) {
      document.getElementById(`${sectionClass}-1`).style.display = 'block';
    }
  });
}

function loadContent(filename, elementId) {
  fetch(filename)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    });
}

function getSection(num, id) {
  for (let i = 1; i <= num; i++) {
    let sectionId = `${id}-${i}`;
    let sectionFile = `html/${id}/${i}.html`;

    let sectionDiv = document.createElement('div');
    sectionDiv.id = sectionId;
    sectionDiv.className = id;
    document.getElementById(id).appendChild(sectionDiv);

    loadContent(sectionFile, sectionId);
  }
}

function loadAllContents() {
  getSection(21, 'conversation');
  getSection(19, 'english-speaking-course');
  getSection(2, 'easy-english');
  getSection(13, 'english-at-work');
  getSection(7, 'ielts-speaking');
  getSection(1, 'ielts-listening');
  getSection(11, 'level2');
  getSection(10, 'toeic-600-words');

  document.getElementById('conversation').style.display = 'block';
  document.getElementById('conversation-1').style.display = 'block';

  setTimeout(() => {
    initVocabulary();
    const selects = document.querySelectorAll(".audio-change");
    selects.forEach(select => {
      const secondOption = select.options[1];
      if (secondOption) {
        select.value = secondOption.value;
      }
    });
    document.addEventListener('keydown', function (event) {
      if (['ArrowLeft', 'ArrowRight'].includes(event.code)) {
        const audios = document.querySelectorAll('audio');
        const num = event.code === 'ArrowLeft' ? -5 : 5;
      
        audios.forEach(audio => {
          if (!audio.paused) {
            audio.currentTime = Math.max(0, audio.currentTime + num);
          }
        });
      }
    });
  }, 1000);
}

function changeConversation(object, className) {
  document.querySelectorAll(className).forEach((value) => {
    document.getElementById(value.id).style.display = object.value === value.id ? 'block' : 'none';
  });
}

function loadAudio(src, button) {
  const audio = button.previousElementSibling;
  const div = button.nextElementSibling;
  const speed = div.querySelector('select.audio-speed');
  const repeat = div.querySelector('button.audio-repeat');
  const next = div.querySelector('button.audio-next');
  const source = document.createElement('source');
  const change = div.querySelector('select.audio-change');
  source.src = `https://dl.dropboxusercontent.com/scl/fi/${src}`;
  source.type = 'audio/mpeg';

  audio.appendChild(source);
  audio.load();
  audio.play();
  audio.onended = function () {
    setTimeout(() => {
      audio.play();
    }, 1500);
  };

  button.style.display = 'none';
  const arrayChange = [speed, repeat];
  change && arrayChange.push(change);
  next && arrayChange.push(next);
  arrayChange.forEach((item) => {
    item.style.display = 'block';
  });
}

function changeSpeed(select) {
  const audio = select.parentElement.previousElementSibling.previousElementSibling;
  audio.playbackRate = select.value;
}

function changeAudio(select) {
  currentSeconds = select.value;
  const dataEnglish = select.getAttribute("data-english");
  const targetElement = document.getElementById(`${dataEnglish}-${select.value}`);

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offset = isFirstScroll ? 200 : 100;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
    isFirstScroll = false;
  }

  const audio = select.parentElement.previousElementSibling.previousElementSibling;
  const startTime = parseInt(select.value, 10);
  audio.currentTime = startTime;
  audio.play();
}

function repeat(btn) {
  const audio = btn.parentElement.previousElementSibling.previousElementSibling;
  audio.currentTime = Math.max(0, audio.currentTime - 5);
}

function audioNext(btn) {
  const audio = btn.parentElement.previousElementSibling.previousElementSibling;
  audio.currentTime = Math.max(0, audio.currentTime + 5);
}

function initVocabulary() {
  let storedArray = JSON.parse(localStorage.getItem('vocabulary'));
  if (!storedArray) {
    localStorage.setItem('vocabulary', JSON.stringify([]));
    storedArray = [];
  }

  let lastPlayedAudio = null;
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      event.preventDefault();
      const audioPlayers = document.querySelectorAll('.audio');
      let currentlyPlaying = null;

      audioPlayers.forEach(function (audioPlayer) {
        if (!audioPlayer.paused) {
          audioPlayer.pause();
          currentlyPlaying = audioPlayer;
        }
      });

      if (currentlyPlaying === null) {
        if (lastPlayedAudio && lastPlayedAudio.currentTime > 0 && lastPlayedAudio.currentTime < lastPlayedAudio.duration) {
          lastPlayedAudio.play();
        } else {
          audioPlayers.forEach(function (audioPlayer) {
            if (audioPlayer.currentTime > 0 && audioPlayer.currentTime < audioPlayer.duration) {
              audioPlayer.play();
              lastPlayedAudio = audioPlayer;
              return;
            }
          });
        }
      }

      if (currentlyPlaying) {
        lastPlayedAudio = currentlyPlaying;
      }
    }
  });

  const spans = document.getElementsByTagName("span");
  const spanArray = Array.from(spans);
  spanArray.forEach((span) => {
    storedArray.forEach((item) => span.textContent.toLowerCase() === item.toLocaleLowerCase() && span.classList.add('learn'));
    span.addEventListener("click", function () {
      let storedArray = JSON.parse(localStorage.getItem('vocabulary'));
      if (!storedArray.includes(span.textContent)) {
        spanArray.forEach((span1) => span1.textContent.toLowerCase() === span.textContent.toLocaleLowerCase() && span1.classList.add('learn'));
        storedArray.push(span.textContent.replace(/\n/g, ''));
        localStorage.setItem('vocabulary', JSON.stringify(storedArray));
      } else {
        spanArray.forEach((span2) => span2.textContent.toLowerCase() === span.textContent.toLocaleLowerCase() && span2.classList.remove('learn'));
        storedArray = storedArray.filter(item => item !== span.textContent)
        localStorage.setItem('vocabulary', JSON.stringify(storedArray));
      }
    });
  });

  const scrollDivs = document.querySelectorAll('.scroll-div');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    scrollDivs.forEach(div => {
      if (scrollPosition > 100) {
        div.classList.add('fixed-div');
      } else if (scrollPosition < 50) {
        div.classList.remove('fixed-div');
      }
    });
  });
}

let isDisabled = false;

function disabledClick() {
  const spans = document.getElementsByTagName("span");
  const spanArray = Array.from(spans);
  const btns = document.querySelectorAll('.btn-disabled');

  spanArray.forEach((span) => {
    isDisabled ? span.classList.remove('disabled') : span.classList.add('disabled');
  });

  btns.forEach((btn) => {
    btn.innerHTML = isDisabled ? 'Disabled click' : 'Enabled click';
  });

  isDisabled = !isDisabled;
}

function formatTimes(times) {
  return String(times).padStart(2, '0');
}

function downloadLocalStorage() {
  const data = localStorage.getItem("vocabulary");

  if (data) {
    const now = new Date();
    const year = now.getFullYear();
    const month = formatTimes(now.getMonth() + 1);
    const date = formatTimes(now.getDate());
    const hours = formatTimes(now.getHours());
    const minutes = formatTimes(now.getMinutes());
    const seconds = formatTimes(now.getSeconds());
    const timestamp = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
    const filename = `vocabulary-${timestamp}.json`;
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
    console.log("Download successful!");
  } else {
    console.log("No vocabulary data found in localStorage.");
  }
}

function updateLocalStorage(event) {
  const file = event.target.files[0];

  if (file && file.type === "application/json") {
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        localStorage.setItem("vocabulary", JSON.stringify(data));
        console.log("Local storage updated successfully!");
        location.reload();
      } catch (error) {
        console.error("Invalid JSON file:", error);
      }
    };
    reader.readAsText(file);
  } else {
    console.log("Please upload a valid JSON file.");
  }
}

function triggerFileUpload() {
  document.getElementById("fileInput").click();
}

function startAudio(element, seconds) {
  currentSeconds = seconds;
  const audio = element.closest('div').querySelector('.audio');
  const startTime = parseInt(seconds, 10);
  audio.currentTime = startTime;
  audio.play();
}