const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
// 	res.sendFile(path.join(__dirname, "public", "about.html"));
// });

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log("Server listening on port: ", PORT);
});
