import * as functions from "./lib/functions.js";
import * as vars from "./lib/vars.js";

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
	if (event.state && event.state.screen) {
		functions.navigateToScreen(event.state.screen + "-screen");
	} else {
		// Default to home if no state is available
		document.querySelectorAll(".screen").forEach(async (screen) => {
			screen.style.left = "100dvw";
			document.body.classList.remove("disable-scrolling");
			await functions.delay(350);
			screen.style.display = "none";
		});
		document.body.classList.remove("disable-scrolling");
	}
});

if (!localStorage.getItem("config")) {
	fetch("./assets/json/config.jsonc")
		.then((res, rej) => res.json())
		.then((result) => {
			localStorage.setItem("config", JSON.stringify(result));
			functions.loadSettings();
		});
} else {
	functions.loadSettings();
}

let config = JSON.parse(localStorage.getItem("config"));

// if (localStorage.getItem("theme")) {
// 	functions.theme(localStorage.getItem("theme"));
// 	document.getElementById("dark-mode").checked =
// 		localStorage.getItem("theme") === "dark" ? true : false;
// } else {
// 	functions.theme("dark");
// 	localStorage.setItem("theme", "dark");
// 	document.getElementById("dark-mode").checked = true;
// }
// Initialize from URL on page load
window.onload = function () {
	functions.initializeFromURL();
};

// Reset Button Function
document
	.querySelectorAll("button")
	.forEach((btn) => (btn.onclick = (ev) => ev.preventDefault()));

