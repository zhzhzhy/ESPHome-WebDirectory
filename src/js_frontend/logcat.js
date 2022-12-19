function showAllLogs(arg) { 
    let logPane = document.getElementById("Logcat-pane");
    let logdiv = logPane.getElementsByClassName("fixHeightScroll")[0];
    if (logdiv.getElementsByClassName("empty-text")[0]) {
        logdiv.removeChild(logdiv.getElementsByClassName("empty-text")[0]); 
    }
    let onelog = document.createElement("p");
    onelog.textContent = `ID: ${arg.id} DATA: ${arg.data}`
    onelog.classList.add("primary");
    logdiv.prepend(onelog);
}