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

const level = 9;

const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "./index.html";
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
                      window.location.href = "./levels/smart.html";
                  }
              });
          }else {
            window.location.href = "./index.html";
          }
      })
}


const story = "You chased numbers,<br>but solved meaning.<br>The treasure was never hidden —<br>it was remembered.";

const content = document.querySelector('.content');

content.innerHTML = story;
