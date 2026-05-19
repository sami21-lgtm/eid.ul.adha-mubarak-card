
const animalData = {
    sheep: {
        text: "🐐 Sheep: Baa Baa! Eid Mubarak! Have a blessed Eid.",
        audioFile: "voice_preview_sheep.mp3.mp3"
    },
    camel: {
        text: "🐪 Camel: Eid Mubarak! Warm wishes from the desert camel!",
        audioFile: "voice_preview_camel.mp3.mp3" 
    },
    cow: {
        text: "🐄 Cow: Moo Moo! Eid Mubarak! May your sacrifices be accepted.",
        audioFile: "voice_preview_cow.mp3.mp3"
    }
};

let activeTimeout;
let currentAnimalAudio = null;
const bgMusic = document.getElementById('bgMusic');

function startExperience() {
    const overlay = document.getElementById('welcomeOverlay');
    overlay.style.opacity = 0;
    setTimeout(() => { overlay.style.display = 'none'; }, 500);

    const card = document.getElementById('mainCard');
    card.classList.add('reveal');

    bgMusic.muted = false;
    bgMusic.volume = 0.3;
    bgMusic.play().catch(error => { console.log("Audio play blocked: ", error); });
}

function interact(animalType, elementClass, event) {
    event.stopPropagation();

    const bubble = document.getElementById('speechBubble');
    const element = document.querySelector('.' + elementClass);

    if (!element) return;

    element.classList.remove('jump-anim', 'sway-anim', 'shake-anim');
    void element.offsetWidth; 

    if (animalType === 'sheep') {
        element.classList.add('jump-anim');
    } else if (animalType === 'camel') {
        element.classList.add('sway-anim');
    } else if (animalType === 'cow') {
        element.classList.add('shake-anim');
    }

    bubble.innerHTML = animalData[animalType].text;
    bubble.classList.add('show');

    if (currentAnimalAudio) {
        currentAnimalAudio.pause();
        currentAnimalAudio.currentTime = 0;
    }

    bgMusic.volume = 0.08;

    // সরাসরি গিটহাবের ফাইল পাথ লোড করা হচ্ছে
    currentAnimalAudio = new Audio(animalData[animalType].audioFile);
    currentAnimalAudio.volume = 1.0;
    
    currentAnimalAudio.play().catch(error => { 
        console.log("Audio play blocked or failed: ", error); 
    });

    currentAnimalAudio.onended = () => { bgMusic.volume = 0.3; };

    clearTimeout(activeTimeout);
    activeTimeout = setTimeout(() => { bubble.classList.remove('show'); }, 5000);
}
