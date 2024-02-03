function openTab(event, tabName) {
    var i, tabContent, leftTab;

    tabContent = document.getElementsByClassName('tabContent');
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    leftTab = document.getElementsByClassName('leftTab');
    for (i = 0; i < leftTab.length; i++) {
        leftTab[i].className = leftTab[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";

}
// document.getElementById('dashboardTab').click()