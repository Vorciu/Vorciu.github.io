window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
    window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
curr_month++;
var curr_year = d.getFullYear();
var curr_hour = d.getHours();

var curr_min = d.getMinutes();

curr_min = curr_min + "";

if (curr_min.length == 1) {
    curr_min = "0" + curr_min;
}

currentTime = (curr_date + "-" + curr_month + "-" + curr_year + ' ' + curr_hour + ":" + curr_min);

var request = window.indexedDB.open("newDatabase", 1);
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var players = db.createObjectStore("player", { autoIncrement: true });
}

request.onsuccess = function (event) {
    db = request.result;
    getAndDisplayNotes(db);
};

request.onerror = function (event) {
    alert('error opening database ' + event.target.errorCode);
};

function addStickyNote(db, message) {
    var tx = db.transaction(['player'], 'readwrite');
    var store = tx.objectStore('player');
    var note = { text: message, timestamp: currentTime, score: myScore, gameTime: time };
    store.add(note);
    tx.oncomplete = function () { getAndDisplayNotes(db); }
    tx.onerror = function (event) {
        alert('error storing note ' + event.target.errorCode);
    }
}

function submitNote() {
    var message = document.getElementById('newmessage');
    addStickyNote(db, message.value);
    message.value = '';
}

function getAndDisplayNotes(db) {
    let tx = db.transaction(['player'], 'readonly');
    let store = tx.objectStore('player');
    let req = store.openCursor();
    let allPlayers = [];

    req.onsuccess = function (event) {
        let cursor = event.target.result; if (cursor != null) {
            allPlayers.push(cursor.value);
            cursor.continue();
        } else {
            displayNotes(allPlayers);
        }
    }
    req.onerror = function (event) {
        alert('error in cursor request ' + event.target.errorCode);
    }
}

function displayNotes(players) {
    let listHTML = '<ul>';
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        listHTML += '<li>' + 'Nick: ' + player.text + ' ' + 'Date: ' +
            player.timestamp + ' ' + 'Score: ' +
            player.score + ' Game Time: ' +
            player.gameTime + 's' + '</li>';
    }
    document.getElementById('players').innerHTML = listHTML;
}