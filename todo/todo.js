
const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

// console.log(inputElement.value);
const notes = [
  "make a block with arrays",
  "talk about theory of arrays",
  "read about arrays",
];

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
