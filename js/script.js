import * as functions from "./lib/functions.js";

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
  fetch("assets/json/config.jsonc")
    .then((res) => res.json())
    .then((result) => {
      localStorage.setItem("config", JSON.stringify(result));
      functions.loadSettings();
      functions.loadRoles();
    })
    .then((res) => functions.showLoginScreen());
} else {
  functions.loadSettings();
  functions.loadRoles();
  functions.showLoginScreen();
}

// Initialize from URL on page load
window.onload = function () {
  functions.initializeFromURL();
};

// Reset Button Function
document
  .querySelectorAll("button")
  .forEach((btn) => (btn.onclick = (ev) => ev.preventDefault()));

// Navigate To Screens
let navs = document.querySelectorAll(".home-screen ul  li:not(.discord)");
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
    theScreen.style.left = "100dvw";
    document.body.classList.remove("disable-scrolling");
    await functions.delay(350);
    theScreen.style.display = "none";
  };
  // Add New Element
  if (header.querySelector(".add")) {
    header.querySelector(".add").onclick = (ev) => {
      if (theScreen.classList.contains("effects-and-tag-management-screen")) {
      } else if (theScreen.classList.contains("roles-management-screen")) {
        functions.createNewRoleBlock("", "");
      }
    };
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
// document.querySelectorAll(".toggle-switch").forEach(
//   (element) =>
//     (element.onclick = function (ev) {
//       ev.preventDefault();
//       element.previousElementSibling.click();
//     })
// );

// // Toggle Radio Box Logic

// document.querySelectorAll(".toggle-radio-box").forEach((element) => {
//   element.previousElementSibling.click = () => {
//     document.querySelectorAll(".toggle-radio-box").forEach((ele) => {
//       ele.previousElementSibling.checked = false;
//     });
//     element.previousElementSibling.checked = true;
//   };
//   element.addEventListener("click", function (ev) {
//     ev.preventDefault();
//     document.querySelectorAll(".toggle-radio-box").forEach((ele) => {
//       ele.previousElementSibling.checked = false;
//     });
//     element.previousElementSibling.click();
//   });
// });

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
							<button class="${row.muted ? "unmute-" + row.id : "mute-" + row.id}">${
        row.muted ? "UnMute" : "Mute"
      }</button>
							<button class="${row.banned ? "unban-" + row.id : "ban-" + row.id}">${
        row.banned ? "UnBan" : "Ban"
      }</</button>
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
        let id = element.className.split("-")[1];
        let action = element.className.split("-")[0];
        let who;
        for (const key of result) {
          if (key.id == id) {
            who = key.name;
          }
        }
        ev.preventDefault();
        let popup = document.createElement("div");
        popup.classList.add("popup-window");
        popup.classList.add("alert");
        popup.innerHTML = `
	<div class="popup-header">
			<h5>Alert</h5>
	</div>
	<div class="body">
		<span class="text-center w-100 d-block">${who} Is ${
          action === "mute"
            ? "Muted"
            : action === "unmute"
            ? "UnMuted"
            : action === "ban"
            ? "Banned"
            : action === "unban"
            ? "UnBanned"
            : "Nothing"
        }</span>
		<button class="mt-2 close text-center w-100 d-block">Close</button>
	</div>
	`;
        element.textContent =
          action === "mute"
            ? "UnMute"
            : action === "unmute"
            ? "Mute"
            : action === "ban"
            ? "UnBan"
            : action === "unban"
            ? "Ban"
            : "Nothing";
        element.className =
          action === "mute"
            ? "unmute-" + id
            : action === "unmute"
            ? "mute-" + id
            : action === "ban"
            ? "unban-" + id
            : action === "unban"
            ? "ban-" + id
            : "Nothing";
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.append(popup, overlay);

        popup.style.display = "flex";
        overlay.style.display = "block";
        await functions.delay(0);
        popup.style.opacity = "1";
        overlay.style.opacity = "1";
        popup.style.transform = "translate(-50%, -50%) scale(1)";
        popup.querySelector(" .close ").onclick = async () => {
          popup.style.opacity = "0";
          overlay.style.opacity = "0";
          popup.style.transform = "translate(-50%, -50%) scale(0)";
          await functions.delay(350);
          popup.style.display = "none";
          overlay.style.display = "none";
          overlay.remove();
          popup.remove();
        };
        overlay.onclick = async () => {
          popup.style.opacity = "0";
          overlay.style.opacity = "0";
          popup.style.transform = "translate(-50%, -50%) scale(0)";
          await functions.delay(350);
          popup.style.display = "none";
          overlay.style.display = "none";
          overlay.remove();
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

// Setup Popups
let popupOpeners = document.querySelectorAll("li.popup > button");
popupOpeners.forEach((popupOpener) => {
  popupOpener.addEventListener("click", async () => {
    let popupWin = popupOpener.nextElementSibling;
    let overlay = popupWin.nextElementSibling;
    popupWin.style.display = "flex";
    overlay.style.display = "block";
    await functions.delay(0);
    popupWin.style.opacity = "1";
    overlay.style.opacity = "1";
    popupWin.style.transform = "translate(-50%, -50%) scale(1)";
    popupWin.querySelector(" .close ").onclick = async () => {
      popupWin.style.opacity = "0";
      overlay.style.opacity = "0";
      popupWin.style.transform = "translate(-50%, -50%) scale(0)";
      await functions.delay(350);
      popupWin.style.display = "none";
      overlay.style.display = "none";
    };
    overlay.onclick = async () => {
      popupWin.style.opacity = "0";
      overlay.style.opacity = "0";
      popupWin.style.transform = "translate(-50%, -50%) scale(0)";
      await functions.delay(350);
      popupWin.style.display = "none";
      overlay.style.display = "none";
    };
  });
});

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
  let overlay = document.createElement("div");
  overlay.className = "overlay";

  document.body.append(popup, overlay);

  popup.style.display = "flex";
  overlay.style.display = "block";
  await functions.delay(0);
  popup.style.opacity = "1";
  overlay.style.opacity = "1";
  popup.style.transform = "translate(-50%, -50%) scale(1)";
  popup.querySelector(" .close ").onclick = async () => {
    popup.style.opacity = "0";
    overlay.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    await functions.delay(350);
    popup.style.display = "none";
    overlay.style.display = "none";
    overlay.remove();
    popup.remove();
  };

  overlay.onclick = async () => {
    popup.style.opacity = "0";
    overlay.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    await functions.delay(350);
    popup.style.display = "none";
    overlay.style.display = "none";
    overlay.remove();
    popup.remove();
  };

  resetBtn.onclick = async (ev) => {
    localStorage.clear();
    location.reload();
    popup.style.opacity = "0";
    overlay.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    await functions.delay(350);
    popup.style.display = "none";
    overlay.style.display = "none";
    overlay.remove();
    popup.remove();
  };
};

// Search On Files Logic

document.querySelector(".server-logs-screen button.search").onclick = async (
  ev
) => {
  ev.preventDefault();
  let textToSearch = document.getElementById("string-search").value.trim();
  if (textToSearch === "") {
    return;
  }
  let nothingFound = null;
  let selectedCheckBox = document.querySelector(
    ".server-logs-screen form input[type='radio']:checked"
  );
  if (selectedCheckBox.classList.contains("logs-file")) {
    let textFile = await (await fetch("assets/txt-files/logs.txt")).text();
    document.getElementById("results").innerHTML = "";
    let linesOfFile = textFile.split("\n");
    linesOfFile.forEach((line) => {
      if (line.includes(textToSearch)) {
        nothingFound = false;
        let newHtmlLine = line
          .split(textToSearch)
          .join(`<span>${textToSearch}</span>`);
        let newLineEle = document.createElement("p");
        newLineEle.innerHTML = newHtmlLine;
        document.getElementById("results").append(newLineEle);
      } else {
        nothingFound === null ? (nothingFound = true) : null;
      }
    });
  } else if (selectedCheckBox.classList.contains("errors-file")) {
    let textFile = await (await fetch("assets/txt-files/errors.txt")).text();
    document.getElementById("results").innerHTML = "";
    let linesOfFile = textFile.split("\n");
    linesOfFile.forEach((line) => {
      if (line.includes(textToSearch)) {
        nothingFound = false;
        let newHtmlLine = line
          .split(textToSearch)
          .join(`<span>${textToSearch}</span>`);
        let newLineEle = document.createElement("p");
        newLineEle.innerHTML = newHtmlLine;
        document.getElementById("results").append(newLineEle);
      } else {
        nothingFound === null ? (nothingFound = true) : null;
      }
    });
  } else {
    throw new Error("This File Not Found");
  }

  // console.log(nothingFound);
  if (nothingFound) {
    let newP = document.createElement("p");
    newP.className = "text-center";
    newP.textContent = "Nothing Found";
    document.getElementById("results").innerHTML = "";
    document.getElementById("results").appendChild(newP);
  }
};

// Change The Text Of Combobox Button On Check Any Radio Box

document.querySelectorAll(".select-combobox").forEach((combobox) => {
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

functions.storeElesValues();
