let isFirstScroll = true;
let currentSeconds = 0;
let lastPlayedAudio = null;
let isDisabled = false;
let autoScrollInterval = null;
const API_URL = 'https://node-api-delta-bice.vercel.app/api/vocabulary';
const AUDIO_URL = 'https://dl.dropboxusercontent.com/scl/fi/';
const sectionList = [
  {
    name: 'conversation',
    active: false,
    pages: 1,
  },
  {
    name: 'english-speaking-course',
    active: false,
    pages: 19,
  },
  {
    name: 'english-speaking-course',
    active: false,
    pages: 19,
  },
  {
    name: 'easy-english',
    active: false,
    pages: 2,
  },
  {
    name: 'english-at-work',
    active: true,
    pages: 13,
  },
  {
    name: 'ielts-speaking',
    active: true,
    pages: 6,
  },
  {
    name: 'ielts-listening',
    active: true,
    pages: 69,
  },
  {
    name: 'level2',
    active: true,
    pages: 11,
  },
  {
    name: 'level6',
    active: true,
    pages: 10,
  },
  {
    name: 'toeic-600-words',
    active: false,
    pages: 10,
  },
  {
    name: 'toeic-2000-words',
    active: false,
    pages: 3,
  },
  {
    name: 'oxford-online-english',
    active: false,
    pages: 11,
  },
  {
    name: 'mini-novels',
    active: false,
    pages: 2,
  },
  {
    name: 'english-story',
    active: false,
    pages: 2,
  },
  {
    name: 'english-easier-with-eric',
    active: false,
    pages: 3,
  },
];

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
  sectionList.forEach((item) => {
    if (sectionClass === item.name && item.active) {
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

async function loadAllContents() {
  sectionList.forEach((section) => {
    if (section.active) {
      getSection(section.pages, section.name);
    }
  });

  document.getElementById('ielts-listening').style.display = 'block';
  document.getElementById('ielts-listening-1').style.display = 'block';

  await configAudio();

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

  document.getElementById("overlay").style.display = "none";

  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
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
  source.src = `${AUDIO_URL}${src}`;
  source.type = 'audio/mpeg';
  const startStopBtns = document.querySelectorAll('.audio-start-stop');
  startStopBtns.forEach((startStop) => startStop.textContent = "⏸️");

  audio.appendChild(source);
  audio.load();
  audio.play();
  audio.addEventListener("play", () => {
    startStopBtns.forEach((startStop) => startStop.textContent = "⏸️");
  });
  audio.addEventListener("pause", () => {
    startStopBtns.forEach((startStop) => startStop.textContent = "▶️");
  });
  audio.onended = function () {
    stopScroll();
    setTimeout(() => {
      const div = button.nextElementSibling.parentElement;
      const h2 = div.previousElementSibling;
      h2.scrollIntoView({ behavior: "smooth", block: "start" });
      audio.play();
      startScroll();
    }, 1500);
  };
  lastPlayedAudio = audio;

  button.style.display = 'none';
  const arrayChange = [speed, repeat];
  change && arrayChange.push(change);
  next && arrayChange.push(next);
  arrayChange.forEach((item) => {
    item.style.display = 'block';
  });
  startScroll();
}

function changeSpeed(select) {
  const audio = select.closest('.audio-wrapper').querySelector('.audio');
  audio.playbackRate = select.value;
}

function changeAudio(select, isLv2 = false) {
  currentSeconds = select.value;
  const dataEnglish = select.getAttribute("data-english");
  const targetElement = document.getElementById(`${dataEnglish}-${select.value}`);

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offset = isLv2 ? 30 : isFirstScroll ? 200 : 100;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
    isFirstScroll = false;
  }

  if (select.closest('.audio-wrapper')) {
    const audio = select.closest('.audio-wrapper').querySelector('.audio');
    const startTime = parseInt(select.value, 10);
    audio.currentTime = startTime;
    audio.play();
  }
}

function repeat(btn) {
  const audio = btn.parentElement.previousElementSibling.previousElementSibling;
  audio.currentTime = Math.max(0, audio.currentTime - 5);
}

function audioNext(btn) {
  const audio = btn.parentElement.previousElementSibling.previousElementSibling;
  audio.currentTime = Math.max(0, audio.currentTime + 5);
}

async function configAudio() {
  document.addEventListener('keydown', function (event) {
    const startStopBtns = document.querySelectorAll('audio-start-stop');
    if (event.code === 'Space') {
      event.preventDefault();
      const audioPlayers = document.querySelectorAll('.audio');
      let currentlyPlaying = null;

      audioPlayers.forEach(function (audioPlayer) {
        if (!audioPlayer.paused) {
          audioPlayer.pause();
          currentlyPlaying = audioPlayer;
          startStopBtns.forEach((startStop) => startStop.textContent = "▶️");
        }
      });

      if (currentlyPlaying === null) {
        if (lastPlayedAudio && lastPlayedAudio.currentTime > 0 && lastPlayedAudio.currentTime < lastPlayedAudio.duration) {
          lastPlayedAudio.play();
          startStopBtns.forEach((startStop) => startStop.textContent = "⏸️");
        } else {
          audioPlayers.forEach(function (audioPlayer) {
            if (audioPlayer.currentTime > 0 && audioPlayer.currentTime < audioPlayer.duration) {
              audioPlayer.play();
              lastPlayedAudio = audioPlayer;
              startStopBtns.forEach((startStop) => startStop.textContent = "⏸️");
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

  setTimeout(() => {
    const scrollDivs = document.querySelectorAll('.scroll-div');
    const showThreshold = 300;
    const hideThreshold = 300;
    const btnSpGroup = document.querySelectorAll('.btn-sp-group');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      scrollDivs.forEach(div => {
        if (scrollPosition > 100) {
          div.classList.add('fixed-div');
        } else if (scrollPosition < 50) {
          div.classList.remove('fixed-div');
        }
      });

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > showThreshold) {
        btnSpGroup.forEach((group) => group.classList.add('show'));
      } else if (scrollTop < hideThreshold) {
        btnSpGroup.forEach((group) => group.classList.remove('show'));
      }
    });
  }, 1500);
}

function startAudio(element, endTime = null) {
  const h2Id = element.closest('h2').id;
  const seconds = parseInt(h2Id.split('-').pop(), 10);
  currentSeconds = seconds;
  const audio = element.closest('div').querySelector('.audio');
  const startTime = parseInt(seconds, 10);
  audio.currentTime = startTime;
  audio.play();

  audio.ontimeupdate = null;

  if (endTime) {
    audio.ontimeupdate = function() {
      if (audio.currentTime >= endTime) {
        audio.currentTime = startTime;
        audio.play();
      }
    };
  }
}

function spNext() {
  stopScroll();
  scrollDown();
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
    if (!audio.paused) {
      audio.currentTime = Math.max(0, audio.currentTime + 5);
    }
  });
  startScroll();
}

function spPrev() {
  stopScroll();
  scrollUp();
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
    if (!audio.paused) {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    }
  });
  startScroll();
}

function spStartStop(btn) {
  if (lastPlayedAudio) {
    const audioPlayers = document.querySelectorAll('.audio');
    let currentlyPlaying = null;

    audioPlayers.forEach(function (audioPlayer) {
      if (!audioPlayer.paused) {
        audioPlayer.pause();
        currentlyPlaying = audioPlayer;
        btn.textContent = "▶️";
        stopScroll();
      }
    });

    if (currentlyPlaying === null) {
      if (lastPlayedAudio && lastPlayedAudio.currentTime > 0 && lastPlayedAudio.currentTime < lastPlayedAudio.duration) {
        lastPlayedAudio.play();
        btn.textContent = "⏸️";
      } else {
        audioPlayers.forEach(function (audioPlayer) {
          if (audioPlayer.currentTime > 0 && audioPlayer.currentTime < audioPlayer.duration) {
            audioPlayer.play();
            lastPlayedAudio = audioPlayer;
            btn.textContent = "⏸️";
            return;
          }
        });
      }
      startScroll();
    }

    if (currentlyPlaying) {
      lastPlayedAudio = currentlyPlaying;
    }
  }
}

function smoothScrollBy(distance = 125, duration = 900) {
  const start = window.scrollY;
  const end = start + distance;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = progress * (2 - progress);

    window.scrollTo(0, start + (end - start) * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function startScroll(number = 8000) {
  if (autoScrollInterval) return;

  autoScrollInterval = setInterval(() => {
    smoothScrollBy();
  }, number);
}

function stopScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = null;
}

function scrollUp(distance = -100, duration = 900) {
  smoothScrollBy(distance, duration);
}

function scrollDown(distance = 100, duration = 900) {
  smoothScrollBy(distance, duration);
}
