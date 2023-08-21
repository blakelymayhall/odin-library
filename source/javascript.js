//
// Function Definitions
//
function Book(bookID, title, author, noPages, didRead, img = "source/images/no_image.jpg") {
  
    const coverimgs = [
        "source/images/book_cover_gray.jpg", 
        "source/images/book_cover_red.jpg", 
        "source/images/book_cover_blue.jpg"];

    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.didRead = didRead;
    this.img = img;
    this.coverimg = coverimgs[Math.floor(Math.random()*coverimgs.length)];
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
    addBookToLibrary(Gunslinger);
}

function genBookID() {
    return Math.floor(Date.now() * Math.random());
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
        bookCard.dataset.bookID = myLibrary[ii].bookID;
        bookCard.style.cssText = "background-image:url(\"" + myLibrary[ii].coverimg + "\");"
        bookTitle.textContent = myLibrary[ii].title;

        bookCard.appendChild(bookTitle);
        bookCell.appendChild(bookCard);

        document.querySelector(".mainWindowContent").appendChild(bookCell);

        // Add to select in removeBookOverlay dialog
        const bookOption = document.createElement("option");
        bookOption.value=myLibrary[ii].bookID;
        bookOption.text=myLibrary[ii].title;
        document.querySelector("#bookToRemove").appendChild(bookOption);
    }

    attachBookClickEvents()
}

function closeForms() {
    document.querySelector("#addBookOverlay").style.display = "none";
    document.querySelector("#removeBookOverlay").style.display = "none";
    document.querySelector(".bookInfoOverlay").style.display = "none";
}

function resetDOM() {
    const toDelete = document.querySelectorAll(".bookCell, .bookCard, option")
    toDelete.forEach((e) => {
        e.parentElement.removeChild(e);
    });
}

// 
// Click / Event Handlers
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
        closeForms();
        libraryFunctionMode = LibraryFunctionModes.STANDBY;
    });
});
const submitButtons = document.querySelectorAll(".confirmForm");
submitButtons.forEach((submitButton) => {
    submitButton.addEventListener("click", () => {
        if(libraryFunctionMode == LibraryFunctionModes.ADD_BOOK) {
            let addBookFormData = new FormData(document.forms.addBookOverlay);
            const newBook = new Book(genBookID(), 
                addBookFormData.get("inputBookTitle"), 
                addBookFormData.get("inputBookAuthor"), 
                addBookFormData.get("inputNoPages"), 
                addBookFormData.get("inputHaveRead"));
            addBookToLibrary(newBook);
        }

        if(libraryFunctionMode == LibraryFunctionModes.DELETE_BOOK) {
            let delBookFormData = new FormData(document.forms.removeBookOverlay);
            myLibrary = myLibrary.filter(book => book.bookID != delBookFormData.get("bookToRemove"));
        }

        resetDOM();
        loadLibrary();
        closeForms();
        libraryFunctionMode = LibraryFunctionModes.STANDBY;
    });
});

function attachBookClickEvents() {
    document.querySelectorAll(".bookCard").forEach((bookCard) => {
        bookCard.addEventListener("click", () => {
            if(libraryFunctionMode == LibraryFunctionModes.STANDBY) {
                // Get the clicked book 
                // Replace text content with the book info
                const viewBook = myLibrary.find(book => book.bookID == bookCard.dataset.bookID);
                document.querySelector("#bookTitle").textContent = viewBook.title;
                document.querySelector("#bookAuthor").textContent = viewBook.author;
                document.querySelector("#noPages").textContent = viewBook.noPages;
                document.querySelector("#didRead").textContent = viewBook.didRead ? "Yes" : "No";
                document.querySelector("#bookImage img").src = viewBook.img;
                document.querySelector(".bookInfoOverlay").style.display = "flex";
                libraryFunctionMode = LibraryFunctionModes.VIEW_TITLE;
            }
        });
    });
}

//
// Main Program 
//
let myLibrary = [];

const IT            = new Book(genBookID(), "IT", "Stephen King", "1405", true, "source/images/it_king.jpeg");
const PetSemetary   = new Book(genBookID(), "Pet Semetary", "Stephen King", "405", true, "source/images/pet_sem_king.jpeg");
const Twilight      = new Book(genBookID(), "Twilight", "Stephany Meyer", "735", true);
const BreakingDawn  = new Book(genBookID(), "Breaking Dawn", "Stephany Meyer", "823", true);
const FiftyShades   = new Book(genBookID(), "Fifty Shades of Gray", "S.E. Hinton", "300", false);
const Gunslinger    = new Book(genBookID(), "Gunslinger", "Stephen King", "300", true);

// Load the library and do respective DOM manip for first pass
initPass = true;
loadLibrary();