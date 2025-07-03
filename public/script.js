async function submitScore() {
  const name = document.getElementById('playerName').value;
  const score = Math.floor(Math.random() * 100); // Simulated score
  await fetch('/add-player', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  });
  loadScores();
}

async function loadScores() {
  const res = await fetch('/players');
  const players = await res.json();
  const list = document.getElementById('scoreList');
  list.innerHTML = '';
  players.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name}: ${p.score}`;
    list.appendChild(li);
  });
}

loadScores(); // Initial load
