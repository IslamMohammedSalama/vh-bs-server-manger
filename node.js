import { publish } from "gh-pages";

publish("dist",{dest:".",repo:"https://github.com/IslamMohammedSalama/vh-bs-server-manger.git",}, function (err) {
  console.log(err)
});
