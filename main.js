// Select DOM elements
const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnFormat = document.querySelector(".controls__button--format");

// Event listener for the Format button
btnFormat.addEventListener("click", () => {
    try {
        // Parse and format the JSON from the input area
        const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);
        outputArea.value = formatted;

        // Optional: Update line numbers (if needed in the future)
        // updateLineNumbers(outputArea);
    } catch (error) {
        // Handle invalid JSON input
        outputArea.value = "Invalid JSON: " + error.message;
    }
});

// Optional: Function to update line numbers (placeholder for future use)
function updateLineNumbers(textarea) {
    // Placeholder logic to dynamically add line numbers
    // For example, count lines in the textarea content
    console.log("Line numbers updated for: ", textarea);
}
