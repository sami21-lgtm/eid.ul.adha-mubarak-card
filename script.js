// Animal Config Data (.mp3.mp3 এক্সটেনশন সহ এবং টেক্সট ছাড়া ক্লিন অবজেক্ট)
const animalData = {
    sheep: {
        audioFile: "voice_preview_sheep.mp3.mp3"
    },
    camel: {
        audioFile: "voice_preview_camel.mp3.mp3"
    },
    cow: {
        audioFile: "voice_preview_cow.mp3.mp3"
    }
};

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

    const element = document.querySelector('.' + elementClass);
    if (!element) return;

    // অ্যানিমেশন ট্রিগার
    element.classList.remove('jump-anim', 'sway-anim', 'shake-anim');
    void element.offsetWidth; 

    if (animalType === 'sheep') {
        element.classList.add('jump-anim');
    } else if (animalType === 'camel') {
        element.classList.add('sway-anim');
    } else if (animalType === 'cow') {
        element.classList.add('shake-anim');
    }

    // আগের কোনো পশুর ভয়েস চলতে থাকলে তা বন্ধ করা
    if (currentAnimalAudio) {
        currentAnimalAudio.pause();
        currentAnimalAudio.currentTime = 0;
    }

    // ব্যাকগ্রাউন্ড মিউজিক হালকা ডাকিং করা
    bgMusic.volume = 0.08;

    // অডিও প্লে
    currentAnimalAudio = new Audio(animalData[animalType].audioFile);
    currentAnimalAudio.volume = 1.0;
    
    currentAnimalAudio.play().catch(error => { 
        console.log("Audio play blocked or failed: ", error); 
    });

    currentAnimalAudio.onended = () => { bgMusic.volume = 0.3; };
}
