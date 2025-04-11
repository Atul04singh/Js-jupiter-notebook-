// Save all code blocks as a .md file
document.getElementById("saveMdBtn").addEventListener("click", () => {
  let content = "";
  const blocks = document.querySelectorAll(".code-block");
  blocks.forEach((block, index) => {
    const code = block.querySelector("textarea").value;
    const output = block.querySelector(".output").innerText;
    content += `### Code Block ${
      index + 1
    }\n\`\`\`js\n${code}\n\`\`\`\n**Output:**\n\`\`\`\n${output}\n\`\`\`\n\n`;
  });

  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "js_notes.md";
  a.click();
  URL.revokeObjectURL(url);
});

// Load and parse a .md file
document.getElementById("loadMdBtn").addEventListener("click", () => {
  document.getElementById("loadMdInput").click();
});

document.getElementById("loadMdInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;

    // 🧹 Clear existing blocks before loading new ones
    container.innerHTML = "";

    // 📌 Prevent default block creation after load
    sessionStorage.setItem("loadedFromMd", "true");

    // 🔍 Parse Markdown for code blocks
    const blockRegex = /```js\n([\s\S]*?)```[\s\S]*?```([\s\S]*?)```/g;
    let match;
    while ((match = blockRegex.exec(content)) !== null) {
      const code = match[1].trim();
      const output = match[2].trim();
      createCodeBlock(code, output);
    }

    // 💾 Save loaded data
    saveAllBlocks();
  };
  reader.readAsText(file);
});

// ✅ On page load: check localStorage or create default block once
let loadedOnce = false;

window.addEventListener("DOMContentLoaded", () => {
  if (loadedOnce) return; // Prevents multiple calls
  loadedOnce = true;

  const savedData = localStorage.getItem("jsNotebookData");
  const wasLoaded = sessionStorage.getItem("loadedFromMd");

  // ✅ If loaded from .md file, skip everything
  if (wasLoaded) {
    sessionStorage.removeItem("loadedFromMd");
    return;
  }

  // ✅ Load from localStorage if available
  if (savedData) {
    loadFromLocalStorage();
  }
  // ✅ Else just create a single new block
  else {
    createCodeBlock();
  }
});

function loadFromLocalStorage() {
  loadedOnce = true;
  const data = localStorage.getItem("jsNotebookData");
  if (!data) return;

  const codeList = JSON.parse(data);
  container.innerHTML = ""; // optional cleanup

  codeList.forEach((code) => createCodeBlock(code));
}
