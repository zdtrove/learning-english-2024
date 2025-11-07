let isFirstScroll = true;
let currentSeconds = 0;
let lastPlayedAudio = null;
let isDisabled = false;
const API_URL = 'https://node-api-delta-bice.vercel.app/api/vocabulary';

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
    'new-vocabulary',
    'ielts-speaking',
    'ielts-listening',
    'level2',
    'toeic-600-words',
    'oxford-online-english',
    'mini-novels',
    'english-story',
    'english-easier-with-eric',
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

async function loadAllContents() {
  // getSection(1, 'conversation');
  // getSection(3, 'english-easier-with-eric');
  // getSection(11, 'oxford-online-english');
  // getSection(19, 'english-speaking-course');
  // getSection(2, 'easy-english');
  // getSection(13, 'english-at-work');
  getSection(1, 'new-vocabulary');
  getSection(6, 'ielts-speaking');
  getSection(68, 'ielts-listening');
  getSection(11, 'level2');
  // getSection(2, 'mini-novels');
  // getSection(2, 'english-story');
  // getSection(1, 'english-podcast');
  // getSection(10, 'toeic-600-words');

  document.getElementById('ielts-speaking').style.display = 'block';
  document.getElementById('ielts-speaking-1').style.display = 'block';

  await initVocabulary();
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
      const num = event.code === 'ArrowLeft' ? -5 : 3;

      audios.forEach(audio => {
        if (!audio.paused) {
          audio.currentTime = Math.max(0, audio.currentTime + num);
        }
      });
    }
  });

  document.getElementById("overlay").style.display = "none";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const vocabulary = await response.json();

    const vocabularyData = vocabulary.data;

    if (vocabularyData) {
      const vocabularyContainer = document.getElementById('vocabulary-list');

      vocabularyData.forEach((word, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<small style="font-style: italic; font-size: 12px;">${index + 1}.</small> <b style="color: burlywood;">${word.value}</b>`;
        vocabularyContainer.appendChild(listItem);
      });
    }

  } catch (error) {
    console.error('Có lỗi khi lấy dữ liệu:', error);
  }

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
  source.src = `https://dl.dropboxusercontent.com/scl/fi/${src}`;
  source.type = 'audio/mpeg';
  const startStopBtns = document.querySelectorAll('.audio-start-stop');
  const audioTimeBtn = document.querySelector('#audio-time');
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
    setTimeout(() => {
      audio.play();
    }, 1500);
  };
  audio.ontimeupdate = function () {
    audioTimeBtn.textContent = audio.currentTime.toFixed(2);
  };
  lastPlayedAudio = audio;

  button.style.display = 'none';
  const arrayChange = [speed, repeat];
  change && arrayChange.push(change);
  next && arrayChange.push(next);
  arrayChange.forEach((item) => {
    item.style.display = 'block';
  });
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

async function initVocabulary() {
  let storedArray = []
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const vocabulary = await response.json();

    storedArray = vocabulary.data;
  } catch (error) {
    console.error('Có lỗi khi lấy dữ liệu:', error);
  }

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

  const spans = document.getElementsByTagName("span");
  const spanArray = Array.from(spans);
  spanArray.forEach((span) => {
    storedArray.forEach((item) => {
      if (span.textContent.toLowerCase() === item.value.toLowerCase()) {
        span.classList.add('learn');
        span.id = item._id;
      }
    });
    span.addEventListener("click", async function () {
      if (!span.id) {
        span.classList.add('loading');
        const id = await addVocabulary(span.textContent.replace(/\n/g, ''));
        span.id = id;
        span.classList.remove('loading');
        span.classList.add('learn');
        spanArray.forEach((spanAdd) => {
          if (spanAdd.textContent.toLowerCase() === span.textContent.toLocaleLowerCase()) {
            spanAdd.classList.add('learn');
            spanAdd.id = id;
          }
        });
      } else {
        span.classList.add('loading');
        await deleteVocabulary(span.id);
        span.classList.remove('loading');
        span.removeAttribute('id');
        span.classList.remove('learn');
        spanArray.forEach((spanRemove) => {
          if (spanRemove.textContent.toLowerCase() === span.textContent.toLocaleLowerCase()) {
            spanRemove.classList.remove('learn');
            spanRemove.removeAttribute('id');
          }
        });
      }
    });
  });

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
}

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

function startAudio(element, endTime = null) {
  const audioTimeBtn = document.querySelector('#audio-time');
  const h2Id = element.closest('h2').id;
  const seconds = parseInt(h2Id.split('-').pop(), 10);
  currentSeconds = seconds;
  const audio = element.closest('div').querySelector('.audio');
  const startTime = parseInt(seconds, 10);
  audio.currentTime = startTime;
  audio.play();

  audio.ontimeupdate = null;

  audio.ontimeupdate = function () {
    audioTimeBtn.textContent = audio.currentTime.toFixed(2);
  };

  if (endTime) {
    audio.ontimeupdate = function() {
      audioTimeBtn.textContent = audio.currentTime.toFixed(2);
      if (audio.currentTime >= endTime) {
        audio.currentTime = startTime;
        audio.play();
      }
    };
  }
}

function spNext() {
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
    if (!audio.paused) {
      audio.currentTime = Math.max(0, audio.currentTime + 5);
    }
  });
}

function spPrev() {
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
    if (!audio.paused) {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    }
  });
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
    }

    if (currentlyPlaying) {
      lastPlayedAudio = currentlyPlaying;
    }
  }
}

async function deleteVocabulary(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Xóa từ vựng thành công:', result.message);
    } else {
      console.error('Xóa từ vựng thất bại:', result.message || result.error);
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xoá từ vựng:', error);
  }
}

async function addVocabulary(vocabulary) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: vocabulary }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Thêm từ vựng thành công:', result);
      return result.insertedId;
    } else {
      console.error('Thêm từ vựng thất bại:', result.message || result.error);
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm từ vựng:', error);
  }
}