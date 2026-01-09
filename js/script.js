pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let isFirstScroll = true;
let currentSeconds = 0;
let lastPlayedAudio = null;
let isDisabled = false;
let autoScrollInterval = null;
let wakeLock = null;
let currentIndex = 0;
let currentPlaylist = [];
let isInitPDF = false;
const audioAll = document.getElementById('audioAll');
const AUDIO_URL = 'https://dl.dropboxusercontent.com/scl/fi/';
const PDF_URL = 'https://raw.githubusercontent.com/zdtrove/toeic-test-pdf/main/pdf/';
const sectionList = [
  { name: 'conversation', active: false, pages: 1 },
  { name: 'english-speaking-course', active: false, pages: 19 },
  { name: 'easy-english', active: false, pages: 2 },
  { name: 'english-at-work', active: false, pages: 13 },
  { name: 'ielts-speaking', active: false, pages: 7 },
  { name: 'ielts-listening', active: true, pages: 12 },
  { name: 'level2', active: false, pages: 11 },
  { name: 'level6', active: false, pages: 10 },
  { name: 'toeic-600-words', active: false, pages: 10 },
  { name: 'toeic-2000-words', active: false, pages: 3 },
  { name: 'oxford-online-english', active: false, pages: 11 },
  { name: 'mini-novels', active: false, pages: 11 },
  { name: 'english-story', active: false, pages: 2 },
  { name: 'english-easier-with-eric', active: false, pages: 3 },
  { name: 'english-graded-4', active: false, pages: 10 },
  { name: 'lep-podcast', active: false, pages: 1 },
  { name: 'toeic-listening', active: false, pages: 3 },
  { name: 'toeic-test', active: true, pages: 10 },
];

async function keepScreenAwake() {
  if (!('wakeLock' in navigator)) return;

  try {
    wakeLock = await navigator.wakeLock.request('screen');
  } catch (err) {
    console.warn('WakeLock not supported:', err);
  }
}

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

  if (lessonName === 'toeic-test' && !isInitPDF) {
    initPDF();
  }
}

function activeFirstItemSection(sectionClass) {
  sectionList.forEach((item) => {
    if (sectionClass === item.name && item.active) {
      document.getElementById(`${sectionClass}-1`).style.display = 'block';
    }
  });
}

async function loadContent(filename, elementId) {
  const response = await fetch(filename);
  const data = await response.text();
  document.getElementById(elementId).innerHTML = data;
}

async function getSection(num, id) {
  const promises = [];

  for (let i = 1; i <= num; i++) {
    const sectionId = `${id}-${i}`;
    const sectionFile = `html/${id}/${i}.html`;

    const sectionDiv = document.createElement('div');
    sectionDiv.id = sectionId;
    sectionDiv.className = id;
    document.getElementById(id).appendChild(sectionDiv);

    promises.push(loadContent(sectionFile, sectionId));
  }

  await Promise.all(promises);
}

