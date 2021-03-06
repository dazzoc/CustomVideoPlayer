// get out ellements 
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build funcions 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    // console.log(icon); 
    toggle.textContent = icon;
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    video[this.name] = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};


// hook up the event listeners
// video play / plause
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        togglePlay(); 
    }
};

// Progress bar
let mousedown = false;
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Ranges 
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
 