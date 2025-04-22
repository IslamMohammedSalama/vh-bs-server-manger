const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let navs = document.querySelectorAll(".container > ul > li:not(.discord)");
navs.forEach((li) => {
	li.onclick = () => {
		let tScreen = document.querySelector(`.${li.className}-screen`);
		tScreen.style.opacity = "1";
		tScreen.style.left = "0";
	};
});

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	console.log(theScreen);
	theScreen.children[0].children[0].onclick = async () => {
		theScreen.style.left = "100dvw";
		await delay(500);
		theScreen.style.opacity = "0";
	};
});
