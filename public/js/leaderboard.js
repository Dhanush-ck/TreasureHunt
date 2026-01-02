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

const username = localStorage.getItem("username");
console.log(username);

async function getLevelCount() {
    const snapshot = await get(ref(db, "users"));

    let count = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
    };

    snapshot.forEach(userSnap => {
    const currentLevel = userSnap.val().currentlevel;
    count[currentLevel] = (count[currentLevel] ?? 0) + 1;
    });

    return count;
}

const content = document.querySelector('.content');

const levelCount = await getLevelCount();
content.innerHTML = "";
for(let i=9; i>=1; i--) {
    if(i == 9) {
        content.innerHTML += `<span>Winners</span><span>${levelCount[i]}</span>`
        continue;
    }
    content.innerHTML += `<span>Level ${i}</span><span>${levelCount[i]}</span>`
}