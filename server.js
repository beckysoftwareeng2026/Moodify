const http = require("http");
const fs = require("fs");
const playlists = require("./moods");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("index.html", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading page");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
        return;
    }

    if (req.method === "GET" && req.url === "/styles.css") {
        fs.readFile("styles.css", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading styles");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
        return;
    }

    if (req.method === "GET" && req.url === "/script.js") {
        fs.readFile("script.js", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading script");
                return;
            }

            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(data);
        });
        return;
    }

    if (req.method === "GET" && req.url.startsWith("/recommend")) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const mood = url.searchParams.get("mood");
        const recommendation = playlists[mood];

        if (!recommendation) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Mood not found" }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(recommendation));
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
});

server.listen(PORT, () => {
    console.log(`Moodify server running at http://localhost:${PORT}`);
});