async function loadAllContents() {
  const tasks = [];

  sectionList.forEach(section => {
    if (section.active) {
      tasks.push(getSection(section.pages, section.name));
    }
  });

  await Promise.all(tasks);

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

function loadAudio(src, button, isScroll = true) {
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
  audio.play().catch(err => {
    console.warn('Audio play blocked:', err);
  });
  audio.addEventListener("play", () => {
    keepScreenAwake();
    startStopBtns.forEach((startStop) => startStop.textContent = "⏸️");
  });
  audio.addEventListener("pause", () => {
    startStopBtns.forEach((startStop) => startStop.textContent = "▶️");
  });
  audio.onended = function () {
    isScroll && stopScroll();
    setTimeout(() => {
      const div = button.nextElementSibling.parentElement;
      const h2 = div.previousElementSibling;

      h2.scrollIntoView({ behavior: "smooth", block: "start" });
      audio.play().catch(err => {
        console.warn('Audio play blocked:', err);
      });
      
      setTimeout(() => {
        isScroll && startScroll();
      }, 9000);
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

  setTimeout(() => {
    isScroll && startScroll();
  }, 9000);
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
    audio.play().catch(err => {
      console.warn('Audio play blocked:', err);
    });
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
          lastPlayedAudio.play().catch(err => {
            console.warn('Audio play blocked:', err);
          });
          startStopBtns.forEach((startStop) => startStop.textContent = "⏸️");
        } else {
          audioPlayers.forEach(function (audioPlayer) {
            if (audioPlayer.currentTime > 0 && audioPlayer.currentTime < audioPlayer.duration) {
              audioPlayer.play().catch(err => {
                console.warn('Audio play blocked:', err);
              });
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
  audio.play().catch(err => {
    console.warn('Audio play blocked:', err);
  });

  audio.ontimeupdate = null;

  if (endTime) {
    audio.ontimeupdate = function() {
      if (audio.currentTime >= endTime) {
        audio.currentTime = startTime;
        audio.play().catch(err => {
          console.warn('Audio play blocked:', err);
        });
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
        lastPlayedAudio.play().catch(err => {
          console.warn('Audio play blocked:', err);
        });
        btn.textContent = "⏸️";
      } else {
        audioPlayers.forEach(function (audioPlayer) {
          if (audioPlayer.currentTime > 0 && audioPlayer.currentTime < audioPlayer.duration) {
            audioPlayer.play().catch(err => {
              console.warn('Audio play blocked:', err);
            });
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

function smoothScrollBy(distance = 135, duration = 900) {
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

function startScroll(number = 11000) {
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

function playAll(mp3Map, range, speed = 0.85) {
  if (!mp3Map || !Array.isArray(range) || range.length !== 2) return;

  const [startStr, endStr] = range;

  const startNum = Number(startStr);
  const endNum = Number(endStr);
  const padLength = Math.max(startStr.length, endStr.length);

  currentPlaylist = [];

  for (let i = startNum; i <= endNum; i++) {
    const key = String(i).padStart(padLength, '0');

    if (mp3Map[key]) {
      currentPlaylist.push(mp3Map[key]);
    }
  }

  if (!currentPlaylist.length) return;

  currentIndex = 0;
  playCurrent(speed);
}

function playCurrent(speed) {
  audioAll.src = `${AUDIO_URL}${currentPlaylist[currentIndex]}`;
  audioAll.play().catch(err => {
    console.warn('Audio play blocked:', err);
  });
  audioAll.playbackRate = speed;
}

audioAll.addEventListener('ended', () => {
  if (!currentPlaylist.length) return;

  currentIndex++;

  if (currentIndex >= currentPlaylist.length) {
    currentIndex = 0;
  }

  playCurrent();
});

async function fitToWidth(pdfDoc, container) {
  const page = await pdfDoc.getPage(1);
  const rect = container.getBoundingClientRect();
  const viewport = page.getViewport({ scale: 1 });

  return rect.width / viewport.width;
}

function renderAllPages(pdfDoc, container, viewer, scale) {
  const prevScrollTop = container.scrollTop;
  const prevScrollLeft = container.scrollLeft;

  viewer.innerHTML = '';

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    pdfDoc.getPage(i).then(page => {
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.display = 'block';
      canvas.style.margin = '16px auto';
      canvas.style.background = '#fff';

      viewer.appendChild(canvas);

      page.render({
        canvasContext: ctx,
        viewport,
      });
    });
  }

  setTimeout(() => {
    container.scrollTop = prevScrollTop;
    container.scrollLeft = prevScrollLeft;
  }, 0);
}

function setupZoomControls({
  container,
  doc,
  viewer,
  scaleRef,
  minScale = 0.75,
  step = 0.15,
}) {
  container.querySelector('.zoom-in')?.addEventListener('click', () => {
    scaleRef.value += step;
    renderAllPages(doc, container, viewer, scaleRef.value);
  });

  container.querySelector('.zoom-out')?.addEventListener('click', () => {
    scaleRef.value = Math.max(scaleRef.value - step, minScale);
    renderAllPages(doc, container, viewer, scaleRef.value);
  });

  container.querySelector('.zoom-reset')?.addEventListener('click', () => {
    scaleRef.value = minScale;
    renderAllPages(doc, container, viewer, scaleRef.value);
  });
}

function initPDF() {
  isInitPDF = true;

  document.querySelectorAll('.pdf-block').forEach(async (block) => {
    const baseId = block.dataset.pdf;

    const toggleBtns = block.querySelectorAll('.toggle-pdf');

    const pdfContainer = block.querySelector('.pdf');
    const transcriptContainer = block.querySelector('.pdf-transcript');

    const pdfViewer = pdfContainer.querySelector('.pdf-viewer');
    const transcriptViewer = transcriptContainer.querySelector('.pdf-viewer');

    let pdfDoc = null;
    let transcriptDoc = null;

    let pdfScale = 0.75;
    let transcriptScale = 0.75;

    let isPdfRendered = false;
    let isTranscriptRendered = false;

    const pdfUrl = `${PDF_URL}test-${baseId}.pdf`;
    const transcriptUrl = `${PDF_URL}transcript-test-${baseId}.pdf`;

    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    transcriptDoc = await pdfjsLib.getDocument(transcriptUrl).promise;

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const type = btn.dataset.type;

        if (type === 'pdf') {
          transcriptContainer.style.display = 'none';

          const isHidden = pdfContainer.style.display === 'none';
          pdfContainer.style.display = isHidden ? 'block' : 'none';

          if (isHidden && !isPdfRendered) {
            requestAnimationFrame(async () => {
              pdfScale = await fitToWidth(pdfDoc, pdfContainer);
              renderAllPages(pdfDoc, pdfContainer, pdfViewer, pdfScale);
              isPdfRendered = true;
            });
          }
        }

        if (type === 'transcript') {
          pdfContainer.style.display = 'none';

          const isHidden = transcriptContainer.style.display === 'none';
          transcriptContainer.style.display = isHidden ? 'block' : 'none';

          if (isHidden && !isTranscriptRendered) {
            requestAnimationFrame(async () => {
              transcriptScale = await fitToWidth(transcriptDoc, transcriptContainer);
              renderAllPages(
                transcriptDoc,
                transcriptContainer,
                transcriptViewer,
                transcriptScale
              );
              isTranscriptRendered = true;
            });
          }
        }
      });
    });

    const pdfScaleRef = { value: 0.75 };
    const transcriptScaleRef = { value: 0.75 };

    setupZoomControls({
      container: pdfContainer,
      doc: pdfDoc,
      viewer: pdfViewer,
      scaleRef: pdfScaleRef,
    });

    setupZoomControls({
      container: transcriptContainer,
      doc: transcriptDoc,
      viewer: transcriptViewer,
      scaleRef: transcriptScaleRef,
    });
  });
}

