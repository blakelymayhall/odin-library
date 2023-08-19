//
// Function Definitions
//
function Book(idx, title, author, noPages, didRead) {
    this.idx = idx;
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.didRead = didRead;
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
    addBookToLibrary(IT);
    addBookToLibrary(PetSemetary);
    addBookToLibrary(Twilight);
    addBookToLibrary(BreakingDawn);
}

function loadLibrary() {

    if(initPass) {
        // Load the canned set of books into the array
        initLibrary();
        initPass = false;
    }

    // DOM Maninpulation to put the titles on the shelf
    // and insert them into the select element in the 
    // removeBookOverlay dialog
    for(let ii = 0; ii < myLibrary.length; ii++) {
        // Add to shelf
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

        // Add to select in removeBookOverlay dialog
        const bookOption = document.createElement("option");
        bookOption.value=myLibrary[ii].idx.toString();
        bookOption.text=myLibrary[ii].title;
        document.querySelector("#bookToRemove").appendChild(bookOption);
    }
}

function resetDOM() {
    const toDelete = document.querySelectorAll(".bookCell, .bookCard, option")
    toDelete.forEach((e) => {
        e.parentElement.removeChild(e);
    });
}

// 
// Button Click Handlers
//
const LibraryFunctionModes = {
	STANDBY: Symbol("standby"),
	ADD_BOOK: Symbol("add_book"),
    DELETE_BOOK: Symbol("delete_book"),
	VIEW_TITLE: Symbol("view_title")
}
let libraryFunctionMode = LibraryFunctionModes.STANDBY;

const addButton = document.querySelector(".add");
addButton.addEventListener("click", () => {
    if(libraryFunctionMode == LibraryFunctionModes.STANDBY) {
        document.querySelector("#addBookOverlay").style.display = "flex";
        libraryFunctionMode = LibraryFunctionModes.ADD_BOOK;
    }
});
const delButton = document.querySelector(".delete");
delButton.addEventListener("click", () => {
    if(libraryFunctionMode == LibraryFunctionModes.STANDBY) {
        document.querySelector("#removeBookOverlay").style.display = "flex";
        libraryFunctionMode = LibraryFunctionModes.DELETE_BOOK;
    }
});
const closeButtons = document.querySelectorAll(".closeForm");
closeButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
        document.querySelector("#addBookOverlay").style.display = "none";
        document.querySelector("#removeBookOverlay").style.display = "none";
        document.querySelector(".bookInfoOverlay").style.display = "none";
        libraryFunctionMode = LibraryFunctionModes.STANDBY;
    });
});
const submitButtons = document.querySelectorAll(".confirmForm");
submitButtons.forEach((submitButton) => {
    submitButton.addEventListener("click", () => {
        if(libraryFunctionMode == LibraryFunctionModes.ADD_BOOK) {
            let addBookFormData = new FormData(document.forms.addBookOverlay);
            const newBook = new Book(1, 
                addBookFormData.get("inputBookTitle"), 
                addBookFormData.get("inputBookAuthor"), 
                addBookFormData.get("inputNoPages"), 
                addBookFormData.get("inputHaveRead"));
            addBookToLibrary(newBook);
            resetDOM();
            loadLibrary();
        }

        if(libraryFunctionMode == LibraryFunctionModes.DELETE_BOOK) {
            let delBookFormData = new FormData(document.forms.removeBookOverlay);
            delBookFormData.get("bookToRemove");
        }

        libraryFunctionMode = LibraryFunctionModes.STANDBY;
    });
});

//
// Main Program 
//
let myLibrary = [];
const IT = new Book(1, "IT", "Stephen King", "1405", true);
const PetSemetary = new Book(2, "Pet Semetary", "Stephen King", "405", true);
const Twilight = new Book(3, "Twilight", "Stephany Meyer", "735", true);
const BreakingDawn = new Book(4, "Breaking Dawn", "Stephany Meyer", "823", true);
const FiftyShades = new Book(5, "Fifty Shades of Gray", "S.E. Hinton", "300", false);

// Load the library and do respective DOM manip for first pass
initPass = true;
loadLibrary();