// Animal Config Data (Fixed the double .mp3.mp3 extension issue)
const animalData = {
    sheep: {
        text: "🐐 Sheep: Baa Baa! Eid Mubarak! Have a blessed Eid.",
        audioFile: "voice_preview_sheep.mp3.mp3" // এক্সটেনশন ঠিক করা হয়েছে
    },
    camel: {
        text: "🐪 Camel: Eid Mubarak! Warm wishes from the desert camel!",
        audioFile: "voice_preview_camel.mp3.mp3" // এক্সটেনশন ঠিক করা হয়েছে
    },
    cow: {
        text: "🐄 Cow: Moo Moo! Eid Mubarak! May your sacrifices be accepted.",
        audioFile: "voice_preview_cow.mp3" // এক্সটেনশন ঠিক করা হয়েছে
    }
};

let activeTimeout;
let currentAnimalAudio = null;
const bgMusic = document.getElementById('bgMusic');

// Handles first click on screen to bypass browser media limitations
function startExperience() {
    // 1. Fade out the overlay smoothly
    const overlay = document.getElementById('welcomeOverlay');
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);

    // 2. Animate and Reveal the card (making animal areas visible to touch/click)
    const card = document.getElementById('mainCard');
    card.classList.add('reveal');

    // 3. Play background music
    bgMusic.muted = false;
    bgMusic.volume = 0.3; // Low background volume
    bgMusic.play().catch(error => {
        console.log("Audio playback was blocked: ", error);
    });
}

// Updated interact function to accept specific animal element classes (Left vs Right)
function interact(animalType, elementClass, event) {
    event.stopPropagation(); // Stop overlay triggers

    const bubble = document.getElementById('speechBubble');
    // document.getElementById এর জায়গায় ক্লাস সিলেকশন করা হয়েছে যাতে দুই পাশের পশুই কাজ করে
    const element = document.querySelector('.' + elementClass);

    if (!element) return; // সিকিউরিটি চেক, এলিমেন্ট না থাকলে কোড ব্রেক করবে না

    // Reset and restart CSS animations
    element.classList.remove('jump-anim', 'sway-anim', 'shake-anim');
    void element.offsetWidth; // Force CSS reflow

    if (animalType === 'sheep') {
        element.classList.add('jump-anim');
    } else if (animalType === 'camel') {
        element.classList.add('sway-anim');
    } else if (animalType === 'cow') {
        element.classList.add('shake-anim');
    }

    // Display appropriate text dialogue
    bubble.innerHTML = animalData[animalType].text;
    bubble.classList.add('show');

    // Stop current animal sound if playing
    if (currentAnimalAudio) {
        currentAnimalAudio.pause();
        currentAnimalAudio.currentTime = 0;
    }

    // Ducking: drop background music to 8% volume during animal voiceovers
    bgMusic.volume = 0.08;

    currentAnimalAudio = new Audio(animalData[animalType].audioFile);
    currentAnimalAudio.volume = 1.0; // Play voiceover at full volume
    
    currentAnimalAudio.play().catch(error => {
        console.log("Animal voice clip playback blocked: ", error);
    });

    // Reset background volume when the animal voice finishes playing
    currentAnimalAudio.onended = () => {
        bgMusic.volume = 0.3;
    };

    // Hide text bubble automatically after 5 seconds
    clearTimeout(activeTimeout);
    activeTimeout = setTimeout(() => {
        bubble.classList.remove('show');
    }, 5000);
}
