document.getElementById('lesson-10').style.display = 'block';

function changeLesson(object) {
  document.querySelectorAll('.lesson').forEach((value) => {
    if (object.value === value.id) {
      document.getElementById(value.id).style.display = 'block';
    } else {
      document.getElementById(value.id).style.display = 'none';
    }
  });
}