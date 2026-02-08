/**
 * Learning English Application
 * Refactored with modular structure
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
  urls: {
    pdfWorker: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
    audio: 'https://dl.dropboxusercontent.com/scl/fi/',
    pdf: 'https://raw.githubusercontent.com/zdtrove/toeic-test-pdf/main/pdf/',
  },
  scroll: {
    distance: 135,
    duration: 900,
    interval: 11000,
    showThreshold: 300,
    hideThreshold: 300,
    topBtnThreshold: 100,
  },
  audio: {
    seekTime: 5,
    playDelay: 1500,
    scrollDelay: 9000,
  },
  pdf: {
    minScale: 0.75,
    zoomStep: 0.15,
  },
};

const SECTIONS = [
  { name: 'conversation', active: false, pages: 1 },
  { name: 'english-speaking-course', active: false, pages: 19 },
  { name: 'easy-english', active: false, pages: 2 },
  { name: 'english-at-work', active: false, pages: 13 },
  { name: 'ielts-speaking', active: true, pages: 7 },
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

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

const AppState = {
  isFirstScroll: true,
  currentSeconds: 0,
  lastPlayedAudio: null,
  autoScrollInterval: null,
  wakeLock: null,
  currentIndex: 0,
  currentPlaylist: [],
  isInitPDF: false,
};

// =============================================================================
// DOM ELEMENTS
// =============================================================================

const Elements = {
  get audioAll() {
    return document.getElementById('audioAll');
  },
  get overlay() {
    return document.getElementById('overlay');
  },
  get scrollToTopBtn() {
    return document.getElementById('scrollToTopBtn');
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const Utils = {
  /**
   * Safe audio play with error handling
   */
  playAudio(audio) {
    return audio.play().catch(err => {
      console.warn('Audio play blocked:', err);
    });
  },

  /**
   * Get element by ID with null safety
   */
  getElement(id) {
    return document.getElementById(id);
  },

  /**
   * Query all elements by selector
   */
  queryAll(selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * Hide element
   */
  hide(element) {
    if (element) element.style.display = 'none';
  },

  /**
   * Show element as block
   */
  show(element) {
    if (element) element.style.display = 'block';
  },

  /**
   * Toggle element visibility
   */
  toggle(element) {
    if (!element) return false;
    const isHidden = element.style.display === 'none';
    element.style.display = isHidden ? 'block' : 'none';
    return isHidden;
  },

  /**
   * Create HTML element with attributes
   */
  createElement(tag, attrs = {}) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else {
        el[key] = value;
      }
    });
    return el;
  },
};

// =============================================================================
// WAKE LOCK MODULE
// =============================================================================

const WakeLockManager = {
  async request() {
    if (!('wakeLock' in navigator)) return;

    try {
      AppState.wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      console.warn('WakeLock not supported:', err);
    }
  },
};

// =============================================================================
// SCROLL MODULE
// =============================================================================

const ScrollManager = {
  smoothScrollBy(distance = CONFIG.scroll.distance, duration = CONFIG.scroll.duration) {
    const start = window.scrollY;
    const end = start + distance;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);

      window.scrollTo(0, start + (end - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  },

  start(interval = CONFIG.scroll.interval) {
    if (AppState.autoScrollInterval) return;

    AppState.autoScrollInterval = setInterval(() => {
      this.smoothScrollBy();
    }, interval);
  },

  stop() {
    clearInterval(AppState.autoScrollInterval);
    AppState.autoScrollInterval = null;
  },

  up(distance = -100, duration = CONFIG.scroll.duration) {
    this.smoothScrollBy(distance, duration);
  },

  down(distance = 100, duration = CONFIG.scroll.duration) {
    this.smoothScrollBy(distance, duration);
  },

  toElement(element, offset = 100) {
    if (!element) return;
    const position = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: position - offset,
      behavior: 'smooth',
    });
  },

  toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },

  setupScrollToTopButton() {
    const btn = Elements.scrollToTopBtn;
    if (!btn) return;

    window.onscroll = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      btn.style.display = scrollTop > CONFIG.scroll.topBtnThreshold ? 'block' : 'none';
    };

    btn.addEventListener('click', () => this.toTop());
  },

  setupFixedDivs() {
    const scrollDivs = Utils.queryAll('.scroll-div');
    const btnSpGroup = Utils.queryAll('.btn-sp-group');
    const { showThreshold, hideThreshold } = CONFIG.scroll;

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      scrollDivs.forEach(div => {
        if (scrollPosition > 100) {
          div.classList.add('fixed-div');
        } else if (scrollPosition < 50) {
          div.classList.remove('fixed-div');
        }
      });

      btnSpGroup.forEach(group => {
        if (scrollTop > showThreshold) {
          group.classList.add('show');
        } else if (scrollTop < hideThreshold) {
          group.classList.remove('show');
        }
      });
    });
  },
};

