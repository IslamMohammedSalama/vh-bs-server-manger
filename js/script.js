let navs = document.querySelectorAll(".container > ul > li");
navs.forEach((li) => {
	li.onclick = () => {
		document.querySelector(`.${li.className}-screen`).style.left = "0";
	};
});

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	theScreen.children[0].children[0].onclick = () => {
		theScreen.style.left = "100dvw";
	};
});
