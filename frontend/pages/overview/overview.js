const rooms = [1,2,3,4,5,6,7,8];

window.addEventListener("load", function () {
    //TODO: add function to get all rooms
    rooms.forEach((item, i) => insertRoomRow(item, i));
});

function insertRoomRow(room, index) {
    const rows = this.document.getElementById('rows');

    const newRoomRow = document.createElement('section');
    newRoomRow.classList.add("row");

    const newRoomHeader = document.createElement('header');
    //TODO: get this from the object
    const newRoomTitle = 'asdasdasd';
    newRoomHeader.textContent = newRoomTitle;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.setAttribute('data-key', index);

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

function deleteRoom() {
    console.log('delete');
}

function logout() {
    // TODO: add logout func here
    window.location.replace("../login/login.html");
}
