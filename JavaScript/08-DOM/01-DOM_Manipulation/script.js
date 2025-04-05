let colors = ["red", "blue", "green", "yellow", "purple"];
let shapes = ["square", "circle", "triangle"];
let colorIndex = 0;
let shapeIndex = 0;

window.onload = function() {
    let shapeContainer = document.getElementById("shape");
    let cShape = document.getElementById("change-shape");
    let cColor = document.getElementById("change-color");

    cShape.addEventListener("click", function() {
        shapeIndex = (shapeIndex + 1) % shapes.length;
        shapeContainer.className = "shape " + shapes[shapeIndex];
        if (shapes[shapeIndex] === "triangle") {
            shapeContainer.style.backgroundColor = "transparent";
            shapeContainer.style.borderBottomColor = colors[colorIndex];
        } else {
            shapeContainer.style.backgroundColor = colors[colorIndex];
        }
    });

    cColor.addEventListener("click", function() {
        colorIndex = (colorIndex + 1) % colors.length;
        if (shapes[shapeIndex] === "triangle") {
            shapeContainer.style.borderBottomColor = colors[colorIndex];
        } else {
            shapeContainer.style.backgroundColor = colors[colorIndex];
        }
    });
};
