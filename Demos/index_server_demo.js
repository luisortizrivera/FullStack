const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.end("<h1>Home Base</h1>");
	}
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
