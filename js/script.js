// Wait function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// Send Msg Function
function sendMessege(msg) {
	let messegsBox = document.querySelector(".chat-screen .messeges");
	let newMsg = document.createElement("p");
	newMsg.textContent = `ServerName : ${msg}`;
	messegsBox.appendChild(newMsg);
}
// Navgtaite To Screens
let navs = document.querySelectorAll(
	"body > .container > ul > li:not(.discord)"
);
navs.forEach((li) => {
	li.onclick = () => {
		let tScreen = document.querySelector(`.${li.className}-screen`);
		tScreen.style.opacity = "1";
		tScreen.style.left = "0";
		document.body.classList.add("disable-scrolling");
	};
});

// Back From Screens
let screens = document.querySelectorAll(".screen");

screens.forEach((theScreen) => {
	theScreen.children[0].children[0].onclick = async () => {
		theScreen.style.left = "100dvw";
		document.body.classList.remove("disable-scrolling");
		await delay(500);
		theScreen.style.opacity = "0";
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
	let haha = "Not Assignmend";
	// fetch("https://api.github.com/users/elzerowebschool/repos").then(
	// (res) => {
	// 	jsonFileToExport = res.json();
	// 	console.log();
	// });
	// console.log(jsonFileToExport);
	fetch("../assets/json/config.json")
		.then((result) => {
			// console.log(result.json());
			return result.json();
			// console.log(myData);
			// return myData;
		})
		.then((jsonFileToExport) => {
			let link = document.createElement("a");
			// let textToSave = document.querySelector("import-and-export-settings-screen li:last-child").value;
			let newFile = new Blob([JSON.stringify(jsonFileToExport, null, 2)], {
				type: "application/json",
			});
			link.href = URL.createObjectURL(newFile);
			link.download = "config.json";
			link.click();
			URL.revokeObjectURL(link.href);
		});
};
