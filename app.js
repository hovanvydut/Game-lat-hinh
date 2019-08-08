const express = require("express");
const app = express();
const fs = require("fs");

const port = 5000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

// read data
let db = JSON.parse(fs.readFileSync("db.json", { encoding: "utf8" }));
for (elm of db) {
	elm.order = Math.random();
}
db.sort((a, b) => {
	return a.order - b.order;
});
console.log(db);

app.get("/", (req, res, next) => {
	res.render("home.ejs", {
		title: "HomePage",
		message: "Hulle",
		db: db
	});
});

app.listen(port, () => {
	console.log("Server is listening on port ", port);
});
