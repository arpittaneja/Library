let newBookButton = document.querySelector(".new-book");
console.log(newBookButton);
let form = document.querySelector(".new-book-form");
console.log(form);
newBookButton.addEventListener("click", displayBookForm);
let crossButton = document.querySelector(".cross");

resetButton = document.querySelector(".reset")
function displayBookForm(e) {
    form.classList.toggle("invisible");
    newBookButton.removeEventListener("click", displayBookForm);
    crossButton.addEventListener("click", closeBookForm);
}

function closeBookForm(e) {
    newBookButton.addEventListener("click", displayBookForm);
    resetButton.click();
    form.classList.toggle("invisible");
}