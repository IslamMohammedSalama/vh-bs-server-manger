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

// Update URL without page reload
function updateURL(screenClass) {
	// Get the screen name from class (remove '-screen' suffix)
	const screenName = screenClass.replace("-screen", "");

	// Create a state object
	const stateObj = { screen: screenName };

	// Change the URL without reloading the page
	history.pushState(stateObj, "", `${window.location.pathname}#${screenName}`);
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
// Initialize from URL on page load
document.addEventListener("DOMContentLoaded", function () {
	initializeFromURL();
});

// Reset Button Function
document
	.querySelectorAll("button")
	.forEach((btn) => (btn.onclick = (ev) => ev.preventDefault()));

// Auto Login
if (localStorage.getItem("password") === "VortexAndHonor") {
	document.body.classList.remove("disable-scrolling");
} else {
	document.body.className = "disable-scrolling";
	let loginScreen = document.createElement("div");
	loginScreen.className = "login-screen";
	loginScreen.id = "login-screen";
	loginScreen.style.opacity = "1";
	loginScreen.innerHTML = `
	<div class="popup-window">
		<div class="popup-header"><h5>Login</h5></div>
		<div class="body">
			<form action">
				<label class="password-form d-flex align-items-center flex-column"
					><span class="me-auto">Enter Your Password:</span>
					<div class="d-flex w-100 mt-1">
						<input
							class="me-1 d-block w-100"
							id="login-password"
							type="password"
							name="login-password"
							placeholder="Password"
						/>
						<button class="show-or-hide circle">
						<i class="fa-solid fa-eye"></i>
						</button>
						</div>
						<div class="wrong-password-text"> Wrong Password</div>
						<button class="login w-100">Login</button></label
						>
						</form>
		</div>
	</div>
	<div class="overley"></div>
	`;
	document.body.children[0].before(loginScreen);
	loginScreen.querySelector(
		"#login-screen > div.popup-window > div.body > form > label > button.login"
	).onclick = async (ev) => {
		ev.preventDefault();
		// console.log("hi");
		let password = loginScreen.querySelector("#login-password");
		console.log(password.value);
		if (password.value === "VortexAndHonor") {
			document.body.classList.remove("disable-scrolling");
			loginScreen.style.opacity = "0";
			await delay(350);
			loginScreen.remove();
			localStorage.setItem("password", "VortexAndHonor");
		} else {
			loginScreen.querySelector(".wrong-password-text").style.opacity = "1";
		}
	};
}

// Navigate To Screens
let navs = document.querySelectorAll(
	"body > .container > ul > li:not(.discord)"
);
navs.forEach((li) => {
	li.onclick = async () => {
		let tScreen = document.querySelector(`.${li.classList[0]}-screen`);
		// tScreen.style.opacity = "1";
		tScreen.style.display = "block";
		await delay(0);
		tScreen.style.left = "0";
		document.body.classList.add("disable-scrolling");
		updateURL(li.classList[0]);
	};
});

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	let header = theScreen.querySelector(".header");
	header.querySelector(".back").onclick = async () => {
		history.replaceState("", "", `${window.location.pathname}`);
		theScreen.style.left = "100dvw";
		document.body.classList.remove("disable-scrolling");
		await delay(350);
		// theScreen.style.opacity = "0";
		theScreen.style.display = "none";
	};
	if (header.children[2]) {
		try {
			header.querySelector(".add").onclick = (ev) => {
				let newPlayerIndex =
					theScreen.querySelector(".container").children.length + 1;
				let newPlayer = theScreen
					.querySelector(".container ul:last-child")
					.cloneNode();
				newPlayer.innerHTML = theScreen.classList.contains(
					"effects-and-tag-management-screen"
				)
					? `
								<ul>
					<li><span>Player Number ${newPlayerIndex} :</span></li>
					<li>
						<label class="form">
							<span>Player pb </span
							><textarea
								class="player-${newPlayerIndex}-pb"
								id="player-${newPlayerIndex}-pb-effect"
								placeholder="Enter Player pb"
							></textarea>
						</label>
					</li>
					<li>
						<label class="form"
							><span>Player Tag Name</span
							><textarea
								class="player-${newPlayerIndex}-tag"
								id="player-${newPlayerIndex}-tag"
								placeholder="Enter Player Tag"
							></textarea>
						</label>
					</li>
					<li>
						<label class="form"
							><span>Player Effect Name</span
							><textarea
								class="player-${newPlayerIndex}-effect"
								id="player-${newPlayerIndex}-effect"
								placeholder="Enter Player Effect"
							></textarea>
						</label>
					</li>
				</ul>
				`
					: theScreen.classList.contains("rules-management-screen")
					? `
						<ul>
			<li><span>Player Number ${newPlayerIndex} :</span></li>
			<li>
				<label class="form">
					<span>Player pb </span
					><textarea
						class="player-${newPlayerIndex}-pb"
						id="player-${newPlayerIndex}-pb-rules"
						placeholder="Enter Player pb"
					></textarea>
				</label>
			</li>
			<li>
				<label class="form"
					><span>Rule Name</span
					><textarea
						class="player-${newPlayerIndex}-rule-name"
						id="player-${newPlayerIndex}-rule-name"
						placeholder="Enter Player Effect"
					></textarea>
				</label>
			</li>
		</ul>

				`
					: null;
				theScreen.querySelector(".container").appendChild(newPlayer);
			};
		} catch (error) {}
	}
});

// Send Msg

let sendBtn = document.querySelector(
	".chat-screen .write-messages form button"
);

