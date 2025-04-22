const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function sendMessege(msg) {
	let messegsBox = document.querySelector(".chat-screen .messeges");
	let newMsg = document.createElement("p");
	newMsg.textContent = `ServerName : ${msg}`;
	messegsBox.appendChild(newMsg);
}
// Navgtaite To Screens
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
	theScreen.children[0].children[0].onclick = async () => {
		theScreen.style.left = "100dvw";
		await delay(500);
		theScreen.style.opacity = "0";
	};
});

let sendBtn = document.querySelector(
	".chat-screen .write-messeges form button"
);
sendBtn.onclick = (e) => {
	e.preventDefault();
	let input = document.querySelector(".chat-screen .write-messeges input");
	sendMessege(input.value);
	input.value = "";
};
