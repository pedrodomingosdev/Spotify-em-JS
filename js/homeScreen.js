const cores = [
  "#1DB954", "#191414", "#121212", "#23D18B", "#1ED760",
  "#0A0A0A", "#282828", "#2E8B57", "#66FFB2", "#00FF7F",
  "#3CB371", "#2ECC71", "#00C896", "#32CD32", "#00FFB3",
  "#00FA9A", "#20C997", "#40E0D0", "#00CED1", "#5F9EA0",
  "#008080", "#48D1CC", "#1CA9C9", "#3ABEFF", "#1E90FF",
  "#007ACC", "#0066CC", "#6A5ACD", "#7B68EE", "#9370DB",
  "#8A2BE2", "#4B0082", "#8B008B", "#9400D3", "#BA55D3",
  "#DA70D6", "#DDA0DD", "#FF69B4", "#FF1493", "#DB7093",
  "#C71585", "#E75480", "#FF6EC7", "#FF00FF", "#D02090",
  "#F08080", "#FA8072", "#FF4500", "#FF6347", "#FFA07A",
  "#FF7F50", "#FF8C00", "#FFB347", "#FFD700", "#E1AD01",
  "#F0E68C", "#FFFACD", "#222222", "#1A1A1A", "#121212",
  "#0D0D0D", "#050505", "#FFFFFF", "#B0E0E6", "#ADD8E6",
  "#87CEFA", "#87CEEB", "#4682B4", "#5DADE2", "#3498DB",
  "#2E86C1", "#1F618D", "#154360", "#34495E", "#2C3E50",
  "#22313F", "#1B2631", "#283747", "#17202A", "#00FFFF",
  "#00BFFF", "#66CDAA", "#98FB98", "#90EE90", "#3CB371",
  "#228B22", "#006400", "#013220"
];



function loadHomeScreen() {
  const main = document.getElementById('main');

  main.innerHTML = `
    <div id="message" class="main-content"></div>
    <div id="carrosel" class="carrosel"></div>
    <div class="main-content">
      <h2>Feitas para você</h2>
      <div id="carrossel-vertical" class="carrossel-vertical"></div>
    </div>
  `;

  const messageElem = document.getElementById('message');
  const carrosel = document.getElementById('carrosel');
  const carroselVertical = document.getElementById('carrossel-vertical');

  mensagemDia(messageElem);
  createPlaylistSpotify(carrosel);
  createMixForU(carroselVertical);
}

function mensagemDia(messageElem) {
  const horaAtual = new Date().getHours();
  let saudacao;

  if (horaAtual >= 6 && horaAtual < 12) saudacao = "Bom dia";
  else if (horaAtual >= 12 && horaAtual < 18) saudacao = "Boa tarde";
  else saudacao = "Boa noite";

  messageElem.innerHTML = `<h2>${saudacao}</h2>`;
}

function createPlaylistSpotify(carrosel) {

  carrosel.innerHTML = '';
  for (let i = 1; i < 9; i++) {
    let cor = cores[Math.floor(Math.random() * cores.length)];
    carrosel.innerHTML += `
      <div onclick="chooseAlbum('Album', ${i}, '${cor}')" class="mix-foru">
        <div class="album" style="background-color: ${cor};"></div>
        <p class="title">Album #${i}</p>
      </div>
    `
  }
}


function createMixForU(carroselVertical) {
  carroselVertical.innerHTML = '';
  for (let i = 1; i <= 24; i++) {
    let cor = cores[Math.floor(Math.random() * cores.length)];
    carroselVertical.innerHTML += `
      <div onclick="chooseAlbum('Playlist', ${i}, '${cor}')" class="mix-foru-vertical">
        <div class="album-vertical" style="background-color: ${cor};"></div>
        <p class="title">Playlist #${i}</p>
      </div>
    `;
  }


}

const linkInicial = document.querySelector('a[href="index.html"]');
linkInicial.addEventListener('click', function (event) {
  event.preventDefault();
  loadHomeScreen();
  isSongChosen = false;
});


document.addEventListener('click', function (event) {
  if (event.target.closest('#backToHomeBtn')) {
    event.preventDefault();
    loadHomeScreen();
    isSongChosen = false;
  }
});

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', function(event) {
  event.stopPropagation();  // Para não deixar o clique "subir" para o body
  menu.classList.toggle('show');  // Aparece / some o menu
});

// Fecha o menu se clicar fora dele
document.body.addEventListener('click', function() {
  menu.classList.remove('show');
});

// Para evitar que clique dentro do menu feche ele
menu.addEventListener('click', function(event) {
  event.stopPropagation();
});

loadHomeScreen();