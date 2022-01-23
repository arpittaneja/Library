let newBookButton = document.querySelector(".new-book");
newBookButton.addEventListener("click", displayBookForm);
// console.log(newBookButton);

let formContainer = document.querySelector(".form-container");
// console.log(form);
let crossButton = document.querySelector(".cross");

let form = document.querySelector("form")
form.addEventListener("submit", addBookToLibrary);
resetButton = document.querySelector(".reset")

let myLibrary = [];

function Book(name, author, pages, hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function displayBookForm(e) {
    formContainer.classList.toggle("invisible");
    newBookButton.removeEventListener("click", displayBookForm);
    crossButton.addEventListener("click", closeBookForm);
}

function closeBookForm(e) {
    newBookButton.addEventListener("click", displayBookForm);
    // clearForm();
    formContainer.classList.toggle("invisible");
}

function addBookToLibrary(e) {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let hasRead = document.querySelector("input[name='readStatus']:checked").value === "read" ? true : false;

    console.log(name, author, pages, hasRead)

    if (!name || !author || !pages) {
        console.log("oops");
    }
    else {
        let newBook = new Book(name, author, pages, hasRead);
        console.log(newBook)
        myLibrary.push(newBook);
        updateLibrary();
        closeBookForm(e);
        form.reset();
    }
}

function updateLibrary() {
    console.log(myLibrary);
    let cards = document.querySelector(".book-cards");
    let count = 0;
    cards.textContent = "";
    if (myLibrary.length === 0) {
        console.log("hello");
    }
    else {
        for (let book of myLibrary) {
            let newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.textContent = `${book.name}, ${book.author}, ${book.pages}, ${book.hasRead}`;
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", deleteThisCard)
            let hasReadButton = document.createElement("div");
            hasReadButton.textContent = book.hasRead === true ? "Book Read" : "Book Unread";
            hasReadButton.addEventListener("click", changeReadState);
            if (hasReadButton.textContent === "Book Read") {
                hasReadButton.classList.add("book-read");
            }
            else {
                hasReadButton.classList.add("book-not-read");
            }
            newCard.appendChild(hasReadButton);
            newCard.appendChild(deleteButton);
            deleteButton.id = `${count}`;
            cards.appendChild(newCard);
            count++;
        }
    }
}

function deleteThisCard(e) {
    console.log(e.target.id);
    myLibrary.splice(parseInt(e.target.id), 1);
    updateLibrary();
}

function changeReadState(e) {
    console.log(e);
}