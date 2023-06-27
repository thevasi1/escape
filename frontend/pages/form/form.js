const arr = [1, 2, 3];
let lastRoomIndex = -1;
const obj = {
    tasks: [
        {
            type: 'numeric',
            solution: '6-9',
            message: 'test-1'
        },
        {
            type: 'text',
            solution: '4-2-0',
            message: 'test-2'
        },
        {
            type: 'direction',
            solution: '9-6',
            message: 'test-3'
        },
        {
            type: 'shape',
            solution: '9-6-0',
            message: 'test-4'
        }
    ]
}
window.addEventListener("load", function () {
    const tabs = this.document.getElementById('tabs');
    obj.tasks.forEach((item, i) => addRoom(item, i));
    const myTabs = document.querySelectorAll("ul.nav-tabs > li");

    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("active");
        }
        let clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("active");
        tabClickEvent.preventDefault();
    }

    for (i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks)
    }

    function addRoom(room, index) {
        console.log(room);
        const newItem = document.createElement('li');

        const newAnchor = document.createElement('a');
        newAnchor.textContent = `Escape ${index + 1}`;

        newAnchor.setAttribute('href', `#tab-${index + 1}`);
        newAnchor.setAttribute('data-key', index);

        newItem.appendChild(newAnchor);

        tabs.prepend(newItem);
        newItem.addEventListener('click', clickRoom);
    }
});

function clickRoom(event) {
    const key = event.target.dataset.key;
    loadParameters(key);
}

function loadParameters(index) {
    const type = document.getElementById('contentType');
    const solution = document.getElementById('contentSolution'); 
    const message = document.getElementById('contentMessage');

    if (lastRoomIndex != -1) {
        obj.tasks[lastRoomIndex].type = type.value;
        obj.tasks[lastRoomIndex].solution = solution.value;
        obj.tasks[lastRoomIndex].message = message.value;
    }

    type.value = obj.tasks[index].type;
    solution.value = obj.tasks[index].solution;
    message.value = obj.tasks[index].message;
    
    lastRoomIndex = index;
}

function newRoom() {
    const tabs = this.document.getElementById('tabs');
    const newItem = document.createElement('li');

    const newAnchor = document.createElement('a');
    newAnchor.textContent = `Escape ${obj.tasks.length + 1}`;

    newAnchor.setAttribute('href', `#tab-${obj.tasks.length + 1}`);
    newAnchor.setAttribute('data-key', obj.tasks.length);

    newItem.appendChild(newAnchor);

    tabs.prepend(newItem);
    newItem.addEventListener('click', clickRoom);
    obj.tasks.push({});
}

function submit() {
    const message = {
        'room_name': 'lapa dundi',
        'room_complexity': 3,
        'tasks': [
            {
                type: 'numberic',
                solution: '6-9',
                message: 'test message'
            }
        ]
    };
    const headers = { "Content-Type": "application/json" };
    const init = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(message)
    };
    console.log(init);
    return fetch("../../../backend/api/escape-room/add-room.php", init).then(res => {
        return res;
    })
}