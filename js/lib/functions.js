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
		document.documentElement.style.setProperty(
			"--main-background-color",
			"#222"
		);
		document.documentElement.style.setProperty("--main-text-color", "white");
		document.documentElement.style.setProperty("--color-0", "#222");
		document.documentElement.style.setProperty("--color-1", "#333");
		document.documentElement.style.setProperty("--color-2", "#444");
		document.documentElement.style.setProperty("--color-3", "#454545");
		document.documentElement.style.setProperty("--color-4", "#4e4e4e");
		document.documentElement.style.setProperty("--color-5", "#555");
		document.documentElement.style.setProperty("--color-6", "#666");
		document.documentElement.style.setProperty("--color-7", "#777");
		document.documentElement.style.setProperty("--color-8", "#717171");
		document.documentElement.style.setProperty(
			"--main-placeholder-color",
			"#ccc"
		);
		document.documentElement.style.setProperty(
			"--main-input-text-color",
			"white"
		);
	} else if (themeName === "light") {
		document.documentElement.style.setProperty(
			"--main-background-color",
			"#fff"
		);
		document.documentElement.style.setProperty("--main-text-color", "black");
		document.documentElement.style.setProperty("--color-0", "#fff");
		document.documentElement.style.setProperty("--color-1", "#eee");
		document.documentElement.style.setProperty("--color-2", "#e5e5e5");
		document.documentElement.style.setProperty("--color-3", "#eee");
		document.documentElement.style.setProperty("--color-4", "#ddd");
		document.documentElement.style.setProperty("--color-5", "#d5d5d5");
		document.documentElement.style.setProperty("--color-6", "#ccc");
		document.documentElement.style.setProperty("--color-7", "#bbb");
		document.documentElement.style.setProperty("--color-8", "#aaa");
		document.documentElement.style.setProperty(
			"--main-placeholder-color",
			"#555"
		);
		document.documentElement.style.setProperty(
			"--main-input-text-color",
			"#222"
		);
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
	let config = JSON.parse(localStorage.getItem("config"));
	let elesToSaveThemData = vars.elesToSaveData;

	elesToSaveThemData.forEach((ele) => {
		if (ele.type === "input") {
			document.querySelector(ele.id).value =
				ele.settingIds.length === 1
					? config[ele.settingIds[0]]
					: ele.settingIds.length === 2
					? config[ele.settingIds[0]][ele.settingIds[1]]
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]]
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ]
					: ele.settingIds.length === 5
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ][ele.settingIds[4]]
					: null;
		} else if (ele.type === "switch") {
			document.querySelector(ele.id).checked =
				ele.settingIds.length === 1
					? config[ele.settingIds[0]]
					: ele.settingIds.length === 2
					? config[ele.settingIds[0]][ele.settingIds[1]]
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]]
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ]
					: ele.settingIds.length === 5
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ][ele.settingIds[4]]
					: null;
		}else if (ele.type === "number-chooser") {
			document.querySelector(ele.id).textContent =
				ele.settingIds.length === 1
					? config[ele.settingIds[0]]
					: ele.settingIds.length === 2
					? config[ele.settingIds[0]][ele.settingIds[1]]
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]]
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ]
					: ele.settingIds.length === 5
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ][ele.settingIds[4]]
					: null;
		}
	});
}

function storeElesValues() {
	let config = JSON.parse(localStorage.getItem("config"));
	let elesToSaveThemData = vars.elesToSaveData;

	elesToSaveThemData.forEach((ele) => {
		if (ele.type === "input") {
			document.querySelector(ele.id).onblur = (ev) => {
				ele.settingIds.length === 1
					? (config[ele.settingIds[0]] = ev.target.value)
					: ele.settingIds.length === 2
					? (config[ele.settingIds[0]][ele.settingIds[1]] = ev.target.value)
					: ele.settingIds.length === 3
					? (config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]] =
							ev.target.value)
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							(ele.settingIds[3] = ev.target.value)
					  ]
					: ele.settingIds.length === 5
					? (config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ][ele.settingIds[4]] = ev.target.value)
					: null;
				localStorage.setItem("config", JSON.stringify(config));
			};
		} else if (ele.type === "switch") {
			document.querySelector(ele.id).onclick = (ev) => {
				ele.settingIds.length === 1
					? (config[ele.settingIds[0]] = ev.target.checked)
					: ele.settingIds.length === 2
					? (config[ele.settingIds[0]][ele.settingIds[1]] = ev.target.checked)
					: ele.settingIds.length === 3
					? (config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]] =
							ev.target.checked)
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							(ele.settingIds[3] = ev.target.checked)
					  ]
					: ele.settingIds.length === 5
					? (config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ][ele.settingIds[4]] = ev.target.checked)
					: null;
				localStorage.setItem("config", JSON.stringify(config));
			};
		}else if (ele.type === "number-chooser") {
			document.querySelector(ele.id).onclick = (ev) => {
				ele.settingIds.length === 1
					? (config[ele.settingIds[0]] = parseInt(ev.target.textContent))
					: ele.settingIds.length === 2
					? (config[ele.settingIds[0]][ele.settingIds[1]] = parseInt(ev.target.textContent))
					: ele.settingIds.length === 3
					? (config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]] =
							parseInt(ev.target.textContent))
					: ele.settingIds.length === 3
					? config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							(ele.settingIds[3] = parseInt(ev.target.textContent))
					  ]
					: ele.settingIds.length === 5
					? (config[ele.settingIds[0]][ele.settingIds[1]][ele.settingIds[2]][
							ele.settingIds[3]
					  ][ele.settingIds[4]] = parseInt(ev.target.textContent))
					: null;
				localStorage.setItem("config", JSON.stringify(config));
			};
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


