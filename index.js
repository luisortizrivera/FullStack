const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const logger = require("./Logger/logger");

//init middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./Routes/Api/Members"));

app.listen(PORT, () => {
	console.log("Server listening on port: ", PORT);
});
