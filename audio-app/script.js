// ambil audio jika ada di local storage

let playlist = JSON.parse(localStorage.getItem('playlist')) || []

// ambil element dari dom, "ID"
const audio = document.getElementById('audio')
const playPauseButton = document.getElementById('play-pause')
const playIcon = document.getElementById('play-icon')
const pauseIcon = document.getElementById('pause-icon')
const progressBar = document.getElementById('progress-bar')
const playlistElement = document.getElementById('playlist')
const audioUpload = document.getElementById('audio-upload')
const currentTrack = document.getElementById('current-track')

// fungsi untuk membuat list audio
function createPlaylist(){
    playlistElement.innerHTML = ''
    playlist.forEach((track, index) => {
        const li = document.createElement('li')
        li.textContent = track.title
        li.dataset.src = track.src

        li.addEventListener('click', () => {
            audio.src = track.src
            audio.play()
            updatePlayPauseIcon()

            document.querySelectorAll('#playlist li').forEach(item => item.classList.remove('active'))

            li.classList.add('active');

            currentTrack.textContent = track.title
        })

        playlistElement.appendChild(li)
    });
}

function updatePlayPauseIcon(){
    if(audio.paused){
        playIcon.style.display = 'block'
        pauseIcon.style.display = 'none'
    } else {
        playIcon.style.display = 'none'
        pauseIcon.style.display = 'block'
    }
}

// fungsi untuk save playlist ke local storage
function savePlaylist(){
    localStorage.setItem('playlist', JSON.stringify(playlist))
}

// inisialisasi playlist
createPlaylist()

// event listener untuk upload file audio
audioUpload.addEventListener('change', (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
        const reader = new FileReader()
        reader.onload = function(e){
            const track = {
                title: file.name,
                src: e.target.result
            }
            playlist.push(track)
            console.log(playlist)
            createPlaylist()
            savePlaylist()
        }
        reader.readAsDataURL(file)
    })
})

// event listener ke play pause
playPauseButton.addEventListener('click', () => {
    if(audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
    updatePlayPauseIcon()
})

// update progress bar saat audioo diputar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.style.width = progress + '%'
})

// reset ketika audio berakhir
audio.addEventListener('ended', () => {
    updatePlayPauseIcon()
    progressBar.style.width = '0'
    audio.pause()
    playIcon.style.display = 'block'
    pauseIcon.style.display = 'none'
})