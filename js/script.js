let addNewBookButton = document.querySelector(".add-new-book");
addNewBookButton.addEventListener("click", displayBookForm);
let formContainer = document.querySelector(".form-container");
let crossButton = document.querySelector(".cross");
let form = document.querySelector("form");
form.addEventListener("submit", addBookToLibrary);
let myLibrary = [];
let shadow = document.querySelector(".shadow");

function Book(name, author, pages, hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function displayBookForm(e) {
    formContainer.classList.toggle("invisible");
    shadow.classList.toggle("invisible");
    crossButton.addEventListener("click", closeBookForm);
}

function closeBookForm(e) {
    formContainer.classList.toggle("invisible");
    shadow.classList.toggle("invisible");
    crossButton.removeEventListener("click", closeBookForm);
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
    // console.log(myLibrary);
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

function removeCard(e) {
    console.log(e.target.parentNode.dataset.number);
    myLibrary.splice(parseInt(e.target.parentNode.dataset.number), 1);
    updateLibrary(myLibrary);
}

function updateReadState(e) {
    // console.log(myLibrary[e.target.parentNode.dataset.number].hasRead)
    myLibrary[e.target.parentNode.dataset.number].hasRead = !myLibrary[e.target.parentNode.dataset.number].hasRead

    // console.log(myLibrary[e.target.parentNode.dataset.number].hasRead)
    // updateLibrary(myLibrary);
    if (e.target.textContent === "Book Not Read") {
        e.target.textContent = "Book Read"
        e.target.parentNode.classList.remove("book-card-not-read");
        e.target.parentNode.classList.add("book-card-read");       
    }
    else {
        e.target.textContent = "Book Not Read"
        e.target.parentNode.classList.remove("book-card-read");
        e.target.parentNode.classList.add("book-card-not-read");    
    }
}

function updateNewBookCard(newBookCard, book, index) {
    let p = document.createElement("p");
    p.textContent = `${book.name}`
    p.style.fontSize = "2.5rem";
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
    hasReadButton.addEventListener("click", updateReadState);

    if (hasReadButton.textContent === "Book Read") {
        // hasReadButton.classList.add("book-read");
        newBookCard.classList.add("book-card-read");
    }
    else {
        // hasReadButton.classList.add("book-not-read");
        newBookCard.classList.add("book-card-not-read");
    }
    hasReadButton.classList.add("book-status");

    let removeButton = document.createElement("button");
    removeButton.classList.add("book-remove");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", removeCard)

    newBookCard.setAttribute("data-number", `${index}`);
    // removeButton.setAttribute("data-number", `${index}`);

    newBookCard.appendChild(hasReadButton);
    newBookCard.appendChild(removeButton);
    newBookCard.classList.add("card");
}