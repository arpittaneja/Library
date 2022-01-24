let newBookButton = document.querySelector(".new-book");
newBookButton.addEventListener("click", displayBookForm);

let formContainer = document.querySelector(".form-container");
let crossButton = document.querySelector(".cross");

let form = document.querySelector("form")
form.addEventListener("submit", addBookToLibrary);

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
    formContainer.classList.toggle("invisible");
}

function addBookToLibrary(e) {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let hasRead = document.querySelector("input[name='readStatus']:checked").value === "read" ? true : false;

    let newBook = new Book(name, author, pages, hasRead);
    myLibrary.push(newBook);
    updateLibrary(myLibrary);
    closeBookForm(e);
    form.reset();

}

function updateLibrary(myLibrary) {
    console.log(myLibrary);
    let booksContainer = document.querySelector(".book-cards");
    let index = 0;
    booksContainer.textContent = "";

    if (myLibrary.length >= 1) {
        for (let book of myLibrary) {
            let newBookCard = document.createElement("div");
            updateBookCard(newBookCard, book, index);
            booksContainer.appendChild(newBookCard);
            index++;
        }
    }
}

function removeCard(e) {
    console.log(e.target.getAttribute("data-number"));
    myLibrary.splice(parseInt(e.target.getAttribute("data-number")), 1);
    console.log(myLibrary.length);
    updateLibrary(myLibrary);
}

function updateReadState(e) {
    console.log(e.target.getAttribute("data-number"));

    myLibrary[e.target.getAttribute("data-number")].hasRead = !myLibrary[e.target.getAttribute("data-number")].hasRead

    console.log(myLibrary);
    console.log(myLibrary[e.target.getAttribute("data-number")].hasRead);

    updateLibrary(myLibrary);
}

function updateBookCard(newBookCard, book, index) {
    let attributes = [book.name, book.author, book.pages]

    for (let i = 0; i < 3; i++) {
        let p = document.createElement("p");
        p.textContent = `${attributes[i]}`
        newBookCard.appendChild(p);
    }

    let hasReadButton = document.createElement("div");
    hasReadButton.textContent = book.hasRead === true ? "Book Read" : "Book Unread";
    hasReadButton.addEventListener("click", updateReadState);

    if (hasReadButton.textContent === "Book Read") {
        hasReadButton.classList.add("book-read");
    }
    else {
        hasReadButton.classList.add("book-not-read");
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", removeCard)
    hasReadButton.setAttribute("data-number", `${index}`);
    removeButton.setAttribute("data-number", `${index}`);
    newBookCard.appendChild(hasReadButton);
    newBookCard.appendChild(removeButton);
    newBookCard.classList.add("card");
}