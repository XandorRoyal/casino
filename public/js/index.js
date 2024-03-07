function saveUsername() {
    var player = document.getElementById('player').value;

    if (player == "") player = "Player";

    localStorage.setItem('player', player);

    location.href='./mainmenu.html';
}