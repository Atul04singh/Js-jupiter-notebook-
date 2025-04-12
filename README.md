# Js-jupiter-notebook-
This notebook have similar feel just like python jupiter notebook but made for java script 
ie -

A lightweight in-browser JavaScript notebook where you can write, run, save, and export code blocks. Great for practicing JS, prototyping, or teaching code — no frameworks, no dependencies, just pure vanilla JavaScript.

---

## ✨ Features

- Add multiple editable JavaScript code blocks
- Run JS code and view output instantly
- Save and load blocks using `localStorage`
- Export all blocks with output to a **Markdown `.md` file**
- Simple, clean, and responsive UI

---

## 📸 Preview

> 

---


## 🧠 How It Works

- `index.html` is the main file with layout
- `script.js` handles block creation, execution, and DOM manipulation
- `save&load.js` manages markdown export and saving
- `storage.js` handles `localStorage` save/load logic
- `style.css` makes it look clean and responsive

---

## 📁 Folder Structure

```
js_notebook_webapp/
├── index.html          # Entry point
├── style.css           # Styling
├── script.js           # Core app logic
├── save&load.js        # Save/export functions
├── storage.js          # LocalStorage functions
├── utils.js            # (Placeholder for helpers)
```

---

## ⚙️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Browser `localStorage`

---

## 💡 Future Improvements

- Dark Mode toggle
- Syntax highlighting (e.g., using Prism.js)
- Download as PDF
- Keyboard shortcuts
- Mobile enhancements