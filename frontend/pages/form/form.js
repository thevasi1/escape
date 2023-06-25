const arr = [1, 2, 3];
window.addEventListener("load", function () {
    let myTabs = document.querySelectorAll("ul.nav-tabs > li");
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
    arr.forEach(element => {
        const fruitList = document.getElementById("fruit");

        // Add 3 new <li>'s to the list of fruits
        fruitList.insertAdjacentHTML("beforeend", `
            <li>Pear</li>
            <li>Orange</li>
            <li>Grape</li>
        `);
    });
});