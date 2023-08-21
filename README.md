# odin-library
Repo for the library project in the javascript course of the Odin Project

Goal is a functional library app with a UI that shows what books are in the library
and gives the user the ability to add or remove books. No other conditions
are given.

# Process Notes

8/6/23 - 8/7/23 

- Began the project by sketching ideas for the UI in Freeform 

<img src="dev/mockup.png">

- Concept is that when a card is clicked, it opens an overlay with the book information 
- Implemented the design with the intention to iterate later 
    - Decor in the blank spaces
    - Decorative buttons rather than text buttons
    - Better responsive UI
        - Looks terrible on iPhone
        - If squished, the cards get pretty small

8/8/23 - 8/9/23
- Implement an initial array of books that populate the DOM on startup
- Reorged code to be more readable

8/12/23 - 8/16/23
- Implement on-click overlay form designs
- Still some work to finish out here but the bones are filling in

8/19/23 
- Improved the on click forms 
- Began writing their functionality in Javascript.
- Still todo:
    - Actually use the ID's for the books rather than just their titles... 
    - This will come to a head in the remove book option. Removing by title
      isn't enough

8/20/23
- Finalized MVP
- Use value and unique bookID to manipulate the DOM and use the form inputs
- All on-click forms appear to be working as intended and bug free
    - Added images to the book info form
- Added images to the cards to make them look better
- Disbaled sort and search elements as I neve intended to give them function, just there for show
- Enforced a minimum size on the body to make the display work better if the window is resized 
    - Still not perfect, but not as bad
- Added cover images

Future Work:
- Add images to the banners to make it look better
    - Shelves? 
- Even more responsive 
- Storage of library 
- Upload images for covers