// =============================================================================
// AUDIO MODULE
// =============================================================================

const AudioManager = {
  updateAllStartStopButtons(text) {
    Utils.queryAll('.audio-start-stop').forEach(btn => {
      btn.textContent = text;
    });
  },

  setPlaying() {
    this.updateAllStartStopButtons('⏸️');
  },

  setPaused() {
    this.updateAllStartStopButtons('▶️');
  },

  getFromWrapper(element) {
    return element.closest('.audio-wrapper')?.querySelector('.audio');
  },

  seekRelative(audio, seconds) {
    audio.currentTime = Math.max(0, audio.currentTime + seconds);
  },

  seekAllPlaying(seconds) {
    Utils.queryAll('audio').forEach(audio => {
      if (!audio.paused) {
        this.seekRelative(audio, seconds);
      }
    });
  },

  pauseAll() {
    let paused = null;
    Utils.queryAll('.audio').forEach(audio => {
      if (!audio.paused) {
        audio.pause();
        paused = audio;
      }
    });
    return paused;
  },

  resumeLastPlayed(btn) {
    const { lastPlayedAudio } = AppState;

    if (lastPlayedAudio?.currentTime > 0 && lastPlayedAudio.currentTime < lastPlayedAudio.duration) {
      Utils.playAudio(lastPlayedAudio);
      if (btn) btn.textContent = '⏸️';
      return true;
    }

    const audios = Utils.queryAll('.audio');
    for (const audio of audios) {
      if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
        Utils.playAudio(audio);
        AppState.lastPlayedAudio = audio;
        if (btn) btn.textContent = '⏸️';
        return true;
      }
    }

    return false;
  },

  setupKeyboardControls() {
    document.addEventListener('keydown', (event) => {
      // Arrow keys for seeking
      if (['ArrowLeft', 'ArrowRight'].includes(event.code)) {
        const seekAmount = event.code === 'ArrowLeft'
          ? -CONFIG.audio.seekTime
          : CONFIG.audio.seekTime;
        this.seekAllPlaying(seekAmount);
      }

      // Space for play/pause
      if (event.code === 'Space') {
        event.preventDefault();
        const paused = this.pauseAll();

        if (paused) {
          this.setPaused();
          AppState.lastPlayedAudio = paused;
        } else {
          this.resumeLastPlayed();
          this.setPlaying();
        }
      }
    });
  },

  load(src, button, isScroll = true) {
    const audio = button.previousElementSibling;
    const div = button.nextElementSibling;

    const controls = {
      speed: div.querySelector('select.audio-speed'),
      repeat: div.querySelector('button.audio-repeat'),
      repeatA: div.querySelector('button.audio-repeat-a'),
      repeatB: div.querySelector('button.audio-repeat-b'),
      repeatClear: div.querySelector('button.audio-repeat-clear'),
      next: div.querySelector('button.audio-next'),
      change: div.querySelector('select.audio-change'),
    };

    // Create and append source
    const source = Utils.createElement('source', {
      src: `${CONFIG.urls.audio}${src}`,
      type: 'audio/mpeg',
    });

    this.setPaused();
    audio.appendChild(source);
    audio.load();
    Utils.playAudio(audio);

    // Event listeners
    audio.addEventListener('play', () => {
      WakeLockManager.request();
      this.setPlaying();
    });

    audio.addEventListener('pause', () => this.setPaused());

    audio.onended = () => {
      if (isScroll) ScrollManager.stop();

      setTimeout(() => {
        const h2 = div.parentElement.previousElementSibling;
        h2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        Utils.playAudio(audio);

        if (isScroll) {
          setTimeout(() => ScrollManager.start(), CONFIG.audio.scrollDelay);
        }
      }, CONFIG.audio.playDelay);
    };

    AppState.lastPlayedAudio = audio;
    Utils.hide(button);

    // Show controls
    const visibleControls = [controls.speed, controls.repeat];
    if (controls.change) visibleControls.push(controls.change);
    if (controls.next) visibleControls.push(controls.next);
    if (controls.repeatA) visibleControls.push(controls.repeatA);
    if (controls.repeatB) visibleControls.push(controls.repeatB);
    if (controls.repeatClear) visibleControls.push(controls.repeatClear);

    visibleControls.forEach(ctrl => Utils.show(ctrl));

    if (isScroll) {
      setTimeout(() => ScrollManager.start(), CONFIG.audio.scrollDelay);
    }
  },

  changeSpeed(select) {
    const audio = this.getFromWrapper(select);
    if (audio) audio.playbackRate = select.value;
  },

  changeTrack(select, isLv2 = false) {
    AppState.currentSeconds = select.value;
    const dataEnglish = select.getAttribute('data-english');
    const targetElement = Utils.getElement(`${dataEnglish}-${select.value}`);

    if (targetElement) {
      const offset = isLv2 ? 30 : AppState.isFirstScroll ? 200 : 100;
      ScrollManager.toElement(targetElement, offset);
      AppState.isFirstScroll = false;
    }

    const audio = this.getFromWrapper(select);
    if (audio) {
      audio.currentTime = parseInt(select.value, 10);
      Utils.playAudio(audio);
    }
  },

  repeat(btn) {
    const audio = btn.parentElement.previousElementSibling.previousElementSibling;
    this.seekRelative(audio, -CONFIG.audio.seekTime);
  },

  next(btn) {
    const audio = btn.parentElement.previousElementSibling.previousElementSibling;
    this.seekRelative(audio, CONFIG.audio.seekTime);
  },

  startFromElement(element, endTime = null) {
    const h2Id = element.closest('h2').id;
    const seconds = parseInt(h2Id.split('-').pop(), 10);
    AppState.currentSeconds = seconds;

    const audio = element.closest('div').querySelector('.audio');
    audio.currentTime = seconds;
    Utils.playAudio(audio);

    audio.ontimeupdate = null;

    if (endTime) {
      audio.ontimeupdate = () => {
        if (audio.currentTime >= endTime) {
          audio.currentTime = seconds;
          Utils.playAudio(audio);
        }
      };
    }
  },
};

