const check = document.querySelectorAll('#check');
const line = document.querySelectorAll('#line-through');


const readFromStorage = () => {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    return data;
}
const writeToStorage = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
}

check.forEach((c, i) => {
    let data = readFromStorage();
    // data.forEach((d, index) => {
    //     if (d.check === false) data.splice(index, 1);
    //     writeToStorage(data);
    // });
    let item = {index: i, check: true, done: 'text-decoration-line-through'};
    c.addEventListener('change', () => {
        data.forEach((d, index) => {
            if (item.index === d.index) {
                data.splice(index, 1);
                // d.check = false;
                localStorage.setItem('index', i);
                // localStorage.removeItem('index');
                writeToStorage(data);
            }
        });
        
        if (i != localStorage.getItem('index')) {
            data.push(item);
            writeToStorage(data);
            localStorage.setItem('index', i);
        }
        window.location.reload();
    });
});

let data = readFromStorage();
data.forEach(d => {
    if (d.done)
    line[d.index].classList.add(d.done);
    check[d.index].setAttribute('checked', 'checked');
});
