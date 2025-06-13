import * as vars from "./vars.js";

// Wait function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// Send Msg Function
function sendMessage(msg) {
	let msgsBox = document.querySelector(".chat-screen .messages");
	let newMsg = document.createElement("p");
	newMsg.textContent = `ServerName : ${msg}`;
	msgsBox.appendChild(newMsg);
	newMsg.scrollIntoView({ behavior: "smooth" });
}
// Change Theme Function
function theme(themeName = "dark") {
	if (themeName === "dark") {
		document.body.classList.add("dark-mode");
	} else if (themeName === "light") {
		document.body.classList.remove("dark-mode");
	} else {
		console.error(`No Theme Called ${themeName}`);
	}
}

// Update URL without page reload
function updateURL(screenClass) {
	// Get the screen name from class (remove '-screen' suffix)
	const screenName = screenClass.replace("-screen", "");

	// Create a state object
	const stateObj = { screen: screenName };

	// Change the URL without reloading the page
	history.pushState(stateObj, "", `${window.location.pathname}#${screenName}`);
}

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
	if (window.location.hash !== "") {
		try {
			let screenClassNameToNav = `${window.location.hash
				.match(/[^#]/gim)
				.join("")}-screen`;
			history.pushState({ screen: "" }, "", `${window.location.pathname}`);

			navigateToScreen(screenClassNameToNav);
		} catch (error) {
			console.log("Error " + error);
		}
	}
}

function loadSettings() {
	const config = JSON.parse(localStorage.getItem("config")) || {};
	const elements = vars.elesToSaveData;

	elements.forEach((ele) => {
		const element = document.querySelector(ele.id);
		if (!element) return;

		const value = ele.settingIds.reduce((obj, key) => obj?.[key], config);
		switch (ele.type) {
			case "input":
				element.value = value || "";
				break;
			case "switch":
				element.checked = Boolean(value);
				break;
			case "number-chooser":
				element.textContent = value || "";
				break;
			case "color-selector":
				element.value = value || "";
				break;
		}
	});
}

function storeElesValues() {
	const elements = vars.elesToSaveData;
	const config = JSON.parse(localStorage.getItem("config")) || {};

	elements.forEach((ele) => {
		const el = document.querySelector(ele.id);
		if (!el) return;

		const eventType =
			ele.type === "input"
				? "input"
				: "checkbox"
				? "click"
				: "color-selector"
				? "input"
				: "";
		if (ele.type === "color-selector") {
			el.oninput = (ev) => {
				let value = ev.target.value;
				let current = config;
				for (let i = 0; i < ele.settingIds.length - 1; i++) {
					const key = ele.settingIds[i];
					current[key] = current[key] || {};
					current = current[key];
				}
				current[ele.settingIds[ele.settingIds.length - 1]] = value;

				localStorage.setItem("config", JSON.stringify(config));
			};
		} else {
			el.addEventListener(eventType, (ev) => {
				let value;
				if (ele.type === "input") value = ev.target.value;
				if (ele.type === "switch") value = ev.target.checked;
				if (ele.type === "number-chooser")
					value = parseInt(ev.target.textContent);
				if (ele.type === "color-selector") value = ev.target.value;

				// Update config using nested property assignment
				let current = config;
				for (let i = 0; i < ele.settingIds.length - 1; i++) {
					const key = ele.settingIds[i];
					current[key] = current[key] || {};
					current = current[key];
				}
				current[ele.settingIds[ele.settingIds.length - 1]] = value;

				localStorage.setItem("config", JSON.stringify(config));
			});
		}
	});
}
export {
	loadSettings,
	initializeFromURL,
	delay,
	navigateToScreen,
	updateURL,
	theme,
	sendMessage,
	storeElesValues,
};
