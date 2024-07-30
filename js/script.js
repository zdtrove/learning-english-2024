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
  ['level2', 'toeic-600-words'].forEach((item) => {
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
  getSection(18, 'conversation');
  getSection(11, 'level2');
  getSection(10, 'toeic-600-words');

  document.getElementById('conversation').style.display = 'block';
  document.getElementById('conversation-1').style.display = 'block';

  setTimeout(() => {
    initVocabulary();
  }, 1000);
}

function changeConversation(object, className) {
  document.querySelectorAll(className).forEach((value) => {
    document.getElementById(value.id).style.display = object.value === value.id ? 'block' : 'none';
  });
}

function loadAudio(src, button) {     
  let count = 0;
  const audio = button.previousElementSibling;
  const div = button.nextElementSibling;
  const speed = div.querySelector('select');
  const repeat = div.querySelector('button');
  const times = div.querySelector('p');
  const source = document.createElement('source');
  source.src = `https://dl.dropboxusercontent.com/scl/fi/${src}`;
  source.type = 'audio/mpeg';

  audio.appendChild(source);
  audio.load();
  audio.play();
  audio.onended = function() {
    count++;
    times.innerHTML = `<b>${count}</b> <i>times</i>`;
    setTimeout(() => {
      audio.play();
    }, 1500);
  };

  button.style.display = 'none';
  [speed, repeat, times].forEach((item) => {
    item.style.display = 'block';
  });
}

function changeSpeed(select) {
  const audio = select.parentElement.previousElementSibling.previousElementSibling;
  audio.playbackRate = select.value;
}

function repeat(btn) {
  const audio = btn.parentElement.previousElementSibling.previousElementSibling;
  audio.currentTime = Math.max(0, audio.currentTime - 3);
}

function initVocabulary() {
  let storedArray = JSON.parse(localStorage.getItem('vocabulary'));
  if (!storedArray) {
    localStorage.setItem('vocabulary', JSON.stringify([]));
    storedArray = [];
  }

  const spans = document.getElementsByTagName("span");
  const spanArray = Array.from(spans);
  spanArray.forEach((span) => {
    storedArray.forEach((item) => span.textContent.toLowerCase() === item && span.classList.add('learn'));
    span.addEventListener("click", function() {
      let storedArray = JSON.parse(localStorage.getItem('vocabulary'));
      if (!storedArray.includes(span.textContent)) {
        spanArray.forEach((span1) => span1.textContent.toLowerCase() === span.textContent && span1.classList.add('learn'));
        storedArray.push(span.textContent.replace(/\n/g, ''));
        localStorage.setItem('vocabulary', JSON.stringify(storedArray));
      } else {
        spanArray.forEach((span2) => span2.textContent.toLowerCase() === span.textContent && span2.classList.remove('learn'));
        storedArray = storedArray.filter(item => item !== span.textContent)
        localStorage.setItem('vocabulary', JSON.stringify(storedArray));
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
