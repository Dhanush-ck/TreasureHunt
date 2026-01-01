import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, orderByChild, equalTo, query  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const submitBtn = document.getElementById('submit-btn');

const errorMessage = document.querySelector('.error');

submitBtn.addEventListener('click', login);

function login() {
  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  if(!username || username == " ") {
    errorMessage.innerHTML = "Name can't be empty";
    messagePopup();
    return;
  }

  if(!password || password == " ") {
    errorMessage.innerHTML = "Password can't be empty";
    messagePopup();
    return;
  }
  
  const userRef = ref(db, "users/" + username);

  get(userRef).then((snapshot) => {
    if (!snapshot.exists()) {
      console.log("User not found");
      errorMessage.innerHTML = "User not found";
      messagePopup();
    } else {
      const data = snapshot.val();
      if (data.password === password) {
        localStorage.setItem("username", username);
        localStorage.setItem("level", data.currentLevel);
        console.log("Login Successfull");
        const level = data.currentlevel;
        if(level == 1) {
            window.location.href = "./levels/level1.html";
        }
        else if(level == 2) {
            window.location.href = "./levels/level2.html";
        }
        else if(level == 3) {
            window.location.href = "./levels/level3.html";
        }
        else if(level == 4) {
            window.location.href = "./levels/level4.html";
        }
        else if(level == 5) {
            window.location.href = "./levels/level5.html";
        }
        else if(level == 6) {
            window.location.href = "./levels/level6.html";
        }
        else if(level == 7) {
            window.location.href = "./levels/level7.html";
        }
        else {
            window.location.href = "./levels/level8.html";
        }
      } else {
        console.log("Wrong Password");
        errorMessage.innerHTML = "Wrong Password";
        messagePopup();
      }
    }
  });
}

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