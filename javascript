<script>
  const form = document.getElementById("moodForm");
  const logList = document.getElementById("moodLogList");

  // Save new mood entry
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const moodScore = document.getElementById("moodScore").value;
    const moodComment = document.getElementById("moodComment").value;
    const timestamp = new Date().toLocaleString();

    const moodEntry = {
      id: Date.now(), // unique ID
      score: moodScore,
      comment: moodComment,
      time: timestamp
    };

    const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    moodLogs.push(moodEntry);
    localStorage.setItem("moodLogs", JSON.stringify(moodLogs));

    form.reset();
    document.getElementById("scoreOutput").value = 5;
    displayMoodLogs();
  });

  // Display all mood entries
  function displayMoodLogs() {
    const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    logList.innerHTML = "";

    [...moodLogs].reverse().forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${entry.time}</strong><br>
        Mood: ${entry.score}/10<br>
        ${entry.comment}<br>
        <button class="delete-btn" data-id="${entry.id}">🗑️ Delete</button>
      `;
      logList.appendChild(li);
    });

    // Attach delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.dataset.id);
        deleteEntry(id);
      });
    });
  }

  // Delete entry by ID
  function deleteEntry(id) {
    let moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    moodLogs = moodLogs.filter(entry => entry.id !== id);
    localStorage.setItem("moodLogs", JSON.stringify(moodLogs));
    displayMoodLogs();
  }

  // Load logs on page load
  displayMoodLogs();
</script>
