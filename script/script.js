const divs = document.querySelectorAll(".col");
const btnColorGenerator = document.querySelector(".color-generator");
const lockImage = document.querySelectorAll(".lock-image");
const copyBtns = document.querySelectorAll(".copy");

const lockDivs = [];


const getRandomHexColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, "0")}`;
};

const clickHandler = (e) => {
  changeColorFunc(e.target);
};

const lockHandler = (e) => {
  e.stopPropagation();
  const parentId = e.target.parentNode.id;
  const index = lockDivs.findIndex((item) => item === parentId);
  if (index !== -1) {
    lockDivs.splice(index, 1);
    e.target.src = "../assets/unlock.svg";
  } else {
    lockDivs.push(parentId);
    e.target.src = "../assets/lock.svg";
  }
};

const copyText = (e) => {
  e.stopPropagation();
  //   previousElementSibling
  const { previousElementSibling: element } = e.target.parentNode;
  navigator.clipboard.writeText(element.innerText);
  alert(`Hex Code ("${element.innerText}") Copied To Clipboard!`);
};

const changeColorFunc = (element) => {
  const [{ children }] = element.children;
  const newColor = getRandomHexColor();
  element.style.background = newColor;
  children[0].innerText = newColor;
};

const paletteGenerator = () => {
  divs.forEach((item) => {
    if (!lockDivs.includes(item.id)) changeColorFunc(item);
  });
};

divs.forEach((item) => item.addEventListener("click", clickHandler));
lockImage.forEach((item) => item.addEventListener("click", lockHandler));
copyBtns.forEach((item) => item.addEventListener("click", copyText));
btnColorGenerator.addEventListener("click", paletteGenerator);

