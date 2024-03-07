function retrieveUserNames() {
    console.log('Loading Username');
    let player = localStorage.getItem('player');

    if (player==null) {
        console.log("Loaded Player 1 NULL");
        location.href='./index.html';
    }

    document.getElementById("player").innerHTML = player;
    }

    window.addEventListener("load", (event) => {
    retrieveUserNames();
    });