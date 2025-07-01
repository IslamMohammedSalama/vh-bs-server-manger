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
	await delay(0);
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
			console.error("Error " + error);
		}
	}
}

// Load Settings Function
function loadSettings() {
	const config = JSON.parse(localStorage.getItem("config")) || {};
	const elements = vars.elesToSaveData;
	const radioEles = vars.radioElesToSaveData;
	radioEles.forEach((ele) => {
		document
			.querySelectorAll(`[data-group="${ele.group}"]`)
			.forEach((radEle) => (radEle.checked = false));
		const value = ele.settingIds.reduce((obj, key) => obj?.[key], config);
		let el = document.querySelector(`[${ele.elesSelector}=${value}]`);
		el.checked = true;
	});

	elements.forEach((ele) => {
		const element = document.querySelector(ele.id);
		if (!element) return;
		const value = ele.settingIds.reduce((obj, key) => obj[key], config);
		switch (ele.type) {
			case "input":
				element.value = value;
				break;
			case "switch":
				element.checked = Boolean(value);
				break;
			case "number-chooser":
				element.textContent = value;
				break;
			case "time-chooser":
				element.value = value;
				break;
			case "color-chooser":
				element.value = value;
				break;
		}
	});
}

function loadRoles() {
	let rolesPath = ["players-roles"];
	const config = JSON.parse(localStorage.getItem("config"));
	const players = rolesPath.reduce((obj, key) => obj[key], config);
	document.querySelector("#roles-management > div.container.body").innerHTML =
		"";
	for (let index = 0; index < players.length; index++) {
		let numberOfPlayer = index + 1;
		let player = players[index];
		let newPlayerEle = document.createElement("ul");
		newPlayerEle.innerHTML = `
				<li>
					<div>
						<span>Player Number ${numberOfPlayer} :</span>
							<button class="circle remove"><i class="fa-solid fa-minus"></i></button>
					</div>
				</li>
				<li>
					<label class="form">
						<span>Player pb </span
						><textarea
							class="player-${numberOfPlayer}-pb"
							id="player-${numberOfPlayer}-pb-roles"
							placeholder="Enter Player pb"
						>${player.id}</textarea>
					</label>
				</li>
				<li class="popup">
					<span>Role: </span
					><button class="select-combobox"><span>Owner</span></button>
					<div class="popup-window">
						<div class="popup-header">
							<h5>Role Chooser</h5>
							<button class="close circle">
								<i class="fa fa-close"></i> 
							</button>
						</div>
						<div class="body mt-2">
							<form>
								<ul>
									<li>
										<label class="radio-box"
											><span>Owner</span
											><span
												><input
													class="toggle-radio role "
													id="owner-role-${numberOfPlayer}"
													type="radio"
													name="owner-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="owner"
													/><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Co-Owner</span
											><span
												><input
													class="toggle-radio role"
													id="co-owner-role-${numberOfPlayer}"
													type="radio"
													name="co-owner-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="co-owner" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Lead Staff</span
											><span
												><input
													class="toggle-radio role "
													id="lead-staff-role-${numberOfPlayer}"
													type="radio"
													name="lead-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="lead-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Moderator</span
											><span
												><input
													class="toggle-radio role"
													id="moderator-role-${numberOfPlayer}"
													type="radio"
													name="moderator-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="moderator" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Trial Moderator</span
											><span
												><input
													class="toggle-radio role"
													id="trial-moderator-role-${numberOfPlayer}"
													type="radio"
													name="trial-moderator-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="trial-moderator" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Senior Complain Staff</span
											><span
												><input
													class="toggle-radio role "
													id="senior-complain-staff-role-${numberOfPlayer}"
													type="radio"
													name="senior-complain-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="senior-complain-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Complain Staff</span
											><span
												><input
													class="toggle-radio role"
													id="complain-staff-role-${numberOfPlayer}"
													type="radio"
													name="complain-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="complain-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Trial Complain Staff</span
											><span
												><input
													class="toggle-radio role "
													id="trial-complain-staff-role-${numberOfPlayer}"
													type="radio"
													name="trial-complain-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="trial-complain-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Admin</span
											><span
												><input
													class="toggle-radio role "
													id="admin-role-${numberOfPlayer}"
													type="radio"
													name="admin-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="admin" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>VIP</span
											><span
												><input
													class="toggle-radio role "
													id="vip-role-${numberOfPlayer}"
													type="radio"
													name="vip-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="vip" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
								</ul>
							</form>
						</div>
					</div>
					<div class="overley"></div>
				</li>
		`;
		document
			.querySelector("#roles-management > div.container.body")
			.append(newPlayerEle);
		newPlayerEle
			.querySelectorAll("input[type='radio']")
			.forEach((ele) => (ele.checked = false));
		newPlayerEle.querySelectorAll(".select-combobox").forEach((combobox) => {
			let popupWin = combobox.nextElementSibling;
			popupWin.querySelectorAll("label.radio-box").forEach(
				(label) =>
					(label.querySelector(".toggle-radio").onclick = () => {
						combobox.children[0].textContent = label.children[0].textContent;
					})
			);
		});
		if (newPlayerEle.querySelector(`input[data-role="${player.role}"]`)) {
			newPlayerEle.querySelector(`input[data-role="${player.role}"]`).click();
		} else {
			newPlayerEle.querySelector(`input[data-role="vip"]`).click();
		}
		// Add Save Settings Logic
		newPlayerEle.querySelector(`#player-${numberOfPlayer}-pb-roles`).oninput = (
			ev
		) => {
			let value = ev.target.value;
			let current = config;
			for (let i = 0; i < rolesPath.length; i++) {
				const key = rolesPath[i];
				current = current[key];
			}
			current[index].id = value;
			localStorage.setItem("config", JSON.stringify(config));
		};
		newPlayerEle.querySelectorAll("input[type='radio']").forEach((ele) => {
			ele.addEventListener("click", (ev) => {
				let value = ev.target.dataset.role;
				let current = config;
				for (let i = 0; i < rolesPath.length; i++) {
					const key = rolesPath[i];
					current = current[key];
				}
				current[index].role = value;
				localStorage.setItem("config", JSON.stringify(config));
			});
		});
	}
}

