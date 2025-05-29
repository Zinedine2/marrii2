const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let score = 0;
let time = 60;

const buenas = [
  "Paciente", "Empático", "Motivador", "Responsable", "Creativo",
  "Justo", "Apoya", "Comunica bien", "Escucha", "Entusiasta"
];

const malas = [
  "Impaciente", "Grita", "Aburrido", "Desorganizado", "Confuso",
  "No escucha", "Inequitable", "Desmotiva", "Autoritario", "Desinteresado"
];

document.addEventListener("keydown", (e) => {
  const left = parseInt(player.style.left || "270");
  if (e.key === "ArrowLeft" && left > 0) player.style.left = `${left - 20}px`;
  if (e.key === "ArrowRight" && left < 540) player.style.left = `${left + 20}px`;
});

function crearCualidad() {
  const item = document.createElement("div");
  const esBuena = Math.random() < 0.6;
  const texto = esBuena
    ? buenas[Math.floor(Math.random() * buenas.length)]
    : malas[Math.floor(Math.random() * malas.length)];

  item.textContent = texto;
  item.className = `item ${esBuena ? "buena" : "mala"}`;
  item.style.left = `${Math.random() * 500}px`;
  game.appendChild(item);

  let pos = 0;
  const intervalo = setInterval(() => {
    pos += 2;
    item.style.top = `${pos}px`;

    const itemRect = item.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      itemRect.bottom >= playerRect.top &&
      itemRect.left < playerRect.right &&
      itemRect.right > playerRect.left
    ) {
      if (esBuena) score++;
      else score--;
      scoreDisplay.textContent = `Puntos: ${score}`;
      clearInterval(intervalo);
      item.remove();
    }

    if (pos > 400) {
      clearInterval(intervalo);
      item.remove();
    }
  }, 20);
}

function iniciarJuego() {
  const caida = setInterval(crearCualidad, 1000);
  const cuentaAtras = setInterval(() => {
    time--;
    timerDisplay.textContent = `Tiempo: ${time}`;
    if (time <= 0) {
      clearInterval(caida);
      clearInterval(cuentaAtras);
      alert(`¡Juego terminado! Puntuación final: ${score}`);
    }
  }, 1000);
}

iniciarJuego();
