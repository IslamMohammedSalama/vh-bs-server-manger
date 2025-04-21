let overView = document.querySelector(".container > ul > li:nth-child(1)");
overView.onclick = function () {
	let overViewScreen = document.querySelector(".overview-screen");
	overViewScreen.style.cssText = `
    left:0;
    `;
};
let chat = document.querySelector(".container > ul > li:nth-child(2)");
chat.onclick = function () {
	let chatScreen = document.querySelector(".chat-screen");
	chatScreen.style.cssText = `
    left:0;
    `;
};

let pm = document.querySelector(".container > ul > li:nth-child(3)");
pm.onclick = function () {
	let pmScreen = document.querySelector(".pm-screen");
	pmScreen.style.cssText = `
    left:0;
    `;
};

let ss = document.querySelector(".container > ul > li:nth-child(4)");
ss.onclick = function () {
	let ssScreen = document.querySelector(".ss-screen");
	ssScreen.style.cssText = `
    left:0;
    `;
};

let rm = document.querySelector(".container > ul > li:nth-child(5)");
rm.onclick = function () {
	let rmScreen = document.querySelector(".rm-screen");
	rmScreen.style.cssText = `
    left:0;
    `;
};

let ws = document.querySelector(".container > ul > li:nth-child(6)");
ws.onclick = function () {
	let wsScreen = document.querySelector(".ws-screen");
	wsScreen.style.cssText = `
    left:0;
    `;
};

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	theScreen.children[0].children[0].onclick = () => {
		theScreen.style.left = "100dvw";
	};
});

