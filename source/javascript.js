//
// Function Definitions
//

function Book(idx, title, author, noPages, didRead) {
    this.idx = idx;
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.didRead = didRead;

    this.info = function() {
        let didReadText = "";
        didRead ? didReadText = "read" : didReadText = "not read yet";
        return `${title} by ${author}, ${noPages} pages, ${didReadText}`; 
    } 
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function initLibrary() {
    addBookToLibrary(IT);
    addBookToLibrary(PetSemetary);
    addBookToLibrary(Twilight);
    addBookToLibrary(BreakingDawn);
    addBookToLibrary(FiftyShades);
}

function initalLoad() {
    initLibrary();
    for(let ii = 0; ii < myLibrary.length; ii++) {
        const bookCell = document.createElement("div");
        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("p");

        bookCell.classList.add("bookCell");
        bookCard.classList.add("bookCard");
        bookCard.dataset.idx = myLibrary[ii].idx;
        bookTitle.textContent = myLibrary[ii].title;

        bookCard.appendChild(bookTitle);
        bookCell.appendChild(bookCard);

        document.querySelector(".mainWindowContent").appendChild(bookCell);
    }
}

//
// Main Program 
//
let myLibrary = [];
const IT = new Book(1, "IT", "Stephen King", "1405", true);
const PetSemetary = new Book(2, "Pet Semetary", "Stephen King", "405", true);
const Twilight = new Book(3, "Twilight", "Stephany Meyer", "735", true);
const BreakingDawn = new Book(4, "Breaking Dawn", "Stephany Meyer", "823", true);
const FiftyShades = new Book(5, "Fifty Shades of Gray", "S.E. Hinton", "300", false);

initalLoad();