function createNewRoleBlock() {
	let rolesPath = ["players-roles"];
	const config = JSON.parse(localStorage.getItem("config"));
	const players = rolesPath.reduce((obj, key) => obj[key], config);
	let indexOfNewEle = document.querySelector(
		"#roles-management > div.container.body"
	).children.length;
	let numberOfPlayer = indexOfNewEle + 1;
	let newPlayerEle = document.createElement("ul");
	newPlayerEle.innerHTML = `
				<li>
					<div>
						<span>Player Number ${numberOfPlayer} :</span>
							<button class="circle remove"><i class="fa-solid fa-minus"></i></button>
					</div>
				</li>
				<li>
					<label class="form">
						<span>Player pb </span
						><textarea
							class="player-${numberOfPlayer}-pb"
							id="player-${numberOfPlayer}-pb-roles"
							placeholder="Enter Player pb"
						></textarea>
					</label>
				</li>
				<li class="popup">
					<span>Role: </span
					><button class="select-combobox"><span>Owner</span></button>
					<div class="popup-window">
						<div class="popup-header">
							<h5>Role Chooser</h5>
							<button class="close circle">
								<i class="fa fa-close"></i> 
							</button>
						</div>
						<div class="body mt-2">
							<form>
								<ul>
									<li>
										<label class="radio-box"
											><span>Owner</span
											><span
												><input
													class="toggle-radio role "
													id="owner-role-${numberOfPlayer}"
													type="radio"
													name="owner-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="owner"
													/><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Co-Owner</span
											><span
												><input
													class="toggle-radio role"
													id="co-owner-role-${numberOfPlayer}"
													type="radio"
													name="co-owner-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="co-owner" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Lead Staff</span
											><span
												><input
													class="toggle-radio role "
													id="lead-staff-role-${numberOfPlayer}"
													type="radio"
													name="lead-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="lead-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Moderator</span
											><span
												><input
													class="toggle-radio role"
													id="moderator-role-${numberOfPlayer}"
													type="radio"
													name="moderator-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="moderator" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Trial Moderator</span
											><span
												><input
													class="toggle-radio role"
													id="trial-moderator-role-${numberOfPlayer}"
													type="radio"
													name="trial-moderator-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="trial-moderator" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Senior Complain Staff</span
											><span
												><input
													class="toggle-radio role "
													id="senior-complain-staff-role-${numberOfPlayer}"
													type="radio"
													name="senior-complain-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="senior-complain-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Complain Staff</span
											><span
												><input
													class="toggle-radio role"
													id="complain-staff-role-${numberOfPlayer}"
													type="radio"
													name="complain-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="complain-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Trial Complain Staff</span
											><span
												><input
													class="toggle-radio role "
													id="trial-complain-staff-role-${numberOfPlayer}"
													type="radio"
													name="trial-complain-staff-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="trial-complain-staff" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>Admin</span
											><span
												><input
													class="toggle-radio role "
													id="admin-role-${numberOfPlayer}"
													type="radio"
													name="admin-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="admin" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
									<li>
										<label class="radio-box"
											><span>VIP</span
											><span
												><input
													class="toggle-radio role "
													id="vip-role-${numberOfPlayer}"
													type="radio"
													name="vip-role-${numberOfPlayer}"
													data-group="role-${numberOfPlayer}"
													data-role="vip" /><button
													class="toggle-radio-box"
												></button></span
										></label>
									</li>
								</ul>
							</form>
						</div>
					</div>
					<div class="overley"></div>
				</li>
		`;
	document
		.querySelector("#roles-management > div.container.body")
		.append(newPlayerEle);
	newPlayerEle.querySelectorAll(".select-combobox").forEach((combobox) => {
		let popupWin = combobox.nextElementSibling;
		popupWin.querySelectorAll("label.radio-box").forEach(
			(label) =>
				(label.querySelector(".toggle-radio").onclick = () => {
					combobox.children[0].textContent = label.children[0].textContent;
				})
		);
	});
	newPlayerEle.querySelector(`input[data-role="vip"]`).click();

	// Add Save Settings Logic
	let current = config;
	for (let i = 0; i < rolesPath.length; i++) {
		const key = rolesPath[i];
		current = current[key];
	}
	current[indexOfNewEle] = {
		id: "",
		role: "",
	};
	localStorage.setItem("config", JSON.stringify(config));

	newPlayerEle.querySelector(`#player-${numberOfPlayer}-pb-roles`).oninput = (
		ev
	) => {
		let value = ev.target.value;
		let current = config;
		for (let i = 0; i < rolesPath.length; i++) {
			const key = rolesPath[i];
			current = current[key];
		}
		current[indexOfNewEle].id = value;
		localStorage.setItem("config", JSON.stringify(config));
	};
	newPlayerEle.querySelectorAll("input[type='radio']").forEach((ele) => {
		ele.addEventListener("click", (ev) => {
			let value = ev.target.dataset.role;
			let current = config;
			for (let i = 0; i < rolesPath.length; i++) {
				const key = rolesPath[i];
				current = current[key];
			}
			current[indexOfNewEle].role = value;
			localStorage.setItem("config", JSON.stringify(config));
		});
	});
	// Setup Popups
	let popupOpeners = newPlayerEle.querySelectorAll("li.popup > button");
	popupOpeners.forEach((popupOpener) => {
		popupOpener.addEventListener("click", async () => {
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
		});
	});
}

