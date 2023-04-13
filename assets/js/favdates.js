// Check local storage for any saved date choices

let storage = JSON.parse(localStorage.getItem(`favorites`)) || []
let dateContainer = document.querySelector(`.dateContainer`)
for (let i = 0; i < storage.length; i++) {
    let date = storage[i]
    let inputt = document.createElement(`input`)
    inputt.textContent = date
    dateContainer.appendChild(inputt)
}
