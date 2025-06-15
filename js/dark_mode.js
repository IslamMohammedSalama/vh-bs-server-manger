			let themeName = localStorage.getItem("theme");
			if (themeName === "dark") {
				document.body.style.transition = "none";
				document.body.classList.add("dark-mode");
				console.log("tst 1");
				document.body.style.transition = " var(--main-animation-duration, $main-animation-duration)";
				addEventListener("DOMContentLoaded", () => {
					document.getElementById("dark-mode").checked = true;
				});
			} else if (themeName === "light") {
				console.log("tst 2");
				addEventListener("DOMContentLoaded", () => {
					document.getElementById("dark-mode").checked = false;
				});
			}