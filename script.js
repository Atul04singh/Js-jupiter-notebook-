// Constants
const container = document.getElementById("codeBlocks");
const addBlockBtn = document.getElementById("addBlockBtn");
const STORAGE_KEY = "jsNotebookBlocks";

// Create a new code block
// function createCodeBlock(initialCode = "") {
//   const block = document.createElement("div");
//   block.className = "code-block";

//   block.innerHTML = `
//       <textarea placeholder="Write JS code here...">${initialCode}</textarea>
//       <div class="btn-row">
//         <button class="run-btn">▶ Run</button>
//         <button class="delete-btn">🗑 Delete</button>
//       </div>
//       <div class="output"></div>
//     `;

//   const runBtn = block.querySelector(".run-btn");
//   const deleteBtn = block.querySelector(".delete-btn");
//   const textarea = block.querySelector("textarea");
//   const outputDiv = block.querySelector(".output");

//   // Run JS
//   runBtn.addEventListener("click", () => {
//     try {
//       const result = eval(textarea.value);
//       outputDiv.innerText = result !== undefined ? result : "✓ Code executed";
//     } catch (err) {
//       outputDiv.innerText = "❌ " + err.message;
//     }
//     saveAllBlocks();
//   });

//   // Delete block
//   deleteBtn.addEventListener("click", () => {
//     if (confirm("Are you sure you want to delete this code block?")) {
//       container.removeChild(block);
//       saveAllBlocks();
//     }
//   });

//   // Save on input change
//   textarea.addEventListener("input", saveAllBlocks);

//   container.appendChild(block);
//   return block;
// }

function createCodeBlock(initialCode = "") {
  const block = document.createElement("div");
  block.className = "code-block";

  block.innerHTML = `
      <textarea>${initialCode}</textarea>
      <div class="btn-row">
        <button class="run-btn">▶ Run</button>
        <button class="delete-btn">🗑 Delete</button>
      </div>
      <div class="output"></div>
    `;

  const runBtn = block.querySelector(".run-btn");
  const deleteBtn = block.querySelector(".delete-btn");
  const textarea = block.querySelector("textarea");
  const outputDiv = block.querySelector(".output");

  // ✅ Apply CodeMirror here to each textarea
  const editor = CodeMirror.fromTextArea(textarea, {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: false,
    autoCloseBrackets: true,
  });

  // Run code
  runBtn.addEventListener("click", () => {
    try {
      const result = eval(editor.getValue());
      outputDiv.innerText = result !== undefined ? result : "✓ Code executed";
    } catch (err) {
      outputDiv.innerText = "❌ " + err.message;
    }
    saveAllBlocks();
  });
  // Delete block
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this code block?")) {
      container.removeChild(block);
      saveAllBlocks();
    }
  });

  // Save on text change
  editor.on("change", saveAllBlocks);

  container.appendChild(block);
  return block;
}

// Save all blocks to localStorage
function saveAllBlocks() {
  const editors = document.querySelectorAll(".CodeMirror");
  const codeList = [];

  editors.forEach((editorEl) => {
    const cmInstance = editorEl.CodeMirror;
    if (cmInstance) {
      codeList.push(cmInstance.getValue());
    }
  });

  localStorage.setItem("jsNotebookData", JSON.stringify(codeList));
}

// Load saved blocks from localStorage
function loadBlocks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const codeList = JSON.parse(saved);
    codeList.forEach((code) => createCodeBlock(code));
  } else {
    createCodeBlock(); // Add default block if nothing saved
  }
}

// Add new block on button click
addBlockBtn.addEventListener("click", () => {
  createCodeBlock();
  saveAllBlocks();
});

// update 2

const outputDiv = document.getElementById("output");
