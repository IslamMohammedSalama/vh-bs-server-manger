import { publish } from "gh-pages";

publish("dist",{dest:"."}, function (err) {
  console.log(err)
});
