document.getElementById("colorInput").addEventListener("input", function(event){
    // Get the Selected color from input
    let selectedColor = event.target.value

    // Update the color text
    document.getElementById("colorCode").textContent = selectedColor

    // Update the background color of the display box
    document.getElementById("colorDisplay").style.backgroundColor = selectedColor


})