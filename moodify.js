// Get the mood from the command line
const mood = process.argv[2];

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

// Make sure the user entered a mood
if (!mood) {
    console.log("❌ Please enter a mood.");
    console.log("Example:");
    console.log("node moodify.js happy");
    process.exit();
}

// Look up the mood
const recommendation = playlists[mood.toLowerCase()];

// Handle invalid moods
if (!recommendation) {
    console.log(`❌ Sorry, I don't recognize the mood "${mood}".`);
    console.log("Try one of these:");
    console.log("happy, sad, energetic, chill");
    process.exit();
}

// Display recommendation
console.log("\n🎵 Moodify");
console.log("----------------------");
console.log(`😊 Mood: ${mood}`);
console.log(`🎧 Playlist: ${recommendation.playlist}`);
console.log(`🚶 Activity: ${recommendation.activity}`);
console.log(`💬 Message: ${recommendation.message}`);