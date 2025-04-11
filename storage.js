// storage.js

const STORAGE_KEY = "jsNotebookBlocks";

export function saveBlocks(blocks) {
  const data = blocks.map((block) => ({
    code: block.querySelector("textarea").value,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadBlocks(createCodeBlock) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  data.forEach((blockData) => {
    const newBlock = createCodeBlock(blockData.code);
    document.getElementById("codeContainer").appendChild(newBlock);
  });
}
