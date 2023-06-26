const arr = [1, 2, 3];
window.addEventListener("load", function () {
    const tabs = this.document.getElementById('tabs');
    arr.forEach((item, i) => {
        const newItem = document.createElement('li');
        const newAnchor = document.createElement('a');
        newAnchor.textContent = `Room ${i}`;
        newAnchor.setAttribute('href', `#tab-${i}`);
        newItem.appendChild(newAnchor);

        tabs.appendChild(newItem);
    })
    const myTabs = document.querySelectorAll("ul.nav-tabs > li");

    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("active");
        }
        let clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("active");
        tabClickEvent.preventDefault();
        let myContentPanes = document.querySelectorAll(".tab-pane");
        for (i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("active");
        }
        let anchorReference = tabClickEvent.target;
        let activePaneId = anchorReference.getAttribute("href");
        let activePane = document.querySelector(activePaneId);
        activePane.classList.add("active");
    }

    for (i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks)
    }
});

function submit() {
    console.log("aaaa");
    const message = {
        'room_name': 'lapa dundi',
        'room_complexity': 3,
        'tasks': [
            {
                'type': 'numberic',
                'solution': '6-9'
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