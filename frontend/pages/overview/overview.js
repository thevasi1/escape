const rooms = [1,2,3,4,5,6,7,8];

window.addEventListener("load", async function () {
    const headers = { "Content-Type": "application/json" };
    const init = { method: "GET", headers: headers };
    const res = await fetch("../../../backend/api/escape-room/get-all-rooms.php", init);
    const json = await res.json();
    const newRooms = JSON.parse(json.message);
    newRooms.forEach(item => insertRoomRow(item));
});

function insertRoomRow(room) {
    const rows = this.document.getElementById('rows');

    const newRoomRow = document.createElement('section');
    newRoomRow.classList.add("row");

    const newRoomHeader = document.createElement('header');
    const newRoomTitle = room.name;
    newRoomHeader.textContent = newRoomTitle;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.setAttribute('data-key', room.id);

    const exportButton = document.createElement('button');
    exportButton.classList.add("export");
    exportButton.addEventListener('click', exportRoom);
    exportButton.textContent = 'Export';

    const editButton = document.createElement('button');
    editButton.classList.add("edit");
    editButton.addEventListener('click', editRoom);
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete");
    deleteButton.addEventListener('click', deleteRoom);
    deleteButton.textContent = 'Delete';

    buttonsDiv.appendChild(exportButton);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    newRoomRow.appendChild(newRoomHeader);
    newRoomRow.appendChild(buttonsDiv);

    rows.appendChild(newRoomRow);
}

// function createButton() {}

function createRoom() {
    window.location.replace("../form/form.html");
}

function exportRoom() {
    console.log('export');
}

function editRoom() {
    console.log('edit');
}

async function deleteRoom(event) {
    const key = event.target.parentElement.dataset.key;
    console.log('delete ', key);
    const headers = { "Content-Type": "application/json" };
    const body = { id: key };
    const init = { method: "POST", headers: headers, body: JSON.stringify(body) };
    await fetch("../../../backend/api/escape-room/delete-room.php", init);
}

function logout() {
    // TODO: add logout func here
    window.location.replace("../login/login.html");
}
