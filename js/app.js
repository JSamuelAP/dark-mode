"use scrits";

const body = document.body;
const themeSwitcher = document.querySelector("#theme-switcher");
const colorsContainer = document.querySelector(".colors");
const colorOptions = document.querySelectorAll(".color");
const currentConfig = JSON.parse(localStorage.getItem("config-theme"));
const config = {
  theme: null,
  color: null,
};

document.addEventListener("DOMContentLoaded", () => {
  // Materialize
  M.AutoInit();

  if (currentConfig) {
    // Configuración encontrada en LocalStorage
    const { theme, color } = currentConfig;
    config.theme = theme;
    config.color = color;
    changeTheme();
    changeColor();
  } else {
    // Tema del navegador y color por defecto
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark");
    config.theme = prefersDarkScheme ? "dark" : "light";
    config.color = "blue";
    changeTheme();
    changeColor();
  }
});

themeSwitcher.addEventListener("click", () => {
  config.theme = themeSwitcher.checked ? "dark" : "light";
  changeTheme();
});
colorsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    // Quitarle el icono a todos los colores
    colorOptions.forEach((color) => (color.innerText = ""));

    // Obtener el color mediante la clase del color seleccionado
    config.color = e.target.classList[1];
    changeColor();
  }
});

function changeTheme() {
  if (config.theme === "dark") {
    themeSwitcher.checked = true;
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }

  saveLocalStorage();
}
function changeColor() {
  // Obtener el color seleccionado y agregarle el icono
  const colorSelected = document.querySelector(`.color.${config.color}`);
  colorSelected.innerHTML = "<i class='material-icons white-text'>check</i>";

  // Asignar valor a la variable CSS
  body.style.setProperty("--main", `var(--${config.color})`);
  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem("config-theme", JSON.stringify(config));
}
