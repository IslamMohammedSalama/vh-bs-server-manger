let themeName = localStorage.getItem("theme");
if (themeName === "dark") {
	document.body.classList.add("dark-mode");
	document.getElementById("dark-mode").checked = true;
} else if (themeName === "light") {
	document.getElementById("dark-mode").checked = false;
}
