import { FileHelper } from "./FileHelper.js";

const previousContainer = document.querySelector(".previous");
const currentContainer = document.querySelector(".current");
const nextContainer = document.querySelector(".next");
const absentContainer = document.querySelector(".right");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");

const fileHelper = new FileHelper();
export let names = [];
const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
const textFromFile = fileHelper.pullTextFromFile("roster.txt");
if (isMac) {
  names = textFromFile.split("\n");
} else {
  names = textFromFile.split("\r\n");
}

export function renderMain() {
  shuffle(names);
  addNamesToNextContainer(names);

  nextButton.addEventListener("click", callNextName);
  previousButton.addEventListener("click", callPreviousName);
  currentContainer.addEventListener("click", markAsAbsent);
}

function shuffle(array) {
  const max = array.length;
  for (let i = 0; i < max; i++) {
    const j = Math.floor(Math.random() * max);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addNamesToNextContainer(names) {
  names.forEach((name) => {
    const span = document.createElement("span");
    span.innerText = name;
    nextContainer.appendChild(span);
  });
}

const callNextName = () => {
  if (currentContainer.children.length > 1) {
    const el = currentContainer.lastChild;
    previousContainer.appendChild(el);
  }
  if (nextContainer.children.length > 1) {
    const el = nextContainer.children.item(1);
    currentContainer.appendChild(el);
  }
};

const callPreviousName = () => {
  if (currentContainer.children.length > 1) {
    const el = currentContainer.lastChild;
    const secondEl = nextContainer.children.item(1);
    nextContainer.insertBefore(el, secondEl);
  }
  if (previousContainer.children.length > 1) {
    const el = previousContainer.lastChild;
    currentContainer.appendChild(el);
  }
};

const markAsAbsent = () => {
  if (currentContainer.children.length > 1) {
    const el = currentContainer.lastChild;
    absentContainer.appendChild(el);
    callNextName();
  }
};
