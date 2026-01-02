const logout = document.getElementById('logout');

logout.onclick = ()=> {
    localStorage.removeItem('username');
}