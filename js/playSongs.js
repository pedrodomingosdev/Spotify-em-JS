const buttonLiked = document.getElementById("likeSongsBtn");
const buttonPlaySong = document.getElementById("playSongBtn");
const buttonOnRepeat = document.getElementById("repeatSongsBtn");
const buttonRandom = document.getElementById("randomSongsBtn");
const buttonAdvance = document.getElementById("advanceBtn");
const buttonBack = document.getElementById("backBtn");
const songLevel = document.getElementById("songLevel");
const albumInfo = document.getElementById("albumInfo");
const songbar = document.querySelector(".song-bar");
const volumeWrapper = document.querySelector(".volume-wrapper");
const volumeBar = document.querySelector(".volume-bar");
const volumeLevel = document.querySelector(".volume-level");

let numerosSorteados = new Set();
let totalAlbums = 99;

let volume = 0.5;
let isPlaying = true;
let isLiked = false;
let isRepeat = false;
let isRandom = false;
let isSongChosen = false;

let currentSongIndex = 1;
let duration = 0;
let elapsedSoFar = 0;
let startTimestamp = null;
let animationFrameId = null;

const globalSongDurations = [];

function sortearNumeroUnico(totalAlbums) {
    if (numerosSorteados.size >= totalAlbums) {
        numerosSorteados.clear();
    }

    let numero;
    do {
        numero = Math.floor(Math.random() * totalAlbums) + 1;
    } while (numerosSorteados.has(numero));

    numerosSorteados.add(numero);
    return numero;
}

function updateVolumeBar() {
    volumeLevel.style.height = `${volume * 100}%`;
}

function updateAlbum(currentSongIndex) {

    buttonPlaySong.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/>
                                </svg>`;

    if (!globalSongDurations.length || !globalSongDurations[currentSongIndex - 1]) {
        return;
    }

    

    if (isSongChosen) {
        document.querySelectorAll('.song-title.active').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.equalizer').forEach(el => el.remove());

        const songItems = document.querySelectorAll('.song-item');
        const songItem = songItems[currentSongIndex - 1];

        if (songItem) {
            const title = songItem.querySelector('.song-title');
            if (title) title.classList.add('active');

            const rightSide = songItem.querySelector('.song-right');
            if (rightSide) {
                rightSide.innerHTML += `
                    <div class="equalizer">
                        <span></span><span></span><span></span>
                    </div>`;
            }
        }
    }

    albumInfo.innerHTML = `<p>Song #${currentSongIndex}</p><small>Artist</small>`;

    cancelAnimationFrame(animationFrameId);

    songLevel.style.transition = 'none';
    songLevel.style.width = '0%';
    duration = globalSongDurations[currentSongIndex - 1];
    songLevel.offsetWidth;
    songLevel.style.transition = '';

    elapsedSoFar = 0;
    startTimestamp = null;

    if (!isRepeat) {
        buttonLiked.src = "./img/like-song-don't.png";
        buttonLiked.classList.remove("active");
    }
    isLiked = false;

    if (isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
    }
}


function animate(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;

    const elapsed = (timestamp - startTimestamp) / 1000 + elapsedSoFar;
    const progress = Math.min(elapsed / duration, 1);

    songLevel.style.width = `${progress * 100}%`;

    if (progress < 1 && isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
    } else if (progress >= 1 && isPlaying) {
        elapsedSoFar = 0;
        songLevel.style.width = '0%';
        startTimestamp = null;

        if (isRepeat) {
        } else if (isRandom) {
            currentSongIndex = sortearNumeroUnico(totalAlbums);
        } else {
            currentSongIndex++;
            if (currentSongIndex > totalAlbums) currentSongIndex = 1;
        }

        updateAlbum(currentSongIndex);
    }
}

function chooseSong(index, cor) {
    currentSongIndex = index || 1;
    isSongChosen = true;
    document.querySelector(".photo-album").style.backgroundColor = cor;
    buttonLiked.classList.remove("active");

    updateAlbum(index);
}

buttonAdvance.addEventListener("click", () => {
    if (isRepeat) {
        const currentWidth = parseFloat(songLevel.style.width) || 0;
        elapsedSoFar = (currentWidth / 100) * duration;
        if (isLiked) {
            isLiked = true;
            buttonLiked.classList.toggle("active", isLiked);
        }
    } else if (isRandom) {
        currentSongIndex = sortearNumeroUnico(totalAlbums)
        buttonLiked.classList.remove("active");
    } else {
        currentSongIndex = currentSongIndex < totalAlbums ? currentSongIndex + 1 : 1;
        buttonLiked.classList.remove("active");
    }

    updateAlbum(currentSongIndex);
});

buttonBack.addEventListener("click", () => {
    if (isRepeat) {
        const currentWidth = parseFloat(songLevel.style.width) || 0;
        elapsedSoFar = (currentWidth / 100) * duration;
        if (isLiked) {
            isLiked = true;
            buttonLiked.classList.toggle("active", isLiked);
        }
    } else {
        currentSongIndex = currentSongIndex > 1 ? currentSongIndex - 1 : totalAlbums;
        buttonLiked.classList.remove("active");
    }

    updateAlbum(currentSongIndex);
});

buttonPlaySong.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
        buttonPlaySong.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/>
                                    </svg>`;
        animationFrameId = requestAnimationFrame(animate);
    } else {
        buttonPlaySong.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M9 6l6 6-6 6"/>
                                    </svg>`;

        const computedWidth = parseFloat(songLevel.style.width) || 0;
        elapsedSoFar = (computedWidth / 100) * duration;

        startTimestamp = null;
        cancelAnimationFrame(animationFrameId);
    }
});

buttonLiked.addEventListener("click", () => {
    isLiked = !isLiked;
    buttonLiked.src = isLiked ? "./img/like-song-do.png" : "../img/like-song-don't.png";
    buttonLiked.classList.toggle("active", isLiked);
});

buttonOnRepeat.addEventListener("click", () => {
    isRepeat = !isRepeat;
    if (isRepeat) {
        isRandom = false;
        buttonRandom.classList.remove("active");
    }
    buttonOnRepeat.classList.toggle("active", isRepeat);
});

buttonRandom.addEventListener("click", () => {
    isRandom = !isRandom;

    try {
        const randomButton = document.getElementById("BtnRandomSongs");
        randomButton.classList.toggle("active", isRandom)
    } catch (e) {

    };

    if (isRandom) {
        isRepeat = false;
        buttonOnRepeat.classList.remove("active");
    }
    
    buttonRandom.classList.toggle("active", isRandom);
});

volumeWrapper.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (event.deltaY < 0) {
        volume = Math.min(1, volume + 0.05);
    } else {
        volume = Math.max(0, volume - 0.05);
    }
    updateVolumeBar();
});

volumeBar.addEventListener("click", (event) => {
    const rect = volumeBar.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const barHeight = rect.height;

    let newVolume = 1 - (clickY / barHeight);
    newVolume = Math.min(1, Math.max(0, newVolume));

    volume = newVolume;
    updateVolumeBar();
});

songbar.addEventListener("click", (event) => {
    event.preventDefault();

    const rect = songbar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const barWidth = rect.width;

    const newProgress = clickX / barWidth;

    songLevel.style.width = `${newProgress * 100}%`;

    elapsedSoFar = newProgress * duration;
    startTimestamp = null;

    if (isPlaying) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < totalAlbums; i++) {
        const min = Math.floor(Math.random() * 9) + 1;
        const sec = Math.floor(Math.random() * 60);
        globalSongDurations[i] = (min * 60) + sec;
    }


    updateAlbum(currentSongIndex);
    updateVolumeBar();

});
