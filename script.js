// Animal database configuration
const animalData = {
    sheep: {
        text: "🐐 Sheep: Baa Baa! Eid Mubarak! Have a blessed Eid.",
        audioFile: "sheep.mp3" // Plays your custom sheep audio
    },
    camel: {
        text: "🐪 Camel: Eid Mubarak! Warm wishes from the desert camel!",
        audioFile: "camel.mp3" // Plays your custom camel audio
    },
    cow: {
        text: "🐄 Cow: Moo Moo! Eid Mubarak! May your sacrifices be accepted.",
        audioFile: "cow.mp3" // Plays your custom cow audio
    }
};

let activeTimeout;
let currentAudio = null; // Tracks currently playing audio

function interact(animalType) {
    const bubble = document.getElementById('speechBubble');
    const element = document.getElementById(animalType);

    // 1. Reset and trigger CSS Animations
    element.classList.remove('jump-anim', 'sway-anim', 'shake-anim');
    void element.offsetWidth; // Triggers DOM reflow to restart animation

    if (animalType === 'sheep') {
        element.classList.add('jump-anim');
    } else if (animalType === 'camel') {
        element.classList.add('sway-anim');
    } else if (animalType === 'cow') {
        element.classList.add('shake-anim');
    }

    // 2. Display and Update Speech Bubble text
    bubble.innerHTML = animalData[animalType].text;
    bubble.classList.add('show');

    // 3. Play your voice clips
    // Stop previous audio playback if another animal is clicked
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Play the new audio file
    currentAudio = new Audio(animalData[animalType].audioFile);
    currentAudio.play().catch(error => {
        console.log("Audio playback blocked. Click on the card interface to activate: ", error);
    });

    // 4. Hide speech bubble after 5 seconds
    clearTimeout(activeTimeout);
    activeTimeout = setTimeout(() => {
        bubble.classList.remove('show');
    }, 5000);
}
