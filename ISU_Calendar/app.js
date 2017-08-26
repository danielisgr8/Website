const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
	let url = "";
	let type = "";
	switch(req.url) {
		case "/":
			url = "./public/index.html";
			type = "text/html";
			break;
		case "/index.js":
			url = "./public/index.js";
			type = "text/javascript";
			break;
		case "/index.css":
			url = "./public/index.css";
			type = "text/css";
			break;
	}
	if(url) {
		res.setHeader("Content-Type", type);
		const stream = fs.createReadStream(url);
		stream.pipe(res);
		stream.on("end", () => {
			res.end();
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(80, () => {
	console.log("server started on port 80");
});
