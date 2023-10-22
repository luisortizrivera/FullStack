const fs = require("fs").promises;
const UAParser = require("ua-parser-js");
const path = require("path");

const logger = async (req, res, next) => {
	const date = new Date();
	const logFileName = `log_${date.toISOString().split("T")[0]}.csv`;
	const logFilePath = path.join(__dirname, "../RequestLogs", logFileName);

	// Get IP
	let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

	// Get AGENT
	let agent = new UAParser(req.headers["user-agent"]).getResult();

	// Prepare the data in CSV format
	const logData = `${date.toLocaleTimeString()},${req.protocol}://${req.get(
		"host"
	)}${req.originalUrl},${ip},${agent.os.name},${agent.browser.name}\n`;

	try {
		await fs.access(logFilePath);
	} catch (err) {
		try {
			await fs.writeFile(logFilePath, "Time,URL,IP,OS,Browser\n");
		} catch (err) {
			console.error(`Error writing file: ${err}`);
			return next(err);
		}
	}

	try {
		await fs.appendFile(logFilePath, logData);
	} catch (err) {
		console.error(`Error appending data: ${err}`);
		return next(err);
	}

	next();
};

module.exports = logger;