// =============================================================================
// PLAYLIST MODULE
// =============================================================================

const PlaylistManager = {
  play(mp3Map, range, speed = 0.85) {
    if (!mp3Map || !Array.isArray(range) || range.length !== 2) return;

    const [startStr, endStr] = range;
    const startNum = Number(startStr);
    const endNum = Number(endStr);
    const padLength = Math.max(startStr.length, endStr.length);

    AppState.currentPlaylist = [];

    for (let i = startNum; i <= endNum; i++) {
      const key = String(i).padStart(padLength, '0');
      if (mp3Map[key]) {
        AppState.currentPlaylist.push(mp3Map[key]);
      }
    }

    if (!AppState.currentPlaylist.length) return;

    AppState.currentIndex = 0;
    this.playCurrent(speed);
  },

  playCurrent(speed) {
    const audioAll = Elements.audioAll;
    audioAll.src = `${CONFIG.urls.audio}${AppState.currentPlaylist[AppState.currentIndex]}`;
    Utils.playAudio(audioAll);
    audioAll.playbackRate = speed;
  },

  setupEndedListener() {
    Elements.audioAll?.addEventListener('ended', () => {
      if (!AppState.currentPlaylist.length) return;

      AppState.currentIndex++;
      if (AppState.currentIndex >= AppState.currentPlaylist.length) {
        AppState.currentIndex = 0;
      }

      this.playCurrent();
    });
  },
};

// =============================================================================
// A-B LOOP MODULE
// =============================================================================

