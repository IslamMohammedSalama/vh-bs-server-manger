// Wait function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// Send Msg Function
function sendMessege(msg) {
	let msgsBox = document.querySelector(".chat-screen .messeges");
	let newMsg = document.createElement("p");
	newMsg.textContent = `ServerName : ${msg}`;
	msgsBox.appendChild(newMsg);
	newMsg.scrollIntoView({ behavior: "smooth" });
}

// Update URL without page reload
function updateURL(screenClass) {
	// Get the screen name from class (remove '-screen' suffix)
	const screenName = screenClass.replace("-screen", "");

	// Create a state object
	const stateObj = { screen: screenName };

	// Change the URL without reloading the page
	history.pushState(stateObj, "", `#${screenName}`);
}

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
	if (event.state && event.state.screen) {
		navigateToScreen(event.state.screen + "-screen");
	} else {
		// Default to home if no state is available
		document.querySelectorAll(".screen").forEach((screen) => {
			screen.style.left = "100dvw";
			screen.style.display = "none";
		});
		document.body.classList.remove("disable-scrolling");
	}
});

// Function to handle navigation to a specific screen
async function navigateToScreen(screenClass) {
	const tScreen = document.querySelector("." + screenClass);

	// Exit if the screen doesn't exist
	if (!tScreen) return;

	// Show the screen
	tScreen.style.display = "block";
	await delay(10);
	tScreen.style.left = 0;
	document.body.classList.add("disable-scrolling");
	// Update URL
	updateURL(screenClass);
}

// Initialize navigation on page load
function initializeFromURL() {
	// Get the hash from the URL (if any)
	const hash = window.location.hash.substring(1);

	if (hash) {
		// Navigate to the screen if hash exists
		navigateToScreen(hash + "-screen");
	}
}
// Reset Button Function
document
	.querySelectorAll("button")
	.forEach((btn) => (btn.onclick = (ev) => ev.preventDefault()));

// Navgtaite To Screens
let navs = document.querySelectorAll(
	"body > .container > ul > li:not(.discord)"
);
navs.forEach((li) => {
	li.onclick = async () => {
		let tScreen = document.querySelector(`.${li.className}-screen`);
		// tScreen.style.opacity = "1";
		tScreen.style.display = "block";
		await delay(0);
		tScreen.style.left = "0";
		document.body.classList.add("disable-scrolling");
		updateURL(li.className);
	};
});

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	theScreen.children[0].children[0].onclick = async () => {
		history.replaceState("", "", "/");
		theScreen.style.left = "100dvw";
		document.body.classList.remove("disable-scrolling");
		await delay(500);
		// theScreen.style.opacity = "0";
		theScreen.style.display = "none";
	};
});

// Send Msg

let sendBtn = document.querySelector(
	".chat-screen .write-messeges form button"
);

sendBtn.onclick = (e) => {
	e.preventDefault();
	let input = document.querySelector(".chat-screen .write-messeges textarea");
	sendMessege(input.value);
	input.value = "";
};
document
	.querySelector(".write-messeges textarea")
	.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			let input = document.querySelector(
				".chat-screen .write-messeges textarea"
			);
			sendMessege(input.value);
			input.value = "";
		}
	});

// Disable Enter Btn on All Text Area
document.querySelectorAll("textarea").forEach((txtArea) => {
	txtArea.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	});
});

let fileChooser = document.querySelector(
	".import-and-export-settings-screen input[type='file']"
);
let jsonContent;
fileChooser.addEventListener("change", (event) => {
	const file = event.target.files[0]; // Get the selected file
	if (!file) return;

	const reader = new FileReader();

	// Read the file as text
	reader.readAsText(file);

	// Handle the result when reading completes
	reader.onload = (e) => {
		const content = e.target.result;
		jsonContent = content;
		console.log(jsonContent);
	};

	// Handle errors
	reader.onerror = (e) => {
		console.error("Error reading file:", e.target.error);
	};
});

let UploadSettingsButton = document.querySelector(
	".import-and-export-settings-screen .upload-btn"
);
UploadSettingsButton.onclick = (ev) => {
	ev.preventDefault();
	UploadSettingsButton.nextElementSibling.click();
};

let exportSettingsButton = document.querySelector(
	".import-and-export-settings-screen .export-btn"
);
exportSettingsButton.onclick = (ev) => {
	ev.preventDefault();
	fetch("assets/json/config.json")
		.then((result) => {
			return result.json();
		})
		.then((jsonFileToExport) => {
			let link = document.createElement("a");
			let newFile = new Blob([JSON.stringify(jsonFileToExport, null, 2)], {
				type: "application/json",
			});
			link.href = URL.createObjectURL(newFile);
			link.download = "config.json";
			link.click();
			URL.revokeObjectURL(link.href);
			link.remove();
		});
};

// Number Chooser: Minimum Limit and Decrement And Increment Function
document
	.querySelectorAll(".number-chooser > span:last-of-type")
	.forEach((ele) => {
		ele.children[0].onclick = (ev) => {
			ele.children[1].textContent++;
		};
		ele.children[2].onclick = (ev) => {
			if (ele.children[1].textContent <= +ele.children[1].dataset.min) {
				return;
			} else {
				ele.children[1].textContent--;
			}
		};
	});

// Setup Popups
let popupOpeners = document.querySelectorAll("li.popup > div:first-child");
popupOpeners.forEach((popupOpener) => {
	popupOpener.onclick = async () => {
		let popupWin = popupOpener.nextElementSibling;
		let overley = popupWin.nextElementSibling;
		popupWin.style.display = "block";
		overley.style.display = "block";
		await delay(0);
		popupWin.style.opacity = "1";
		overley.style.opacity = "1";
		popupWin.style.transform = "translate(-50%, -50%) scale(1)";
		popupWin.querySelector(" .popup-header .close ").onclick = async () => {
			popupWin.style.opacity = "0";
			overley.style.opacity = "0";
			popupWin.style.transform = "translate(-50%, -50%) scale(0)";
			await delay(300);
			// console.log("waited");
			popupWin.style.display = "none";
			overley.style.display = "none";
		};
		overley.onclick = async () => {
			popupWin.style.opacity = "0";
			overley.style.opacity = "0";
			popupWin.style.transform = "translate(-50%, -50%) scale(0)";
			await delay(300);
			popupWin.style.display = "none";
			overley.style.display = "none";
		};
	};
});

// Initialize from URL on page load
document.addEventListener("DOMContentLoaded", function () {
	initializeFromURL();
});