// Store Elements Values
function storeElesValues() {
	const elements = vars.elesToSaveData;
	const config = JSON.parse(localStorage.getItem("config")) || {};
	const radioEles = vars.radioElesToSaveData;
	radioEles.forEach((ele) => {
		let radioEls = document.querySelectorAll(`[data-group="${ele.group}"]`);

		radioEls.forEach(
			(radioEle) =>
				(radioEle.onclick = (ev) => {
					radioEls.forEach((radEle) => (radEle.checked = false));
					radioEle.checked = true;
					let current = config;
					let value = radioEle.dataset.bombname;
					for (let i = 0; i < ele.settingIds.length - 1; i++) {
						const key = ele.settingIds[i];
						// current[key] = current[key] || {};
						current = current[key];
					}
					current[ele.settingIds[ele.settingIds.length - 1]] = value;
					localStorage.setItem("config", JSON.stringify(config));
				})
		);
	});

	elements.forEach((ele) => {
		const el = document.querySelector(ele.id);
		if (!el) return;

		const eventType =
			ele.type === "input"
				? "input"
				: "checkbox"
				? "click"
				: "color-chooser"
				? "input"
				: "time-chooser"
				? "input"
				: "";
		if (ele.type === "color-chooser" || ele.type === "time-chooser") {
			el.oninput = (ev) => {
				let value = ev.target.value;
				let current = config;
				for (let i = 0; i < ele.settingIds.length - 1; i++) {
					const key = ele.settingIds[i];
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
				if (ele.type === "color-chooser") value = ev.target.value;

				// Update config using nested property assignment
				let current = config;
				for (let i = 0; i < ele.settingIds.length - 1; i++) {
					const key = ele.settingIds[i];
					current = current[key];
				}
				current[ele.settingIds[ele.settingIds.length - 1]] = value;

				localStorage.setItem("config", JSON.stringify(config));
			});
		}
	});
}

