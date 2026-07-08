const moodCards = document.querySelectorAll(".mood-card");
const recommendBtn = document.querySelector(".recommend-btn");
const result = document.querySelector(".result");

let selectedMood = "";

moodCards.forEach((card) => {
    card.addEventListener("click", () => {
        moodCards.forEach((item) => item.classList.remove("selected"));
        card.classList.add("selected");

        selectedMood = card.querySelector("span").textContent.trim().toLowerCase();

        console.log("Selected mood:", selectedMood);
    });
});

recommendBtn.addEventListener("click", async () => {
    console.log("Button clicked");
    console.log("Mood sent to server:", selectedMood);

    if (!selectedMood) {
        result.innerHTML = `
      <h2>Choose a mood first</h2>
      <p>Please select how you're feeling before getting a recommendation.</p>
    `;
        return;
    }

    try {
        const response = await fetch(`/recommend?mood=${selectedMood}`);
        const recommendation = await response.json();

        console.log("Server response:", recommendation);

        if (!response.ok) {
            throw new Error(recommendation.error || "Mood not found");
        }

        result.innerHTML = `
      <h2>Your Recommendation</h2>
      <p><strong>Mood:</strong> ${selectedMood}</p>
      <p><strong>🎧 Playlist:</strong> ${recommendation.playlist}</p>
      <p><strong>🚶 Activity:</strong> ${recommendation.activity}</p>
      <p><strong>💬 Message:</strong> ${recommendation.message}</p>
    `;
    } catch (error) {
        result.innerHTML = `
      <h2>Something went wrong</h2>
      <p>${error.message}</p>
    `;
    }
});