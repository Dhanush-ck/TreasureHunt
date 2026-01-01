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

submitBtn.addEventListener('click', register);

function register() {
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

    const userRef = ref(db, 'users');
    const newUserRef = ref(db, 'users/'+username);
    
    get(query(userRef, orderByChild("name"), equalTo(username)))
    .then((snapshot)=> {
        if(snapshot.exists()) {
            console.log('This name already exists');
            errorMessage.innerHTML = "Name already taken";
            messagePopup();
        }
        else {
            set(newUserRef, {
                name: username,
                password: password,
                currentlevel: 1
            }).then(() => {
                localStorage.setItem("username", username);
                localStorage.setItem("level", 1);
                console.log("User added successfully!");
                window.location.href = './lobby.html';
            }).catch((error) => {
                console.error("Error adding user: ", error);
            });
        }
    })
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