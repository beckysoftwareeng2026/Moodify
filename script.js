const moodCards = document.querySelectorAll(".mood-card");
const recommendBtn = document.querySelector(".recommend-btn");
const result = document.querySelector(".result");

let selectedMood = "";

moodCards.forEach((card) => {
  card.addEventListener("click", () => {
    moodCards.forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");

    selectedMood = card
      .querySelector("span")
      .textContent
      .trim()
      .toLowerCase();
  });
});

recommendBtn.addEventListener("click", async () => {
  if (!selectedMood) {
    result.innerHTML = `
      <h2>Choose a mood first</h2>
      <p>Please select how you're feeling before getting a recommendation.</p>
    `;
    return;
  }

  result.innerHTML = `
    <h2>Finding your vibe...</h2>
    <p>🎧 Matching your mood to the right recommendation.</p>
  `;

  recommendBtn.disabled = true;
  recommendBtn.textContent = "Loading...";

  try {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const response = await fetch("/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: selectedMood,
      }),
    });

    const recommendation = await response.json();

    if (!response.ok) {
      throw new Error(recommendation.error || "Mood not found");
    }

    result.innerHTML = `
      <h2>Your Recommendation</h2>

      <div class="recommendation-card">
        <p class="label">Mood</p>
        <p class="value">${selectedMood}</p>

        <p class="label">🎧 Playlist</p>
        <p class="value">${recommendation.playlist}</p>

        <p class="label">🚶 Activity</p>
        <p class="value">${recommendation.activity}</p>

        <p class="label">💬 Message</p>
        <p class="value">${recommendation.message}</p>
      </div>
    `;
  } catch (error) {
    result.innerHTML = `
      <h2>Something went wrong</h2>
      <p>${error.message}</p>
    `;
  } finally {
    recommendBtn.disabled = false;
    recommendBtn.textContent = "Get Recommendation";
  }
});