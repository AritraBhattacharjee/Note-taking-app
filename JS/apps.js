// console.log("Hello");
let addbtn = document.getElementById("addbtn");
// console.log(addbtn)
showNotes();
addbtn.addEventListener("click", function (e) {
  let addtext = document.getElementById("addtext");
  // console.log(addtext)
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.push(addtext.value);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addtext.value = "";
  //   console.log(notesobj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
        <div class=" notecard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">
              ${element}
            </p>
            <button id = '${index}' onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
          </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesobj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Add a note to view`;
  }
}

// adding deleting functionality
function deleteNote(index) {
  //   console.log("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  showNotes();
}

let search = document.getElementById("searchTxt");
// console.log(search);
search.addEventListener("input", function () {
  //   console.log("Input event fired")
  //   console.log("Input Event Fired")
  //   alert("Clicked")
  let inputVal = search.value.toLowerCase();
  // console.log("Input event fired", inputVal)

  let notecards = document.getElementsByClassName("notecard");
  Array.from(notecards).forEach(function (element) {
    let cardtext = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    // console.log(cardtext)
    if (cardtext.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*further features:
1. Add title for the note
2. Mark a note as important
3. Seperate notes by user.

can use database

*/
