let addNewBookButton = document.querySelector(".add-new-book");
addNewBookButton.addEventListener("click", displayBookForm);
let formContainer = document.querySelector(".form-container");
let crossButton = document.querySelector(".cross");
let form = document.querySelector("form");
form.addEventListener("submit", addBookToLibrary);
let shadow = document.querySelector(".shadow");

let myLibrary = [];

//book constructor
function Book(name, author, pages, hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

//dsiplays form on screen
function displayBookForm(e) {
    formContainer.classList.toggle("invisible");
    shadow.classList.toggle("invisible");
    crossButton.addEventListener("click", closeBookForm);
}

//hides form from screen
function closeBookForm(e) {
    formContainer.classList.toggle("invisible");
    shadow.classList.toggle("invisible");
    crossButton.removeEventListener("click", closeBookForm);
}

//collects the form info and appends a Book instance to the library array
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

//adds each element of library array to shelf
function updateLibrary(myLibrary) {
    let shelf = document.querySelector(".shelf");
    let index = 0;
    shelf.textContent = "";

    if (myLibrary.length >= 1) {
        for (let book of myLibrary) {
            let newBookCard = document.createElement("div");
            updateNewBookCard(newBookCard, book, index);
            shelf.appendChild(newBookCard);
            index++;
        }
    }
}

//removes the book object from the array
function removeBook(e) {
    console.log(e.target.parentNode.dataset.number);
    myLibrary.splice(parseInt(e.target.parentNode.dataset.number), 1);
    updateLibrary(myLibrary);
}

//changes the read status of books
Book.prototype.updateReadState = function (e) {
    this.hasRead = !this.hasRead;
    if (this.hasRead === true) {
        e.target.textContent = "Book Not Read"
        e.target.parentNode.classList.remove("book-card-read");
        e.target.parentNode.classList.add("book-card-not-read");
    }
    else {
        e.target.textContent = "Book Read"
        e.target.parentNode.classList.remove("book-card-not-read");
        e.target.parentNode.classList.add("book-card-read");
    }
    console.log("hi")
}

//appends html elemenst the the new Book card
function updateNewBookCard(newBookCard, book, index) {

    let p = document.createElement("p");
    p.textContent = `${book.name}`
    p.style.fontSize = "2.1rem";
    p.style.fontWeight = "bold";
    newBookCard.appendChild(p);

    p = document.createElement("p");
    p.textContent = `by ${book.author}`
    newBookCard.appendChild(p);

    p = document.createElement("p");
    p.textContent = `${book.pages} pages`
    newBookCard.appendChild(p);

    let hasReadButton = document.createElement("p");
    hasReadButton.textContent = book.hasRead === true ? "Book Read" : "Book Not Read";
    console.log(book);
    hasReadButton.addEventListener("click", book.updateReadState);

    if (hasReadButton.textContent === "Book Read") {
        newBookCard.classList.add("book-card-read");
    }
    else {
        newBookCard.classList.add("book-card-not-read");
    }

    hasReadButton.classList.add("book-status");

    let removeButton = document.createElement("button");
    removeButton.classList.add("book-remove");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", removeBook)

    newBookCard.setAttribute("data-number", `${index}`);
    newBookCard.appendChild(hasReadButton);
    newBookCard.appendChild(removeButton);
    newBookCard.classList.add("card");
}