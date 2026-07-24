const moodCards = document.querySelectorAll(".mood-card");
const recommendBtn = document.querySelector(".recommend-btn");
const result = document.querySelector(".result");
const selectionStatus = document.querySelector("#selection-status");

let selectedMood = "";

moodCards.forEach((card) => {
  card.addEventListener("click", () => {
    moodCards.forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");

    selectedMood = card.dataset.mood;

    selectionStatus.textContent = `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)
      } selected`;
  });
});

recommendBtn.addEventListener("click", async () => {
  if (!selectedMood) {
    result.innerHTML = `
      <div class="error-state">
        <h2>Choose a mood first</h2>
        <p>Select how you are feeling before requesting a recommendation.</p>
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div class="loading-state">
      <h2>Finding your vibe</h2>
      <p>Matching your mood to the right recommendation.</p>

      <div aria-label="Loading">
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
      </div>
    </div>
  `;

  recommendBtn.disabled = true;
  recommendBtn.textContent = "Finding your vibe...";

  try {
    await new Promise((resolve) => setTimeout(resolve, 650));

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
      <div class="recommendation-card">
        <article class="recommendation-item">
          <p class="label">Selected mood</p>
          <p class="value mood-value">${selectedMood}</p>
        </article>

        <article class="recommendation-item">
          <p class="label">Playlist</p>
          <p class="value">🎧 ${recommendation.playlist}</p>
        </article>

        <article class="recommendation-item">
          <p class="label">Activity</p>
          <p class="value">🚶 ${recommendation.activity}</p>
        </article>

        <article class="recommendation-item message-item">
          <p class="label">A message for you</p>
          <p class="value">💬 ${recommendation.message}</p>
        </article>
      </div>
    `;
  } catch (error) {
    result.innerHTML = `
      <div class="error-state">
        <h2>Something went wrong</h2>
        <p>${error.message}</p>
      </div>
    `;
  } finally {
    recommendBtn.disabled = false;
    recommendBtn.textContent = "Get my recommendation";
  }
});