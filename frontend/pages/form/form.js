let lastRoomIndex = -1;
const roomTasks = [];

window.addEventListener("load", function () {
    if (roomTasks.length === 0) {
        showEmptyForm();
        return;
    }
    roomTasks.forEach((item, i) => addKey(item, i));
    const myTabs = document.querySelectorAll("ul.nav-tabs > li");

    for (i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks)
    }
});

function showEmptyForm() {
    const emptyForm = this.document.getElementById('no-content');
    emptyForm.classList.remove('hidden');

    const inputForm = this.document.getElementById('fields');
    inputForm.classList.add('hidden');
}

function showInputFields() {
    const emptyForm = this.document.getElementById('no-content');
    emptyForm.classList.add('hidden');

    const inputForm = this.document.getElementById('fields');
    inputForm.classList.remove('hidden');
}

function addKey(room, index) {
    const tabs = this.document.getElementById('tabs');
    const newItem = document.createElement('li');

    const newAnchor = document.createElement('a');
    newAnchor.textContent = `Escape ${index + 1}`;

    newAnchor.setAttribute('href', `#tab-${index + 1}`);
    newAnchor.setAttribute('data-key', index);

    newItem.appendChild(newAnchor);

    tabs.prepend(newItem);
    newItem.addEventListener('click', clickRoom);
}

function myTabClicks(tabClickEvent) {
    tabClickEvent.preventDefault();
    for (let i = 0; i < myTabs.length; i++) {
        myTabs[i].classList.remove("active");
    }

    const clickedTab = tabClickEvent.currentTarget;
    clickedTab.classList.add("active");
}

function clickRoom(event) {
    const key = event.target.dataset.key;
    loadParameters(key);
}

function loadParameters(index) {
    if (roomTasks.length === 0) {
        return;
    }

    const type = document.getElementById('contentType');
    const solution = document.getElementById('contentSolution'); 
    const message = document.getElementById('contentMessage');

    if (lastRoomIndex != -1) {
        roomTasks[lastRoomIndex].type = type.value;
        roomTasks[lastRoomIndex].solution = solution.value;
        roomTasks[lastRoomIndex].message = message.value;
    }

    type.value = roomTasks[index].type;
    solution.value = roomTasks[index].solution;
    message.value = roomTasks[index].message;
    
    lastRoomIndex = index;
}

function newKey() {
    const newIndex = roomTasks.length;
    const tabs = this.document.getElementById('tabs');
    const newItem = document.createElement('li');

    const newAnchor = document.createElement('a');
    newAnchor.textContent = `Escape ${newIndex + 1}`;

    newAnchor.setAttribute('href', `#tab-${newIndex + 1}`);
    newAnchor.setAttribute('data-key', newIndex);

    newItem.appendChild(newAnchor);

    tabs.prepend(newItem);
    newItem.addEventListener('click', clickRoom);

    roomTasks.push({type: 'numeric', solution: '', message: ''});

    showInputFields();
    loadParameters(newIndex);
}

function removeCurrent() {
    const FIRST_ELEMENT = 0;
    roomTasks.splice(lastRoomIndex, 1);

    const roomKeyToBeRemoved = document.querySelector(`[data-key="${roomTasks.length}"]`);
    roomKeyToBeRemoved.parentElement.remove();

    lastRoomIndex = -1;
    loadParameters(FIRST_ELEMENT)

    if (roomTasks.length === 0) {
        showEmptyForm();
    }
}

function getTitle() {
    const roomName = document.getElementById('roomName');
    return roomName.value;
}

function submit() {
    if (roomTasks.length === 0) {
        return;
    }

    const FIRST_ELEMENT = 0;
    loadParameters(FIRST_ELEMENT);

    const title = getTitle();
    const message = {
        'room_name': title,
        //todo: ADD complexity
        'room_complexity': 3,
        'tasks': roomTasks
    };
    const headers = { "Content-Type": "application/json" };
    const init = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(message)
    };
    return fetch("../../../backend/api/escape-room/add-room.php", init).then(res => {
        return res;
    })
}