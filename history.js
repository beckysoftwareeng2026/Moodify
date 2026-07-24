const fs = require("fs");


function saveMood(mood, callback) {
    const timestamp = new Date().toLocaleString();
    const historyEntry = `${timestamp} - ${mood}\n`;

    fs.appendFile("mood-history.txt", historyEntry, (error) => {
        if (error) {
            console.error("Error saving mood history:", error);
            callback(error);
            return;
        }

        console.log(`Mood saved: ${mood}`);
        callback(null);
    });
}

module.exports = saveMood;