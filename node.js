// In your deploy script or directly in terminal
const ghpages = require("gh-pages");

ghpages.publish(
	"dist",
	{
		branch: "gh-pages",
		repo: "https://github.com/IslamMohammedSalama/vh-bs-server-manger.git",
		message: "Auto-generated commit from gh-pages",
	},
	function (err) {
		if (err) {
			console.error("Deployment error:", err);
		} else {
			console.log("Successfully deployed!");
		}
	}
);
