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
  let config = JSON.parse(localStorage.getItem("config")) || {};
  const elements = vars.elesToSaveData;
  const radioEles = vars.radioElesToSaveData;
  radioEles.forEach((ele) => {
    // document
    //   .querySelectorAll(`[data-group="${ele.group}"]`)
    //   .forEach((radEle) => (radEle.checked = false));
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

// Store Elements Values
function storeElesValues() {
  const elements = vars.elesToSaveData;
  let config = JSON.parse(localStorage.getItem("config")) || {};
  const radioEles = vars.radioElesToSaveData;
  radioEles.forEach((ele) => {
    let radioEls = document.querySelectorAll(`[data-group="${ele.group}"]`);

    radioEls.forEach(
      (radioEle) =>
        (radioEle.onclick = (ev) => {
          radioEls.forEach((radEle) => (radEle.checked = false));
          radioEle.checked = true;
          let value = radioEle.dataset.bombname;

          let evalCommand = "config";
          for (const thing of ele.settingIds)
            evalCommand = evalCommand + `["${thing}"]`;
          evalCommand = evalCommand + ` = value`;
          eval(evalCommand);

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

        let evalCommand = "config";
        for (const thing of ele.settingIds)
          evalCommand = evalCommand + `["${thing}"]`;
        evalCommand = evalCommand + ` = value`;
        eval(evalCommand);

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
        // let current = config;
        // for (let i = 0; i < ele.settingIds.length - 1; i++) {
        //   const key = ele.settingIds[i];
        //   current = current[key];
        // }
        // current[ele.settingIds[ele.settingIds.length - 1]] = value;

        let evalCommand = "config";
        for (const thing of ele.settingIds)
          evalCommand = evalCommand + `["${thing}"]`;

        evalCommand = evalCommand + ` = value`;
        eval(evalCommand);

        localStorage.setItem("config", JSON.stringify(config));
      });
    }
  });
}

function loadRoles() {
  let config = JSON.parse(localStorage.getItem("config"));
  let rolesObj = config["players-roles"];
  document.querySelector("#roles-management .body .container").innerHTML = "";
  for (let index = 0; index < rolesObj.length; index++) {
    const obj = rolesObj[index];
    createNewRoleBlock(obj.id, obj.role, index);
  }
}

function createNewRoleBlock(id, role, indexOfPlayer) {
  const numberOfPlayer =
    indexOfPlayer + 1 ||
    document.querySelector("#roles-management .body .container").children
      .length + 1;
  // init  data if not existed

  if (indexOfPlayer === undefined) {
    indexOfPlayer = numberOfPlayer - 1;
    let config = JSON.parse(localStorage.getItem("config"));
    config["players-roles"][indexOfPlayer] = {
      id: id,
      role: role,
    };
    localStorage.setItem("config", JSON.stringify(config));
  }
  let htmlCode = `
  <li>
    <span>Player Number ${numberOfPlayer} :</span>
  </li>
  <li>
    <form action>
      <label class="form">
      <span>Player pb </span>
      <textarea
        class="player-${indexOfPlayer}-pb"
        id="player-${indexOfPlayer}-pb-roles"
        placeholder="Enter Player pb"
        name="player-${indexOfPlayer}-pb"
      >${id || ""}</textarea>
    </label>
    </form>
  </li>
  <li class="popup">
    <span>Role: </span>
    <button class="select-combobox">
      <span>Owner</span>
    </button>
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
              <label class="radio-box">
                <span>Owner</span>
                <span>
                  <input
                    class="toggle-radio role owner-role-${indexOfPlayer}"
                    id="owner-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="owner"
                    checked="checked"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Co-Owner</span>
                <span>
                  <input
                    class="toggle-radio role co-owner-role-${indexOfPlayer}"
                    id="co-owner-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="co-owner"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Lead Staff</span>
                <span>
                  <input
                    class="toggle-radio role lead-staff-role-${indexOfPlayer}"
                    id="lead-staff-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="lead-staff"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Moderator</span>
                <span>
                  <input
                    class="toggle-radio role moderator-role-${indexOfPlayer}"
                    id="moderator-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="moderator"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Trial Moderator</span>
                <span>
                  <input
                    class="toggle-radio role trial-moderator-role-${indexOfPlayer}"
                    id="trial-moderator-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="trial-moderator"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Senior Complain Staff</span>
                <span>
                  <input
                    class="toggle-radio role senior-complain-staff-role-${indexOfPlayer}"
                    id="senior-complain-staff-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="senior-complain-staff"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Complain Staff</span>
                <span>
                  <input
                    class="toggle-radio role complain-staff-role-${indexOfPlayer}"
                    id="complain-staff-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="complain-staff"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Trial Complain Staff</span>
                <span>
                  <input
                    class="toggle-radio role trial-complain-staff-role-${indexOfPlayer}"
                    id="trial-complain-staff-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="trial-complain-staff"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>Admin</span>
                <span>
                  <input
                    class="toggle-radio role trial-complain-staff-role-${indexOfPlayer}"
                    id="admin-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="admin"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
            <li>
              <label class="radio-box">
                <span>VIP</span>
                <span>
                  <input
                    class="toggle-radio role vip-role-${indexOfPlayer}"
                    id="vip-role-${indexOfPlayer}"
                    type="radio"
                    name="player-role-${indexOfPlayer}"
                    data-group="role-${indexOfPlayer}"
                    data-role="vip"
                  />
                  <div class="toggle-radio-box"></div>
                </span>
              </label>
            </li>
          </ul>
        </form>
      </div>
    </div>
    <div class="overlay"></div>
  </li>
  `;

  // Select Roles Element
  let rolesPr = document.querySelector("#roles-management .body .container");

  // create user role row
  let newPlayer = document.createElement("ul");
  newPlayer.innerHTML = htmlCode;

  newPlayer
    .querySelector("li.popup > button")
    .addEventListener("click", async () => {
      let popupWin =
        newPlayer.querySelector("li.popup > button").nextElementSibling;
      let overlay = popupWin.nextElementSibling;
      popupWin.style.display = "flex";
      overlay.style.display = "block";
      await delay(0);
      popupWin.style.opacity = "1";
      overlay.style.opacity = "1";
      popupWin.style.transform = "translate(-50%, -50%) scale(1)";
      popupWin.querySelector(" .close ").onclick = async () => {
        popupWin.style.opacity = "0";
        overlay.style.opacity = "0";
        popupWin.style.transform = "translate(-50%, -50%) scale(0)";
        await delay(350);
        popupWin.style.display = "none";
        overlay.style.display = "none";
      };
      overlay.onclick = async () => {
        popupWin.style.opacity = "0";
        overlay.style.opacity = "0";
        popupWin.style.transform = "translate(-50%, -50%) scale(0)";
        await delay(350);
        popupWin.style.display = "none";
        overlay.style.display = "none";
      };
    });

  newPlayer.querySelectorAll(".select-combobox").forEach((combobox) => {
    let popupWin = combobox.nextElementSibling;
    popupWin.querySelectorAll("label.radio-box").forEach((label) =>
      label.querySelectorAll(".toggle-radio").forEach(
        (ele) =>
          (ele.oninput = () => {
            combobox.children[0].textContent = label.children[0].textContent;
          })
      )
    );
  });
  // Add This Element
  rolesPr.append(newPlayer);

  if (role) {
    newPlayer.querySelector(`#${role}-role-${indexOfPlayer}`).checked = true;
    newPlayer.querySelector(".select-combobox").children[0].textContent =
      newPlayer.querySelector(
        `#${role}-role-${indexOfPlayer}`
      ).parentElement.previousElementSibling.textContent;
  } else if (role === "" || !role) {
    console.log(indexOfPlayer);

    newPlayer.querySelector(`#vip-role-${indexOfPlayer}`).checked = true;
    newPlayer.querySelector(".select-combobox").children[0].textContent =
      newPlayer.querySelector(
        `#vip-role-${indexOfPlayer}`
      ).parentElement.previousElementSibling.textContent;
  }

  // Store Data

  // Pb Input
  let inputId = newPlayer.querySelector(`#player-${indexOfPlayer}-pb-roles`);
  inputId.oninput = () => {
    let config = JSON.parse(localStorage.getItem("config"));
    config["players-roles"][indexOfPlayer]["id"] = inputId.value;
    localStorage.setItem("config", JSON.stringify(config));
  };

  // Roles Selector

  newPlayer.querySelectorAll("input[type=radio]").forEach((element) => {
    element.onchange = function () {
      let config = JSON.parse(localStorage.getItem("config"));
      config["players-roles"][indexOfPlayer]["role"] = element.dataset.role;
      localStorage.setItem("config", JSON.stringify(config));
    };
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
			<div class="overlay"></div>
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
  createNewRoleBlock,
  loadRoles,
};
