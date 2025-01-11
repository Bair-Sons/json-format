const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnFormat = document.querySelector(".controls__button--format");

btnFormat.addEventListener("click", () => {
    try {
        const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);
        outputArea.value = formatted;
    } catch (error) {
        outputArea.value = "Invalid JSON";
    }
});

function updateLineNumbers(textarea) {
    console.log("Line numbers updated for: ", textarea);
}

document.addEventListener("DOMContentLoaded", () => {
    const leftTextarea = document.querySelector(".large-area--input");
    const wrapper = leftTextarea.closest(".large-area-wrapper");
    const lineNumbers = wrapper.querySelector(".line-numbers");

    // Create the row highlight element
    const highlightRow = document.createElement("div");
    highlightRow.className = "highlight-row";
    wrapper.appendChild(highlightRow);

    const maxLines = 14; // Set the maximum number of lines

    const updateLineNumbers = () => {
        const lines = leftTextarea.value.split("\n").length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => `<div>${i + 1}</div>`).join("");
    };

    const highlightCurrentLine = () => {
        const cursorPosition = leftTextarea.selectionStart;
        const textBeforeCursor = leftTextarea.value.slice(0, cursorPosition);
        const currentLineIndex = textBeforeCursor.split("\n").length - 1;

        const lineHeight = parseFloat(getComputedStyle(leftTextarea).lineHeight);
        const paddingTop = parseFloat(getComputedStyle(leftTextarea).paddingTop);

        // Position the highlight
        highlightRow.style.top = `${currentLineIndex * lineHeight + paddingTop}px`;

        // Clear previous highlight in line numbers
        lineNumbers.querySelectorAll("div").forEach((line) => {
            line.classList.remove("highlight");
        });

        // Highlight current line number
        const lineToHighlight = lineNumbers.querySelector(`div:nth-child(${currentLineIndex + 1})`);
        if (lineToHighlight) {
            lineToHighlight.classList.add("highlight");
        }
    };

    const enforceMaxLines = (event) => {
        const lines = leftTextarea.value.split("\n").length;

        // Prevent adding more lines than the allowed maximum
        if (event.key === "Enter" && lines >= maxLines) {
            event.preventDefault();
        }

        // Remove any lines that exceed the limit
        if (lines > maxLines) {
            const trimmedValue = leftTextarea.value.split("\n").slice(0, maxLines).join("\n");
            leftTextarea.value = trimmedValue;
        }
    };

    leftTextarea.addEventListener("input", () => {
        updateLineNumbers();
        highlightCurrentLine();

        // Enforce the maximum number of lines dynamically
        const lines = leftTextarea.value.split("\n").length;
        if (lines > maxLines) {
            const trimmedValue = leftTextarea.value.split("\n").slice(0, maxLines).join("\n");
            leftTextarea.value = trimmedValue;
        }
    });

    leftTextarea.addEventListener("scroll", () => {
        const scrollTop = leftTextarea.scrollTop;
        lineNumbers.scrollTop = scrollTop;
        highlightRow.style.transform = `translateY(-${scrollTop}px)`;
    });

    leftTextarea.addEventListener("click", highlightCurrentLine);
    leftTextarea.addEventListener("keyup", highlightCurrentLine);

    // Prevent adding more lines than the textarea's height
    leftTextarea.addEventListener("keydown", enforceMaxLines);

    // Initialize line numbers and highlight
    updateLineNumbers();
    highlightCurrentLine();
});
