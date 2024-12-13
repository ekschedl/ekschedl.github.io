/* Theory
// const array = [1, 2, 4, 6, 7];
// console.log(array);

// const arrayStrings = ["Katja", "Petja", 3, "Kostja"];
// console.log(arrayStrings.length);
// console.log(arrayStrings[2]);
// console.log(array[array.length - 2]);
// array[0] = "Hi";
// console.log(array);
*/

const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

// console.log(inputElement.value);
const notes = [
  "make a block with arrays",
  "talk about theory of arrays",
  "read about arrays",
];
/*
function render() {
  //   for (let i = 0; i < notes.length; i++) {
  //     listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i]));
  //   }

  // besser :
  for (let note of notes) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(note));
  }
}
render();
*/

// createBtn.onclick = function () {
//   if (inputElement.value.length === 0) {
//     return;
//   }
//   listElement.insertAdjacentHTML(
//     "beforeend",
//     getNoteTemplate(inputElement.value)
//   );
//   listElement.value = "";
// };

// function getNoteTemplate(title) {
//   return `
//   <li class="list-group-item d-flex justify-content-between align-items-center">
//             <span>${title}</span>
//             <span>
//                 <span class="btn btn-small btn-success">&check;</span>
//                 <span class="btn btn-small btn-danger">&times;</span>
//             </span>
//  </li>`;
// }

/*
// Object Theory
*/
const person = {
  firstName: "Katja",
  lastName: "Schedlberger",
  year: 1983,
  isMarried: true,
  languages: ["ru", "de", "en", "it"],
  getFullName: function () {
    console.log(person.firstName + " " + person.lastName);
  },
};
console.log(typeof person);
console.log(person.getFullName());
console.log(person["languages"]);
const key = "isMarried";
console.log(person[key]);
person.isMarried = false;
console.log(person[key]);

const notes2 = [
  {
    title: "make a block with arrays",
    isCompleted: false,
  },
  {
    title: "talk about theory of arrays",
    isCompleted: true,
  },
];
function render() {
  listElement.innerHTML = "";
  if (notes2.length === 0) {
    listElement.innerHTML = "<p> No elements</p>";
  }
  for (let i = 0; i < notes2.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes2[i], i));
  }
}
render();
listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index); // or parseInt(event.target.dataset.index)
    const type = event.target.dataset.type;
    if (type === "toggle") {
      notes2[index].isCompleted = !notes2[index].isCompleted;
    } else if (type === "delete") {
      notes2.splice(index, 1);
    }
    render();
  }
};
function getNoteTemplate(note, index) {
  return `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="${note.isCompleted ? "text-decoration-line-through" : ""}">
          ${note.title}
        </span>
        <span>
          <span class="btn btn-small btn-${
            note.isCompleted ? "warning" : "success"
          }" data-index="${index}" data-type="toggle">&check;</span>
          <span class="btn btn-small btn-danger" data-index="${index}" data-type="delete">&times;</span>
        </span>
      </li>`;
}

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    isCompleted: false,
  };
  notes2.push(newNote);
  render();
  inputElement.value = "";
};
