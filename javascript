const form = document.getElementById("moodForm");
const logList = document.getElementById("moodLogList");

// Handle form submission
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

  // Get existing logs, add new one, then save
  const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  moodLogs.push(moodEntry);
  localStorage.setItem("moodLogs", JSON.stringify(moodLogs));

  // Reset form and update display
  form.reset();
  document.getElementById("scoreOutput").value = 5;
  displayMoodLogs();
});

// Display all mood logs
function displayMoodLogs() {
  const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  logList.innerHTML = "";

  // Reverse *copy* to show newest first
  [...moodLogs].reverse().forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.time}</strong><br>
      Mood: ${entry.score}/10<br>
      ${entry.comment}<br>
      <button onclick="deleteEntry(${entry.id})" style="
        margin-top: 8px;
        background-color: #f8d7da;
        color: #721c24;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
      ">🗑️ Delete</button>
    `;
    logList.appendChild(li);
  });
}

// Delete a mood entry by ID
function deleteEntry(id) {
  let moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  moodLogs = moodLogs.filter((entry) => entry.id !== id);
  localStorage.setItem("moodLogs", JSON.stringify(moodLogs));
  displayMoodLogs();
}

// Load existing logs on page load
displayMoodLogs();
