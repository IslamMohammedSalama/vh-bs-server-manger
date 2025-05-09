import { publish } from "gh-pages";

publish("dist", function (err) {
  console.log(err)
});
