import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const level = 3;

const username = localStorage.getItem("username");
console.log(username);

if (!username) {
  window.location.href = "../index.html";
} else {
      let userRef = ref(db, 'users');
      
      get(query(userRef, orderByChild("name"), equalTo(username)))
      .then((snapshot)=> {
          if(snapshot.exists()) {
              console.log('User exists');
              userRef = ref(db, "users/" + username);
              get(userRef).then(snapshot => {
                  const data = snapshot.val();
                  if(level > data.currentlevel) {
                      window.location.href = "../levels/smart.html";
                  }
              });
          }else {
            window.location.href = "../index.html";
          }
      })
}

function markNextLevelStart() {

  update(ref(db, `users/${username}/levels/${level+1}`), {
    start: Date.now()
  });
  
}

async function completeLevel() {
  const levelRef = ref(db, `users/${username}/levels/${level}`);
  const snap = await get(levelRef);

  if (!snap.exists() || !snap.val().start) {
    console.error("Start time missing");
    return;
  }

  const start = snap.val().start;
  const end = Date.now();

  const timeTaken = Math.round((end - start) / 1000);

  await update(levelRef, {
    end: end,
    time: timeTaken
  });
}


const story = "Not all treasures are buried.<br>Some are grown,<br>watched more than visited.";

const riddle = "I was not born of nature,<br>yet nature chose me.<br>I hold no fish,<br>but life still floats above me.<br>Find where beauty grows without soil."

const inputTag = "<input type='text' id='answer' placeholder='Enter the answer'>";

const errorMessage = document.querySelector('.error');

const content = document.querySelector('.content');

const next = document.getElementById('next');
const prev = document.getElementById('prev');
const submit = document.getElementById('submit-btn');

const correctAnswer = "c4e18739f6b3a826e87c460c3142d92f2f80ccfcac1d7aded68d9aeeef2846c2";

content.innerHTML = story;

next.onclick = ()=>{
    content.innerHTML = riddle + inputTag;
    next.style.display = 'none';
    submit.style.display = 'block';
    prev.style.display = 'block';
}

prev.onclick = ()=> {
    content.innerHTML = story;
    next.style.display = 'block';
    submit.style.display = 'none';
    prev.style.display = 'none';
}


async function hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkAnswer(userInput) {
    
    const userHash = await hash(userInput);
    
    if(userHash === correctAnswer){
        console.log("Correct Answer");
        errorMessage.innerHTML = "Correct Answer";
        messagePopup();
        set(ref(db, "users/" + username + "/currentlevel"), level + 1);
        await completeLevel();
        markNextLevelStart();
        window.location.href = "../levels/level4.html";
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