// Login Screen And Auto Login Logic
function showLoginScreen() {
	new Promise((res, rej) => {
		if (JSON.parse(localStorage.getItem("config"))) {
			res(JSON.parse(localStorage.getItem("config")));
		} else {
			rej("Error");
		}
	}).then(
		(config) => {
			if (
				localStorage.getItem("password") &&
				localStorage.getItem("password") ===
					config["server-website"]["server-password"]
			) {
				document.body.classList.remove("disable-scrolling");
			} else {
				history.pushState({ screen: "" }, "", `${window.location.origin}`);
				document.body.classList.add("disable-scrolling");
				let loginScreen = document.createElement("div");
				loginScreen.className = "login-screen";
				loginScreen.id = "login-screen";
				loginScreen.style.opacity = "1";
				loginScreen.innerHTML = ` 
			<div class="popup-window">
				<div class="popup-header"><h5>Login</h5></div>
				<div class="body">
					<form action>
						<label class="password-form d-flex align-items-center flex-column"
							><span class="me-auto">Enter Your Password:</span>
							<div class="d-flex w-100 mt-1">
								<input
									class="me-1 d-block w-100"
									id="login-password"
									type="password"
									name="login-password"
									placeholder="Password"
									autocomplete="new-password"
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
				let showAndHidePassword = loginScreen.querySelector(".show-or-hide");
				showAndHidePassword.onclick = (ev) => {
					ev.preventDefault();
					if (showAndHidePassword.previousElementSibling.type === "password") {
						showAndHidePassword.previousElementSibling.type = "text";
						showAndHidePassword.innerHTML = `<i class="fa-solid fa-eye-slash"> </i>`;
					} else if (
						showAndHidePassword.previousElementSibling.type === "text"
					) {
						showAndHidePassword.previousElementSibling.type = "password";
						showAndHidePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
					}
				};

				loginScreen
					.querySelector("button.login")
					.addEventListener("click", async (ev) => {
						ev.preventDefault();
						let password = loginScreen.querySelector("#login-password");
						if (
							password.value === config["server-website"]["server-password"]
						) {
							document.body.classList.remove("disable-scrolling");
							loginScreen.style.opacity = "0";
							await delay(350);
							loginScreen.remove();
							localStorage.setItem(
								"password",
								config["server-website"]["server-password"]
							);
						} else {
							if (password.value == "") {
								loginScreen.querySelector(".wrong-password-text").textContent =
									"Empty Input Field";
							} else {
								loginScreen.querySelector(".wrong-password-text").textContent =
									"Wrong Password ";
							}
							loginScreen.querySelector(".wrong-password-text").style.opacity =
								"1";
						}
					});
			}
		},
		(rej) => console.error(rej)
	);
}

// Export The Functions
export {
	loadSettings,
	initializeFromURL,
	delay,
	navigateToScreen,
	updateURL,
	theme,
	sendMessage,
	storeElesValues,
	showLoginScreen,
	loadRoles,
	createNewRoleBlock,
};