const ABLoopManager = {
  getWrapper(btn) {
    return btn.closest('.audio-wrapper');
  },

  getAudio(btn) {
    return this.getWrapper(btn)?.querySelector('audio');
  },

  resetButtons(wrapper) {
    wrapper.querySelectorAll('.audio-repeat-a, .audio-repeat-b')
      .forEach(btn => btn.classList.remove('ab-active'));
  },

  setPointA(btn) {
    const audio = this.getAudio(btn);
    const wrapper = this.getWrapper(btn);

    wrapper.dataset.pointA = audio.currentTime;
    btn.classList.add('ab-active');

    console.log('Set A:', audio.currentTime.toFixed(2));
  },

  setPointB(btn) {
    const audio = this.getAudio(btn);
    const wrapper = this.getWrapper(btn);

    if (!wrapper.dataset.pointA) {
      alert('Please click A first');
      return;
    }

    wrapper.dataset.pointB = audio.currentTime;
    wrapper.dataset.abLoop = 'true';
    btn.classList.add('ab-active');

    console.log(
      'Loop A-B:',
      Number(wrapper.dataset.pointA).toFixed(2),
      '→',
      Number(wrapper.dataset.pointB).toFixed(2)
    );

    this.startLoop(audio, wrapper);
  },

  clear(btn) {
    const wrapper = this.getWrapper(btn);

    delete wrapper.dataset.pointA;
    delete wrapper.dataset.pointB;
    delete wrapper.dataset.abLoop;

    this.resetButtons(wrapper);
    console.log('Clear A-B loop');
  },

  startLoop(audio, wrapper) {
    if (audio._abHandler) return;

    audio._abHandler = () => {
      if (wrapper.dataset.abLoop !== 'true') return;

      const A = Number(wrapper.dataset.pointA);
      const B = Number(wrapper.dataset.pointB);

      if (audio.currentTime >= B) {
        audio.currentTime = A;
      }
    };

    audio.addEventListener('timeupdate', audio._abHandler);
  },
};

// =============================================================================
// PDF MODULE
// =============================================================================

const PDFManager = {
  async fitToWidth(pdfDoc, container) {
    const page = await pdfDoc.getPage(1);
    const rect = container.getBoundingClientRect();
    const viewport = page.getViewport({ scale: 1 });
    return rect.width / viewport.width;
  },

  renderAllPages(pdfDoc, container, viewer, scale) {
    const prevScrollTop = container.scrollTop;
    const prevScrollLeft = container.scrollLeft;

    viewer.innerHTML = '';

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      pdfDoc.getPage(i).then(page => {
        const viewport = page.getViewport({ scale });
        const canvas = Utils.createElement('canvas');
        const ctx = canvas.getContext('2d');

        Object.assign(canvas, {
          width: viewport.width,
          height: viewport.height,
        });

        Object.assign(canvas.style, {
          display: 'block',
          margin: '16px auto',
          background: '#fff',
        });

        viewer.appendChild(canvas);
        page.render({ canvasContext: ctx, viewport });
      });
    }

    setTimeout(() => {
      container.scrollTop = prevScrollTop;
      container.scrollLeft = prevScrollLeft;
    }, 0);
  },

  setupZoomControls({ container, doc, viewer, scaleRef }) {
    const { minScale, zoomStep } = CONFIG.pdf;

    container.querySelector('.zoom-in')?.addEventListener('click', () => {
      scaleRef.value += zoomStep;
      this.renderAllPages(doc, container, viewer, scaleRef.value);
    });

    container.querySelector('.zoom-out')?.addEventListener('click', () => {
      scaleRef.value = Math.max(scaleRef.value - zoomStep, minScale);
      this.renderAllPages(doc, container, viewer, scaleRef.value);
    });

    container.querySelector('.zoom-reset')?.addEventListener('click', () => {
      scaleRef.value = minScale;
      this.renderAllPages(doc, container, viewer, scaleRef.value);
    });
  },

  async initBlock(block) {
    const baseId = block.dataset.pdf;
    const toggleBtns = block.querySelectorAll('.toggle-pdf');

    const pdfContainer = block.querySelector('.pdf');
    const transcriptContainer = block.querySelector('.pdf-transcript');
    const pdfViewer = pdfContainer.querySelector('.pdf-viewer');
    const transcriptViewer = transcriptContainer.querySelector('.pdf-viewer');

    const pdfUrl = `${CONFIG.urls.pdf}test-${baseId}.pdf`;
    const transcriptUrl = `${CONFIG.urls.pdf}transcript-test-${baseId}.pdf`;

    const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    const transcriptDoc = await pdfjsLib.getDocument(transcriptUrl).promise;

    const state = {
      isPdfRendered: false,
      isTranscriptRendered: false,
    };

    const pdfScaleRef = { value: CONFIG.pdf.minScale };
    const transcriptScaleRef = { value: CONFIG.pdf.minScale };

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const type = btn.dataset.type;

        if (type === 'pdf') {
          Utils.hide(transcriptContainer);
          const isHidden = Utils.toggle(pdfContainer);

          if (isHidden && !state.isPdfRendered) {
            requestAnimationFrame(async () => {
              pdfScaleRef.value = await this.fitToWidth(pdfDoc, pdfContainer);
              this.renderAllPages(pdfDoc, pdfContainer, pdfViewer, pdfScaleRef.value);
              state.isPdfRendered = true;
            });
          }
        }

        if (type === 'transcript') {
          Utils.hide(pdfContainer);
          const isHidden = Utils.toggle(transcriptContainer);

          if (isHidden && !state.isTranscriptRendered) {
            requestAnimationFrame(async () => {
              transcriptScaleRef.value = await this.fitToWidth(transcriptDoc, transcriptContainer);
              this.renderAllPages(transcriptDoc, transcriptContainer, transcriptViewer, transcriptScaleRef.value);
              state.isTranscriptRendered = true;
            });
          }
        }
      });
    });

    this.setupZoomControls({
      container: pdfContainer,
      doc: pdfDoc,
      viewer: pdfViewer,
      scaleRef: pdfScaleRef,
    });

    this.setupZoomControls({
      container: transcriptContainer,
      doc: transcriptDoc,
      viewer: transcriptViewer,
      scaleRef: transcriptScaleRef,
    });
  },

  init() {
    if (AppState.isInitPDF) return;
    AppState.isInitPDF = true;

    Utils.queryAll('.pdf-block').forEach(block => this.initBlock(block));
  },
};

