import './style.css';

// RÈGLE PORTFOLIO — toutes les démos partagent la même origine : les
// clés localStorage sont TOUJOURS préfixées par le slug du projet.
const PREFIX = 'SLUG:';

const countEl = document.getElementById('count');
let count = Number(localStorage.getItem(`${PREFIX}count`)) || 0;
countEl.textContent = String(count);

document.getElementById('bump').addEventListener('click', () => {
  count += 1;
  localStorage.setItem(`${PREFIX}count`, String(count));
  countEl.textContent = String(count);
});
