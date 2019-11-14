function addSelectorListeners() {
    const selectorDiv = document.getElementById("selectorControl")


    selectorDiv.addEventListener("click", selectionHandler)

    function selectionHandler(ev) {
        if(ev.target.className === "nav-link"){
            ev.stopPropagation() 
            let selection_id = ev.target.dataset.selected_id
            let currActive = selectorDiv.querySelectorAll(".active")
            currActive.forEach((el) => {
                if(el.className.includes("nav-link"))el.className = "nav-link"
                if(el.className.includes("tab-pane")){
                    el.className = "tab-pane"
                    el.parentElement.querySelector(`[data-desc_id="${selection_id}"]`).className = "tab-pane fade show active"
                }
            })
            ev.target.className = "nav-link active"
        }
    }
    
}