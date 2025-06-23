const form = document.getElementById("moodForm");
const logList = document.getElementById("moodLogList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const moodScore = document.getElementById("moodScore").value;
  const moodComment = document.getElementById("moodComment").value;
  const timestamp = new Date().toLocaleString();

  const moodEntry = {
    score: moodScore,
    comment: moodComment,
    time: timestamp
  };

  // Save to localStorage
  let moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  moodLogs.push(moodEntry);
  localStorage.setItem("moodLogs", JSON.stringify(moodLogs));

  // Update display
  displayMoodLogs();
  form.reset();
  document.getElementById("scoreOutput").value = 5;
});

function displayMoodLogs() {
  let moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  logList.innerHTML = "";

  moodLogs.reverse().forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.time}</strong> — Mood: ${entry.score}/10 <br> ${entry.comment}`;
    logList.appendChild(li);
  });
}

displayMoodLogs();
