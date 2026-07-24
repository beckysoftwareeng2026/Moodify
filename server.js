const http = require("http");
const fs = require("fs");
const playlists = require("./moods");
const saveMood = require("./history");

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Serve HTML
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

    // Serve CSS
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

    // Serve JavaScript
    if (req.method === "GET" && req.url === "/script.js") {
        fs.readFile("script.js", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading script");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/javascript",
            });

            res.end(data);
        });

        return;
    }

    // Handle Recommendation Request
    if (req.method === "POST" && req.url === "/recommend") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const requestData = JSON.parse(body);
                const mood = requestData.mood;

                const recommendation = playlists[mood];

                if (!recommendation) {
                    res.writeHead(404, {
                        "Content-Type": "application/json",
                    });

                    res.end(
                        JSON.stringify({
                            error: "Mood not found",
                        })
                    );

                    return;
                }

                // Save mood history before responding
                saveMood(mood, (saveError) => {
                    if (saveError) {
                        res.writeHead(500, {
                            "Content-Type": "application/json",
                        });

                        res.end(
                            JSON.stringify({
                                error:
                                    "Recommendation found, but mood history could not be saved.",
                            })
                        );

                        return;
                    }

                    res.writeHead(200, {
                        "Content-Type": "application/json",
                    });

                    res.end(
                        JSON.stringify({
                            ...recommendation,
                            saved: true,
                        })
                    );
                });
            } catch (error) {
                res.writeHead(400, {
                    "Content-Type": "application/json",
                });

                res.end(
                    JSON.stringify({
                        error: "Invalid JSON request",
                    })
                );
            }
        });

        return;
    }

    // 404
    res.writeHead(404, {
        "Content-Type": "text/plain",
    });

    res.end("Page not found");
});

server.listen(PORT, () => {
    console.log(`Moodify server running at http://localhost:${PORT}`);
});