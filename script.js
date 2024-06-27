document.getElementById('lesson-10').style.display = 'block';

function changeLesson(object) {
  document.querySelectorAll('.lesson').forEach((value) => {
    document.getElementById(value.id).style.display = object.value === value.id ? 'block' : 'none';
  });
}
