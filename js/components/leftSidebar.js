import { names } from "./main.js";

const leftSidebar = document.querySelector(".left");

export function renderLeftSidebar() {
  names.sort().forEach(name => {
      const span = document.createElement("span");
      span.innerText = name;
      leftSidebar.appendChild(span);
  });
}
