import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const submit = document.getElementById('submit-btn');

let level;

if (!username) {
    window.location.href = "../index.html";
} else {
    let userRef = ref(db, 'users');

    get(query(userRef, orderByChild("name"), equalTo(username)))
    .then((snapshot)=> {
        if(!snapshot.exists()) {
            window.location.href = "../index.html";
        }
    })
}

submit.onclick = ()=> {
    let userRef = ref(db, 'users');

    get(query(userRef, orderByChild("name"), equalTo(username)))
    .then((snapshot)=> {
        if(snapshot.exists()) {
            userRef = ref(db, "users/" + username);
            get(userRef).then(snapshot => {
                const data = snapshot.val();
                level = data.currentlevel;
                if(level == 1) {
                    window.location.href = "./level1.html";
                }
                else if(level == 2) {
                    window.location.href = "./level2.html";
                }
                else if(level == 3) {
                    window.location.href = "./level3.html";
                }
                else if(level == 4) {
                    window.location.href = "./level4.html";
                }
                else if(level == 5) {
                    window.location.href = "./level5.html";
                }
                else if(level == 6) {
                    window.location.href = "./level6.html";
                }
                else if(level == 7) {
                    window.location.href = "./level7.html";
                }
                else {
                    window.location.href = "./level8.html";
                }
            });
        }
    })
};