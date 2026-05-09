// Animal database configuration
const animalData = {
    sheep: {
        text: "🐐 Sheep: Baa Baa! Eid Mubarak! Have a blessed Eid.",
        audioFile: "sheep.mp3"
    },
    camel: {
        text: "🐪 Camel: Eid Mubarak! Warm wishes from the desert camel!",
        audioFile: "camel.mp3"
    },
    cow: {
        text: "🐄 Cow: Moo Moo! Eid Mubarak! May your sacrifices be accepted.",
        audioFile: "cow.mp3"
    }
};

let activeTimeout;
let currentAnimalAudio = null; // Tracks currently playing animal voice
let bgMusicStarted = false;

const bgMusic = document.getElementById('bgMusic');
const mainCard = document.getElementById('mainCard');

// 1. Play Background Music on the very first click anywhere on the page
document.addEventListener('click', () => {
    if (!bgMusicStarted) {
        bgMusic.volume = 0.3; // Set background music volume to 30% (soft/mellow)
        bgMusic.play().then(() => {
            bgMusicStarted = true;
            document.querySelector('.instruction').innerText = "Click on any animal! 🐐 🐪 🐄";
        }).catch(error => {
            console.log("Audio play failed: ", error);
        });
    }
});

function interact(animalType, event) {
    // Prevent the click event from bubbling up and triggering other click listeners
    event.stopPropagation();

    const bubble = document.getElementById('speechBubble');
    const element = document.getElementById(animalType);

    // If background music hasn't started yet, play it now
    if (!bgMusicStarted) {
        bgMusic.volume = 0.3;
        bgMusic.play();
        bgMusicStarted = true;
    }

    // 2. Reset and trigger CSS Animations
    element.classList.remove('jump-anim', 'sway-anim', 'shake-anim');
    void element.offsetWidth; // Triggers DOM reflow to restart animation

    if (animalType === 'sheep') {
        element.classList.add('jump-anim');
    } else if (animalType === 'camel') {
        element.classList.add('sway-anim');
    } else if (animalType === 'cow') {
        element.classList.add('shake-anim');
    }

    // 3. Display and Update Speech Bubble text
    bubble.innerHTML = animalData[animalType].text;
    bubble.classList.add('show');

    // 4. Play Animal Voice Clip & Manage Volumes
    if (currentAnimalAudio) {
        currentAnimalAudio.pause();
        currentAnimalAudio.currentTime = 0;
    }

    // Lower background music volume so the animal voice is clear (Ducking Effect)
    bgMusic.volume = 0.08; // Reduce background music to 8% volume

    currentAnimalAudio = new Audio(animalData[animalType].audioFile);
    currentAnimalAudio.volume = 1.0; // Play animal voice at full volume
    
    currentAnimalAudio.play().catch(error => {
        console.log("Animal audio failed: ", error);
    });

    // When animal voice finishes, restore background music volume
    currentAnimalAudio.onended = () => {
        bgMusic.volume = 0.3; // Restore bg music to 30%
    };

    // 5. Hide speech bubble after 5 seconds
    clearTimeout(activeTimeout);
    activeTimeout = setTimeout(() => {
        bubble.classList.remove('show');
    }, 5000);
}