// =============================================================================
// TAB & SECTION MODULE
// =============================================================================

const TabManager = {
  change(evt, lessonName) {
    const tabContents = Utils.queryAll('.tab-content');
    const tabLinks = Utils.queryAll('.tab-link');

    tabContents.forEach(content => Utils.hide(content));
    tabLinks.forEach(link => link.className = link.className.replace(' active', ''));

    Utils.show(Utils.getElement(lessonName));
    evt.currentTarget.className += ' active';

    this.activeFirstItem(lessonName);

    if (lessonName === 'toeic-test' && !AppState.isInitPDF) {
      PDFManager.init();
    }
  },

  activeFirstItem(sectionClass) {
    const section = SECTIONS.find(item => item.name === sectionClass && item.active);
    if (section) {
      Utils.show(Utils.getElement(`${sectionClass}-1`));
    }
  },

  changeConversation(object, className) {
    Utils.queryAll(className).forEach(element => {
      element.style.display = object.value === element.id ? 'block' : 'none';
    });
  },
};

// =============================================================================
// CONTENT LOADER MODULE
// =============================================================================

const ContentLoader = {
  async loadContent(filename, elementId) {
    const response = await fetch(filename);
    const data = await response.text();
    Utils.getElement(elementId).innerHTML = data;
  },

  async loadSection(num, id) {
    const promises = [];

    for (let i = 1; i <= num; i++) {
      const sectionId = `${id}-${i}`;
      const sectionFile = `html/${id}/${i}.html`;

      const sectionDiv = Utils.createElement('div', {
        id: sectionId,
        className: id,
      });

      Utils.getElement(id).appendChild(sectionDiv);
      promises.push(this.loadContent(sectionFile, sectionId));
    }

    await Promise.all(promises);
  },

  async loadAllContents() {
    const tasks = SECTIONS
      .filter(section => section.active)
      .map(section => this.loadSection(section.pages, section.name));

    await Promise.all(tasks);

    // Show default section
    Utils.show(Utils.getElement('ielts-listening'));
    Utils.show(Utils.getElement('ielts-listening-1'));

    // Setup audio
    AudioManager.setupKeyboardControls();
    setTimeout(() => ScrollManager.setupFixedDivs(), 1500);

    // Set default audio selection
    Utils.queryAll('.audio-change').forEach(select => {
      const secondOption = select.options[1];
      if (secondOption) select.value = secondOption.value;
    });

    // Hide overlay
    Utils.hide(Elements.overlay);

    // Setup scroll to top
    ScrollManager.setupScrollToTopButton();
  },
};

