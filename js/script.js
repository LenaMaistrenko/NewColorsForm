// ТЕМА: Перевірка достовірності форм.
// Використання Cookie LocalStorige
// Завдання
// Реалізуйте сторінку з палітрою кольорів і формою для додавання нового кольору.
// Один колір характеризується:
// ■ унікальною назвою;
// ■ типом (RGB, RGBА або HEX);
// ■ кодом кольору.
// При натисканні на кнопку Save необхідно перевіряти введені
// дані за такими правилами.
// Назва:
// ■ обов’язкове поле;
// ■ не регістрозалежне унікальне значення (тобто у списку
// вже існуючих кольорів не повинно бути тієї ж назви);
// ■ тільки літери.
// Тип:
// ■ випадний список з 3 варіантів: RGB, RGBA, HEX.
// 2
// Домашнє завдання 1
// Код кольору:
// ■ RGB – 3 числа через кому, кожне число в діапазоні від 0 до
// 255;
// ■ RGBA – 4 числа через кому, перші 3 числа в діапазоні від 0
// до 255, останнє число від 0 до 1;
// ■ HEX – символ # та 6 цифр або літер від A до F.
// Якщо користувач під час заповнення форми ввів помилкові
// дані, тоді необхідно відобразити відповідні помилки.
// Обов’язково зберігайте колекцію кольорів у Cookie для того,
// щоб при оновленні сторінки не втратити дані. Максимальний
// термін життя Cookie – 3 години
localStorage.clear();
let colors = JSON.parse(localStorage.getItem("colors")) || [];
console.log(colors);
colors.forEach(addColor);
const color_form = document.getElementById("color_form");
color_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value;
  const code = document.getElementById("code").value.trim();
  console.log(name, type, code);
  let valid = true;

  document.getElementById("name-error").textContent = "";
  document.getElementById("code-error").textContent = "";

  if (!name.match(/^[a-zA-Z]+$/)) {
    document.getElementById("name-error").textContent =
      "Color can only contain letters";
    valid = false;
  } else if (
    colors.some((color) => color.name.toLowerCase() === name.toLowerCase())
  ) {
    document.getElementById("name-error").textContent = "Name must be unique.";
    valid = false;
  }
  if (!validateColorCode(type, code)) {
    document.getElementById(
      "code-error"
    ).textContent = ` Expected format for ${type} is ${getExampleForType(
      type
    )}.`;
    valid = false;
  }
  if (valid) {
    const new_color = { name, type, code };
    colors.push(new_color);
    localStorage.setItem("colors", JSON.stringify(colors));
    addColor(new_color);
    this.reset();
  }
});

function validateColorCode(type, code) {
  if (type === "RGB")
    return code.match(/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/);
  if (type === "RGBA")
    return code.match(/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|0\.\d+|1)$/);
  if (type === "HEX") return code.match(/^#([A-Fa-f0-9]{6})$/);
  return false;
}
function getExampleForType(type) {
  if (type === "RGB") return "e.g., 255, 0, 0";
  if (type === "RGBA") return "e.g., 255, 0, 0, 0.5";
  if (type === "HEX") return "e.g., #FF0000";
  return "";
}

function addColor(color) {
  const colorBox = document.createElement("div");
  colorBox.className = "color-box";

  const colorPreview = document.createElement("div");
  colorPreview.className = "color-preview";
  colorPreview.style.backgroundColor = getColorCode(color.type, color.code);
  console.log(colorPreview.style.backgroundColor);

  const colorInfo = document.createElement("div");
  colorInfo.className = "color-info";
  colorInfo.innerHTML = `
    <strong>${color.name}</strong><br>
   ${color.type}<br>
     ${color.code}
  `;

  colorBox.appendChild(colorPreview);
  colorBox.appendChild(colorInfo);

  document.getElementById("color-palette").appendChild(colorBox);
}
function getColorCode(type, code) {
  if (type === "RGB" || type === "RGBA") {
    return `rgb(${code})`;
  }
  if (type === "HEX") {
    return code;
  }
  return "#fff";
}
