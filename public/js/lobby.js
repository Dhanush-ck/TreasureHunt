import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxFLQifojzsNjc98vCUPac8IYKzcfrneM",
  authDomain: "treasurehuntv26.firebaseapp.com",
  databaseURL: "https://treasurehuntv26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "treasurehuntv26",
  storageBucket: "treasurehuntv26.firebasestorage.app",
  messagingSenderId: "824182490010",
  appId: "1:824182490010:web:8d145dd3bc2411d6677023"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const level = 1;

const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "../index.html";
}

const errorMessage = document.querySelector('.error');

const submit = document.getElementById('submit-btn');

const intro = document.getElementById('intro-loading');
const container = document.querySelector('.container');
const outro = document.getElementById('outro');

const correctAnswer = "11a8a3cfab9b65268d55a7d749d6ad58d7fe710ed09e5970793254685b09008a";

async function hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function markLevelStart() {

  await update(ref(db, `users/${username}/levels/${level}`), {
    start: Date.now()
  });

}

async function checkAnswer(userInput) {
    
    const userHash = await hash(userInput);
    
    if(userHash === correctAnswer){
        console.log("Correct Answer");
        errorMessage.innerHTML = "Correct Answer";
        messagePopup();
        container.style.display = 'none';
        outro.style.display = 'flex';
        setTimeout(async() => {
            await markLevelStart();
            window.location.href = "./levels/level1.html";
        }, 2300);
    }
    else {
        console.log("Wrong Answer");
        errorMessage.innerHTML = "Wrong Answer";
        messagePopup();
    }
}

submit.addEventListener('click', ()=> {
    const answer = document.getElementById('answer');
    checkAnswer(answer.value);
})

function messagePopup() {
    if(errorMessage.classList.contains('fadeOut')){
        errorMessage.classList.remove('fadeOut');
    }
    errorMessage.classList.add('fadeIn');
    setTimeout(() => {
        errorMessage.classList.remove('fadeIn');
        errorMessage.classList.add('fadeOut');
    }, 2000);
}

window.onload = ()=> {
    setTimeout(() => {
        intro.style.display = 'none';
        container.style.display = 'flex';
    }, 4000);
}