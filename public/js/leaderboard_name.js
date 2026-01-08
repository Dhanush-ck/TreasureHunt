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
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
    };

    snapshot.forEach(userSnap => {
    const currentLevel = userSnap.val().currentlevel;
    count[currentLevel].push(userSnap.val().name);
    });

    return count;
}
getLevelCount();

const content = document.querySelector('.content');

const levelCount = await getLevelCount();
content.innerHTML = "";
for(let i=9; i>=1; i--) {
    if(i == 9) {
        content.innerHTML += `<span>Winners</span>`;
        if(levelCount[i].length == 0) {
            content.innerHTML += 'Empty';
        }
        else {
            let temp = "";
            for(let j=0; j<levelCount[i].length; j++) {
                temp += `<span>${levelCount[i][j]}</span>`
            }
            content.innerHTML += `<span>${temp}</span>`
        }
        continue;
    }
    content.innerHTML += `<span>Level ${i}</span>`;
    if(levelCount[i].length == 0) {
        content.innerHTML += 'Empty';
    }
    else {
        let temp = "";
        for(let j=0; j<levelCount[i].length; j++) {
            temp += `<span>${levelCount[i][j]}</span>`
        }
        content.innerHTML += `<span>${temp}</span>`;
    }
}
