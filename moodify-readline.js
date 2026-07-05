const readline = require("readline");
const fs = require("fs");

// Mood recommendations
const playlists = {
    happy: {
        playlist: "Good Vibes Only",
        activity: "Go for a walk",
        message: "Keep that positive energy going! 😄",
    },
    sad: {
        playlist: "Feel Better Hits",
        activity: "Call a friend",
        message: "Tomorrow is a new day. ❤️",
    },
    energetic: {
        playlist: "Workout Mix",
        activity: "Hit the gym",
        message: "Use that energy wisely! 💪",
    },
    chill: {
        playlist: "Lo-Fi Beats",
        activity: "Read a book",
        message: "Relax and recharge. 😌",
    },
};

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Welcome message
console.log("\n🎵 Welcome to Moodify!\n");

// Ask the user for their mood
rl.question("What's your mood today? ", (answer) => {
    const mood = answer.toLowerCase().trim();

    const recommendation = playlists[mood];

    if (!recommendation) {
        console.log("\n❌ Sorry, I don't recognize that mood.");
        console.log("Try one of these:");
        console.log("happy, sad, energetic, chill");
        rl.close();
        return;
    }

    console.log("\n🎵 Moodify");
    console.log("----------------------");
    console.log(`😊 Mood: ${mood}`);
    console.log(`🎧 Playlist: ${recommendation.playlist}`);
    console.log(`🚶 Activity: ${recommendation.activity}`);
    console.log(`💬 Message: ${recommendation.message}`);

    // Create a timestamp
    const timestamp = new Date().toLocaleString();

    // Format the history entry
    const historyEntry = `${timestamp} - ${mood}\n`;

    // Save to mood-history.txt
    fs.appendFile("mood-history.txt", historyEntry, (err) => {
        if (err) {
            console.log("❌ Error saving mood history.");
        } else {
            console.log("\n✅ Mood saved to mood-history.txt");
        }

        rl.close();
    });
});