// Login Screen And Auto Login Logic
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
		let password = loginScreen.querySelector("#login-password");
		if (password.value === "VortexAndHonor") {
			document.body.classList.remove("disable-scrolling");
			loginScreen.style.opacity = "0";
			await functions.delay(350);
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
		functions.navigateToScreen(`${li.classList[0]}-screen`);
	};
});

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	let header = theScreen.querySelector(".header");
	header.querySelector(".back").onclick = async () => {
		history.back();
		// history.pushState({screen:""},"",`${window.location.pathname}`)
		theScreen.style.left = "100dvw";
		document.body.classList.remove("disable-scrolling");
		await functions.delay(350);
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
	functions.sendMessage(input.value);
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
			functions.sendMessage(input.value);
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
fileChooser.addEventListener("change", (event) => {
	const file = event.target.files[0]; // Get the selected file
	if (!file) return;

	const reader = new FileReader();

	// Read the file as text
	reader.readAsText(file);

	// Handle the result when reading completes
	reader.onload = (e) => {
		localStorage.setItem("config", e.target.result);
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

	let link = document.createElement("a");
	let newFile = new Blob(
		[JSON.stringify(JSON.parse(localStorage.getItem("config")), null, 2)],
		{
			type: "application/json",
		}
	);
	link.href = URL.createObjectURL(newFile);
	link.download = "config.jsonc";
	link.click();
	URL.revokeObjectURL(link.href);
	link.remove();
};

// Number Chooser: Minimum Limit and Decrement And Increment Function
document
	.querySelectorAll(".number-chooser > span:last-of-type")
	.forEach((ele) => {
		ele.children[0].onclick = (ev) => {
			ele.children[1].textContent++;
			ele.children[1].click();
		};
		ele.children[2].onclick = (ev) => {
			if (ele.children[1].textContent <= +ele.children[1].dataset.min) {
				return;
			} else {
				ele.children[1].textContent--;
				ele.children[1].click();
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
		await functions.delay(0);
		popupWin.style.opacity = "1";
		overley.style.opacity = "1";
		popupWin.style.transform = "translate(-50%, -50%) scale(1)";
		popupWin.querySelector(" .close ").onclick = async () => {
			popupWin.style.opacity = "0";
			overley.style.opacity = "0";
			popupWin.style.transform = "translate(-50%, -50%) scale(0)";
			await functions.delay(350);
			popupWin.style.display = "none";
			overley.style.display = "none";
		};
		overley.onclick = async () => {
			popupWin.style.opacity = "0";
			overley.style.opacity = "0";
			popupWin.style.transform = "translate(-50%, -50%) scale(0)";
			await functions.delay(350);
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
			element.previousElementSibling.click();
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

// Players Management And OverView Listing From Json File
fetch("assets/json/players.jsonc")
	.then((res, rej) => res.json())
	.then((result) => {
		let overviewTableBody = document.querySelector(
			".overview-screen table tbody"
		);
		overviewTableBody.innerHTML = "";
		for (let i = 0; i < result.length; i++) {
			let row = result[i];
			let tableRow = document.createElement("tr");
			tableRow.innerHTML = `
			<tr>
				<td>${row.rank}.</td>
				<td>${row.name}</td>
				<td>${row.kills}</td>
				<td>${row.score}</td>
			</tr>
			`;
			overviewTableBody.appendChild(tableRow);
		}
		// Player Management Screen
		let plTableBody = document.querySelector(
			".player-management-screen table tbody"
		);
		plTableBody.innerHTML = "";
		for (let i = 0; i < result.length; i++) {
			let row = result[i];
			let tableRow = document.createElement("tr");
			tableRow.innerHTML = `
				<tr>
					<td>${row.rank}.</td>
					<td>${row.name}</td>
					<td>${row.kills}</td>
					<td>${row.score}</td>
					<td>
						<button class="circle open-menu">
							<i class="fa-solid fa-ellipsis-vertical"></i>
						</button>
						<div class="menu">
							<button>Mute</button>
							<button>Ban</button>
						</div>
					</td>
				</tr>
			`;
			plTableBody.appendChild(tableRow);
		}
		// Open Menu On Players Management
		document
			.querySelectorAll(".player-management-screen .open-menu")
			.forEach((element) => {
				element.onclick = async (ev) => {
					ev.preventDefault();
					ev.stopPropagation();
					const menu = element.nextElementSibling;
					// Close other menus
					document
						.querySelectorAll(".player-management-screen .menu")
						.forEach(async (otherMenu) => {
							if (otherMenu !== menu) {
								menu.style.opacity = "0";
								await functions.delay(350);
								otherMenu.classList.remove("opened");
							}
						});

					if (menu.classList.contains("opened")) {
						menu.style.opacity = "0";
						await functions.delay(350);
						menu.classList.remove("opened");
					} else {
						menu.classList.add("opened");
						await functions.delay(0);
						menu.style.opacity = "1";
					}
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
					.forEach(async (menu) => {
						menu.style.opacity = "0";
						await functions.delay(350);
						menu.classList.remove("opened");
					});
			}
		});

		document.querySelectorAll("tbody .menu button").forEach((element) => {
			element.onclick = async (ev) => {
				ev.preventDefault();
				let popup = document.createElement("div");
				popup.className = "popup-window";
				popup.innerHTML = `
	<div class="popup-header">
			<h5>Alert</h5>
	</div>
	<div class="body">
		<span class="text-center w-100 d-block">${
			element.parentElement.parentElement.parentElement.children[1].textContent
		} Was ${
					element.textContent === "Mute"
						? "Muted"
						: element.textContent === "UnMute"
						? "UnMuted"
						: element.textContent === "Ban"
						? "Banned"
						: element.textContent === "UnBan"
						? "UnBanned"
						: "Nothing"
				}</span>
		<button class="mt-2 close text-center w-100 d-block">Close</button>
	</div>
	`;
				element.textContent =
					element.textContent === "Mute"
						? "UnMute"
						: element.textContent === "UnMute"
						? "Mute"
						: element.textContent === "Ban"
						? "UnBan"
						: element.textContent === "UnBan"
						? "Ban"
						: "Nothing";
				let overley = document.createElement("div");
				overley.className = "overley";
				document.body.append(popup, overley);

				popup.style.display = "flex";
				overley.style.display = "block";
				await functions.delay(0);
				popup.style.opacity = "1";
				overley.style.opacity = "1";
				popup.style.transform = "translate(-50%, -50%) scale(1)";
				popup.querySelector(" .close ").onclick = async () => {
					popup.style.opacity = "0";
					overley.style.opacity = "0";
					popup.style.transform = "translate(-50%, -50%) scale(0)";
					await functions.delay(350);
					popup.style.display = "none";
					overley.style.display = "none";
					overley.remove();
					popup.remove();
				};
				overley.onclick = async () => {
					popup.style.opacity = "0";
					overley.style.opacity = "0";
					popup.style.transform = "translate(-50%, -50%) scale(0)";
					await functions.delay(350);
					popup.style.display = "none";
					overley.style.display = "none";
					overley.remove();
					popup.remove();
				};
			};
		});
	});
// Change Theme Logic
document.getElementById("dark-mode").onclick = (ev) => {
	if (ev.target.checked) {
		// Dark Mode
		functions.theme("dark");
		localStorage.setItem("theme", "dark");
	} else {
		// Light Mode
		functions.theme("light");
		localStorage.setItem("theme", "light");
	}
};

// Reset Settings Logic

document.querySelector(".reset-btn").onclick = async (ev) => {
	ev.preventDefault();
	let popup = document.createElement("div");
	popup.className = "popup-window";
	popup.innerHTML = `
	<div class="popup-header">
		<h4>WARNING</h4>
	</div>
	<div class="body">
		<span class="text-center w-100 d-block">Are You Sure To Reset Your Server Settings ?</span>
		<p class="text-center w-100"><b>You Will Lost Your Settings If You Pressed Reset Button</b></p>
		<button class="mt-2 close text-center w-100 d-block">Cancel</button>
		<button class="mt-2 reset text-center w-100 d-block reset-btn bg-red">Reset</button>
	</div>
  `;
	let resetBtn = popup.querySelector(".reset");
	let overley = document.createElement("div");
	overley.className = "overley";

	document.body.append(popup, overley);

	popup.style.display = "flex";
	overley.style.display = "block";
	await functions.delay(0);
	popup.style.opacity = "1";
	overley.style.opacity = "1";
	popup.style.transform = "translate(-50%, -50%) scale(1)";
	popup.querySelector(" .close ").onclick = async () => {
		popup.style.opacity = "0";
		overley.style.opacity = "0";
		popup.style.transform = "translate(-50%, -50%) scale(0)";
		await functions.delay(350);
		popup.style.display = "none";
		overley.style.display = "none";
		overley.remove();
		popup.remove();
	};

	overley.onclick = async () => {
		popup.style.opacity = "0";
		overley.style.opacity = "0";
		popup.style.transform = "translate(-50%, -50%) scale(0)";
		await functions.delay(350);
		popup.style.display = "none";
		overley.style.display = "none";
		overley.remove();
		popup.remove();
	};

	resetBtn.onclick = async (ev) => {
		fetch("./assets/json/config.jsonc")
			.then(
				(res) => res.json(),
				(rej) => console.error(`Error When Get The Config ${rej}`)
			)
			.then((result) => localStorage.setItem("config", JSON.stringify(result)));
		popup.style.opacity = "0";
		overley.style.opacity = "0";
		popup.style.transform = "translate(-50%, -50%) scale(0)";
		await functions.delay(350);
		popup.style.display = "none";
		overley.style.display = "none";
		overley.remove();
		popup.remove();
	};
};

functions.storeElesValues();