// =============================================================================
// SPECIAL CONTROLS MODULE
// =============================================================================

const SpecialControls = {
  next() {
    ScrollManager.stop();
    ScrollManager.down();
    AudioManager.seekAllPlaying(CONFIG.audio.seekTime);
    ScrollManager.start();
  },

  prev() {
    ScrollManager.stop();
    ScrollManager.up();
    AudioManager.seekAllPlaying(-CONFIG.audio.seekTime);
    ScrollManager.start();
  },

  startStop(btn) {
    if (!AppState.lastPlayedAudio) return;

    const paused = AudioManager.pauseAll();

    if (paused) {
      btn.textContent = '▶️';
      ScrollManager.stop();
      AppState.lastPlayedAudio = paused;
    } else {
      if (AudioManager.resumeLastPlayed(btn)) {
        ScrollManager.start();
      }
    }
  },
};

// =============================================================================
// INITIALIZATION
// =============================================================================

pdfjsLib.GlobalWorkerOptions.workerSrc = CONFIG.urls.pdfWorker;
PlaylistManager.setupEndedListener();

// =============================================================================
// GLOBAL API (for HTML onclick handlers)
// =============================================================================

// Tab functions
const changeTab = (evt, name) => TabManager.change(evt, name);
const changeConversation = (obj, cls) => TabManager.changeConversation(obj, cls);

// Audio functions
const loadAudio = (src, btn, scroll) => AudioManager.load(src, btn, scroll);
const changeSpeed = (select) => AudioManager.changeSpeed(select);
const changeAudio = (select, isLv2) => AudioManager.changeTrack(select, isLv2);
const repeat = (btn) => AudioManager.repeat(btn);
const audioNext = (btn) => AudioManager.next(btn);
const startAudio = (el, end) => AudioManager.startFromElement(el, end);

// Scroll functions
const startScroll = (num) => ScrollManager.start(num);
const stopScroll = () => ScrollManager.stop();
const scrollUp = (d, dur) => ScrollManager.up(d, dur);
const scrollDown = (d, dur) => ScrollManager.down(d, dur);
const smoothScrollBy = (d, dur) => ScrollManager.smoothScrollBy(d, dur);

// Special controls
const spNext = () => SpecialControls.next();
const spPrev = () => SpecialControls.prev();
const spStartStop = (btn) => SpecialControls.startStop(btn);

// Playlist
const playAll = (map, range, speed) => PlaylistManager.play(map, range, speed);

// PDF
const initPDF = () => PDFManager.init();

// A-B Loop
const setPointA = (btn) => ABLoopManager.setPointA(btn);
const setPointB = (btn) => ABLoopManager.setPointB(btn);
const clearAB = (btn) => ABLoopManager.clear(btn);

// Content loading
const loadAllContents = () => ContentLoader.loadAllContents();
const activeFirstItemSection = (name) => TabManager.activeFirstItem(name);

// Legacy compatibility
const keepScreenAwake = () => WakeLockManager.request();
const configAudio = () => AudioManager.setupKeyboardControls();
const getSection = (num, id) => ContentLoader.loadSection(num, id);
const loadContent = (file, id) => ContentLoader.loadContent(file, id);
const getAudio = (btn) => ABLoopManager.getAudio(btn);
const getWrapper = (btn) => ABLoopManager.getWrapper(btn);
const resetABButtons = (wrapper) => ABLoopManager.resetButtons(wrapper);
const startABLoop = (audio, wrapper) => ABLoopManager.startLoop(audio, wrapper);
const fitToWidth = (doc, container) => PDFManager.fitToWidth(doc, container);
const renderAllPages = (doc, container, viewer, scale) => PDFManager.renderAllPages(doc, container, viewer, scale);
const setupZoomControls = (opts) => PDFManager.setupZoomControls(opts);
