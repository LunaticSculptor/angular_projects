// let color_and_text = document.querySelector(".color_and_text").children;
// let input = color_and_text[1].children[0];
// input.value = "#00ffa1";
// let button = document.querySelector("button");
// let right_container = document.querySelector(".right-container-notes");
// let textarea = document.querySelector("textarea");

// button.addEventListener("click", () => {
//     removeNotes();

//     console.log('button clicked');
//     // console.log("Input "+color_and_text[0].value);
//     // console.log(textarea.value+" textarea")
//     // let note = color_and_text[0].value;
//     let note = textarea.value;
//     // console.log("Color "+input.value);
//     let color = input.value;
//     addNotes(note, color)
//     // removeNotes();
// });

// function addNotes(note, color) {
//     // Write function to add notes on the UI
    
//     console.log(note+" "+color)
// }

// function removeNotes() {
//     // Write function to remove notes from the UI
//     console.log(right_container)
// }




let color_and_text = document.querySelector(".color_and_text").children;
let input = color_and_text[1].children[0];
input.value = "#00ffa1";
let button = document.querySelector("button");
let right_container = document.querySelector(".right-container-notes");
let textarea = document.querySelector("textarea");
let notesNotAdded = document.querySelector(".notesNotAdded");

button.addEventListener("click", () => {
    let note = textarea.value.trim();
    let color = input.value;
    if (note) {
        addNotes(note, color);
        textarea.value = "";
        notesNotAdded.style.display = "none";
    }
});

function addNotes(note, color) {
    let noteDiv = document.createElement("div");
    noteDiv.style.backgroundColor = color;
    noteDiv.classList.add("note-item");
    
    let noteText = document.createElement("p");
    noteText.innerText = note;
    
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006;";
    deleteButton.addEventListener("click", () => {
        removeNotes(noteDiv);
    });
    
    noteDiv.appendChild(deleteButton);
    noteDiv.appendChild(noteText);
    right_container.appendChild(noteDiv);
}

function removeNotes(noteDiv) {
    right_container.removeChild(noteDiv);
    if (right_container.children.length === 0) {
        notesNotAdded.style.display = "flex";
        notesNotAdded.style.justifyContent = "center";
        notesNotAdded.style.alignItems = "center";
    }
}
