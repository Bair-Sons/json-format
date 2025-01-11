document.addEventListener("DOMContentLoaded", () => {
  const inputArea = document.querySelector(".large-area--input");
  const outputArea = document.querySelector(".large-area--output");
  const btnFormat = document.querySelector(".controls__button--format");
  const clearButton = document.querySelector(".toolbar__button--clear");
  const copyButton = document.querySelector(".toolbar__button--copy");

  btnFormat.addEventListener("click", () => {
    try {
      const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);
      outputArea.value = formatted;
      updateLineNumbers(outputArea);
    } catch (error) {
      outputArea.value = "Invalid JSON";
      updateLineNumbers(outputArea);
    }
  });

  clearButton.addEventListener("click", () => {
    inputArea.value = "";
    inputArea.dispatchEvent(new Event("input"));
  });

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(outputArea.value);
  });

  const updateLineNumbers = (textarea) => {
    const wrapper = textarea.closest(".large-area-wrapper");
    let lineNumbers = wrapper.querySelector(".line-numbers");

    if (!lineNumbers) {
      lineNumbers = document.createElement("div");
      lineNumbers.className = "line-numbers";
      wrapper.insertBefore(lineNumbers, textarea);
    }

    const lines = textarea.value.split("\n").length;
    lineNumbers.innerHTML = Array.from(
      { length: lines },
      (_, i) => `<div>${i + 1}</div>`
    ).join("");
  };

  const attachHighlightRow = (textarea) => {
    const wrapper = textarea.closest(".large-area-wrapper");
    let highlightRow = wrapper.querySelector(".highlight-row");

    if (!highlightRow) {
      highlightRow = document.createElement("div");
      highlightRow.className = "highlight-row";
      wrapper.appendChild(highlightRow);
    }

    const moveHighlightRow = () => {
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.slice(0, cursorPosition);
      const currentLineIndex = textBeforeCursor.split("\n").length - 1;
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
      const paddingTop = parseFloat(getComputedStyle(textarea).paddingTop);
      highlightRow.style.top = `${
        40 + currentLineIndex * lineHeight + paddingTop
      }px`;
    };

    textarea.addEventListener("input", moveHighlightRow);
    textarea.addEventListener("click", moveHighlightRow);
    textarea.addEventListener("keyup", moveHighlightRow);
    moveHighlightRow();
  };

  const attachLineNumberEvents = (textarea) => {
    textarea.addEventListener("input", () => {
      updateLineNumbers(textarea);
    });

    textarea.addEventListener("scroll", () => {
      const wrapper = textarea.closest(".large-area-wrapper");
      const lineNumbers = wrapper.querySelector(".line-numbers");
      if (lineNumbers) {
        lineNumbers.scrollTop = textarea.scrollTop;
      }
    });

    updateLineNumbers(textarea);
  };

  attachLineNumberEvents(inputArea);
  attachLineNumberEvents(outputArea);
  attachHighlightRow(inputArea);
});
