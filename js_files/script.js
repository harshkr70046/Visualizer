let arraycontainer = document.querySelector("#arrayContainer");
let Target = document.querySelector("#Target");
let Linear = document.querySelector("#Linear");
let refresh = document.querySelector("#refresh");
let Binary = document.querySelector("#Binary");

function handleTarget() {
    let val = Math.floor(Math.random() * 50);
    Target.textContent = `Target:${val}`;
}
Target.addEventListener("click", handleTarget);

for (let i = 0; i <= 50; i++) {
    arraycontainer.innerHTML += `<div class="element">${i}</div>`;
}

function handleRefersh() {
    window.location.reload();
}
refresh.addEventListener("click", handleRefersh);

function disableButtons() {
    Linear.disabled = true;
    Binary.disabled = true;
    Target.disabled = true;
    refresh.disabled = true;

    Linear.style.opacity = "0.5";
    Binary.style.opacity = "0.5";
    refresh.style.opacity = "0.5";
}

function enableButtons() {
    Linear.disabled = false;
    Binary.disabled = false;
    refresh.disabled = false;
    Target.disabled = false;

    Linear.style.opacity = "1";
    Binary.style.opacity = "1";
    refresh.style.opacity = "1";
}

async function handleLinear() {
    disableButtons(); // Disable other buttons

    console.log("Linear search started!");
    let elements = document.querySelectorAll(".element");
    let targetValue = parseInt(Target.textContent.split(":")[1]);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "red"; // Mark as checked
        await new Promise((resolve) => setTimeout(resolve, 200)); // Delay for visualization

        if (parseInt(elements[i].textContent) === targetValue) {
            elements[i].style.backgroundColor = "green"; // Mark as found
            console.log(`Target ${targetValue} found at index ${i}`);
            enableButtons(); // Enable buttons after search
            return;
        }
    }

    console.log(`Target ${targetValue} not found`);
    enableButtons(); // Enable buttons after search
}

async function handleBinarySearch() {
    disableButtons(); // Disable other buttons

    console.log("Binary search started!");
    let elements = document.querySelectorAll(".element");
    let targetValue = parseInt(Target.textContent.split(":")[1]);

    let left = 0,
        right = elements.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // Highlight the mid element (Yellow for checking)
        elements[mid].style.backgroundColor = "blue";
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization

        let midValue = parseInt(elements[mid].textContent);

        if (midValue === targetValue) {
            elements[mid].style.backgroundColor = "green"; // Found
            console.log(`Target ${targetValue} found at index ${mid}`);
            enableButtons(); // Enable buttons after search
            return;
        } else if (midValue < targetValue) {
            // Fade out the left side elements before mid
            for (let i = left; i < mid; i++) {
                elements[i].style.transition = "opacity 0.5s ease-out";
                elements[i].style.opacity = "0.3"; // Dim the elements
            }
            elements[mid].style.backgroundColor = "red"; // Mid is incorrect
            left = mid + 1; // Move right
        } else {
            // Fade out the right side elements after mid
            for (let i = mid + 1; i <= right; i++) {
                elements[i].style.transition = "opacity 0.5s ease-out";
                elements[i].style.opacity = "0.3"; // Dim the elements
            }
            elements[mid].style.backgroundColor = "red"; // Mid is incorrect
            right = mid - 1; // Move left
        }
    }

    console.log(`Target ${targetValue} not found`);
    enableButtons(); // Enable buttons after search
}

Binary.addEventListener("click", handleBinarySearch);
Linear.addEventListener("click", handleLinear);



