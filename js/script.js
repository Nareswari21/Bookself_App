document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    };

    const searchBar = forms['cari-list'].querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const books = document.querySelectorAll('.list_item');
        Array.from(books).forEach((book) => {
            const title = book.firstElementChild.textContent;
            if (title.toLowerCase().indexOf(term) != -1) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });
});

// document.addEventListener("DOMContentLoaded", function () {

//     //const submitSearch = document.getElementById("cari-list");
//     const searchBar = forms['cari-list'].querySelector('input');


//     searchBar.addEventListener('keyup', function (event) {
//         //event.preventDefault();
//         pencarianList();
//     });
// });

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});


