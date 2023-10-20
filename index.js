const express = require("express");
const path = require("path");
const fs = require("fs");
const UAParser = require("ua-parser-js");
const app = express();
const PORT = process.env.PORT || 5000;
const members = require("./Entities/Members");

const logger = (req, res, next) => {
	const date = new Date();
	const logFileName = `log_${date.toISOString().split("T")[0]}.csv`;
	const logFilePath = path.join(__dirname, "RequestLogs", logFileName);

	// Get IP
	let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

	// Get AGENT
	let agent = new UAParser(req.headers["user-agent"]).getResult();

	// Prepare the data in CSV format
	const logData = `${date.toLocaleTimeString()},${req.protocol}://${req.get(
		"host"
	)}${req.originalUrl},${ip},${agent.os.name},${agent.browser.name}\n`;

	// Write to log file
	if (!fs.existsSync(logFilePath)) {
		fs.writeFileSync(logFilePath, "Time,URL,IP,OS,Browser\n");
	}
	fs.appendFileSync(logFilePath, logData);

	next();
};

//init middleware
app.use(logger);

app.get("/api/members", (req, res) => res.json(members));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log("Server listening on port: ", PORT);
});
