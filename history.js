const fs = require("fs");

function saveMood(mood) {
    const timestamp = new Date().toLocaleString();
    const historyEntry = `${timestamp} - ${mood}\n`;

    fs.appendFile("mood-history.txt", historyEntry, (err) => {
        if (err) {
            console.log("❌ Error saving mood history.");
        } else {
            console.log("\n✅ Mood saved to mood-history.txt");
        }
    });
}

module.exports = saveMood;