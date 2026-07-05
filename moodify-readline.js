const readline = require("readline");
const fs = require("fs");
const playlists = require("./moods");
const saveMood = require("./history");


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
    saveMood(mood);

    rl.close();
});