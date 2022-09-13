const check = document.querySelectorAll('#check');
const line = document.querySelectorAll('#line-through');

check.forEach((c, i) => {
    c.addEventListener('change', () => {
        line[i].classList.toggle('text-decoration-line-through');
    });
});