sendBtn.onclick = (e) => {
	e.preventDefault();
	let input = document.querySelector(".chat-screen .write-messages textarea");
	sendMessage(input.value);
	input.value = "";
	input.focus();
};
document
	.querySelector(".write-messages textarea")
	.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			let input = document.querySelector(
				".chat-screen .write-messages textarea"
			);
			sendMessage(input.value);
			input.value = "";
			input.focus();
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
let popupOpeners = document.querySelectorAll("li.popup > button");
popupOpeners.forEach((popupOpener) => {
	popupOpener.onclick = async () => {
		let popupWin = popupOpener.nextElementSibling;
		let overley = popupWin.nextElementSibling;
		popupWin.style.display = "flex";
		overley.style.display = "block";
		await delay(0);
		popupWin.style.opacity = "1";
		overley.style.opacity = "1";
		popupWin.style.transform = "translate(-50%, -50%) scale(1)";
		popupWin.querySelector(" .close ").onclick = async () => {
			popupWin.style.opacity = "0";
			overley.style.opacity = "0";
			popupWin.style.transform = "translate(-50%, -50%) scale(0)";
			await delay(350);
			popupWin.style.display = "none";
			overley.style.display = "none";
		};
		overley.onclick = async () => {
			popupWin.style.opacity = "0";
			overley.style.opacity = "0";
			popupWin.style.transform = "translate(-50%, -50%) scale(0)";
			await delay(350);
			popupWin.style.display = "none";
			overley.style.display = "none";
		};
	};
});

// Show/Hide Password Logic
let showAndHidePassword = document.querySelector(".show-or-hide");
showAndHidePassword.onclick = (ev) => {
	ev.preventDefault();
	if (showAndHidePassword.previousElementSibling.type === "password") {
		showAndHidePassword.previousElementSibling.type = "text";
		showAndHidePassword.innerHTML = `<i class="fa-solid fa-eye-slash"> </i>`;
		// showAndHidePassword.children[0].classList.replace();
	} else if (showAndHidePassword.previousElementSibling.type === "text") {
		showAndHidePassword.previousElementSibling.type = "password";
		showAndHidePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
	}
};
// Toggle Switch Logic
document.querySelectorAll(".toggle-switch").forEach(
	(element) =>
		(element.onclick = function (ev) {
			ev.preventDefault();
			element.previousElementSibling.checked =
				!element.previousElementSibling.checked;
		})
);

// Toggle Radio Box Logic

document.querySelectorAll(".toggle-radio-box").forEach((element) => {
	element.previousElementSibling.onchange = () => {
		document.querySelectorAll(".toggle-radio-box").forEach((ele) => {
			ele.previousElementSibling.checked = false;
		});
		element.previousElementSibling.checked = true;
	};
	element.onclick = function (ev) {
		ev.preventDefault();
		document.querySelectorAll(".toggle-radio-box").forEach((ele) => {
			ele.previousElementSibling.checked = false;
		});
		element.previousElementSibling.checked = true;
	};
});

// Open Menu On Players Management
document
	.querySelectorAll(".player-management-screen .open-menu")
	.forEach((element) => {
		element.onclick = (ev) => {
			ev.preventDefault();
			ev.stopPropagation();
			const menu = element.nextElementSibling;

			// Close other menus
			document
				.querySelectorAll(".player-management-screen .menu")
				.forEach((otherMenu) => {
					if (otherMenu !== menu) otherMenu.classList.remove("opened");
				});

			// Toggle current menu
			menu.classList.toggle("opened");
		};
	});

// Close menus when clicking outside or on menu items
document.addEventListener("click", (ev) => {
	const isMenuButton = ev.target.closest(".open-menu");
	const isMenuOption = ev.target.closest(".menu button");
	const isInsideMenu = ev.target.closest(".menu");

	if (isMenuOption) {
		// Close the parent menu when clicking any menu button
		const menu = ev.target.closest(".menu");
		menu.classList.remove("opened");
	} else if (!isMenuButton && !isInsideMenu) {
		// Close all menus when clicking outside
		document
			.querySelectorAll(".player-management-screen .menu")
			.forEach((menu) => {
				menu.classList.remove("opened");
			});
	}
});

let menuBtns = document.querySelectorAll("tbody .menu button");
menuBtns.forEach((element) => {
	element.onclick = async (ev) => {
		ev.preventDefault();
		let btnContent = element.textContent;
		let popup = document.createElement("div");
		popup.className = "popup-window";
		popup.innerHTML = `
    <div class="popup-header">
        <h5>Alert</h5>
    </div>
    <div class="body">
			<span class="text-center w-100 d-block">The ${btnContent} Operation Was Successful</span>
			<button class="mt-2 close text-center w-100 d-block">Close</button>
			</div>
		</div>
		`;
		let overley = document.createElement("div");
		overley.className = "overley";
		document.body.append(popup, overley);

		popup.style.display = "flex";
		overley.style.display = "block";
		await delay(0);
		popup.style.opacity = "1";
		overley.style.opacity = "1";
		popup.style.transform = "translate(-50%, -50%) scale(1)";
		popup.querySelector(" .close ").onclick = async () => {
			popup.style.opacity = "0";
			overley.style.opacity = "0";
			popup.style.transform = "translate(-50%, -50%) scale(0)";
			await delay(350);
			popup.style.display = "none";
			overley.style.display = "none";
			overley.remove();
			popup.remove();
		};
		overley.onclick = async () => {
			popup.style.opacity = "0";
			overley.style.opacity = "0";
			popup.style.transform = "translate(-50%, -50%) scale(0)";
			await delay(350);
			popup.style.display = "none";
			overley.style.display = "none";
			overley.remove();
			popup.remove();
		};
	};
});
