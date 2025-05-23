# Node-farm

<p align="left">
<img src="./assets/js.svg" alt="JavaScript Logo" width="50" />
<img src="./assets/node-js.svg" alt="NodeJs Logo" width="50" style="margin-left: 5px;"/>
<img src="./assets/html-5.svg" alt="HTML-5 Logo" width="50" style="margin-left: 5px;"/>
<img src="./assets/css-3.svg" alt="CSS-3 Logo" width="50" style="margin-left: 5px;"/>
</p>

<p align="center">
<img src="./assets/green-ani.svg" alt="About me" width="50" align="left" style="margin-right: 5px;"/>
</p>

Here’s a beginner-friendly `README.md` file for your project. It explains the purpose, setup, and functionality of your project in a simple and clear way.

---

## Beginner friendly:

This project is a beginner-friendly implementation of a basic Node.js server that serves a product overview page and prepares for product detail pages. It demonstrates how to use Node.js to read files, serve HTML templates, and handle basic routing without any external frameworks.

---

## Features

- **Static Data Handling**: Reads product data from a JSON file (

data.json

) at the server startup.

- **HTML Templating**: Dynamically replaces placeholders in HTML templates with product data.
- **Basic Routing**: Serves different pages based on the URL path (`/overview`, `/product`, `/api`).
- **Simple Server**: Uses Node.js's built-in

http

module to create a server.

- **Beginner-Friendly Code**: Includes comments and alternative approaches for learning purposes.

---

## Project Structure

```
project-folder/
│
├── dev-data/
│   └── data.json                # JSON file containing product data
│
├── templates/
│   ├── template-overview.html   # Template for the overview page
│   ├── template-card.html       # Template for individual product cards
│   └── template-product.html    # Template for product details (to be implemented)
│
├── index.js                     # Main Node.js server file
└── README.md                    # Project documentation
```

---

## How It Works

1. **Data Loading**:

   - The server reads the data.json
   - file once at startup and parses it into a JavaScript object.

2. **HTML Templating**:
   - The replaceTemplate

function replaces placeholders (e.g., `{%PRODUCTNAME%}`, `{%PRICE%}`) in the HTML templates with actual product data.

3. **Routing**:
   - `/overview`: Displays all products as cards using the `template-overview.html` and template-card.html.
   - `/product`: Placeholder for product detail pages (to be implemented).
   - `/api`: Returns the raw JSON data as an API response.
   - Any other route: Returns a `404 Not Found` page.

---

## Setup and Usage

### Prerequisites

- Install [Node.js](https://nodejs.org/) on your machine.

### Steps

1. Clone or download this repository.
2. Navigate to the project folder in your terminal.
3. Run the server:
   ```bash
   node index.js
   ```
4. Open your browser and visit:

http://127.0.0.1:8000/overview
to see the product overview page.
http://127.0.0.1:8000/api
to see the raw JSON data.

---

## Example Data

Here’s an example of the product data used in this project:

```json
[
  {
    "id": "1",
    "productName": "Organic Apple",
    "image": "🍎",
    "from": "Italy",
    "nutrients": "Vitamins A, C",
    "quantity": "1kg",
    "price": "3.99",
    "description": "Fresh organic apples.",
    "organic": true
  },
  {
    "id": "2",
    "productName": "Banana",
    "image": "🍌",
    "from": "Ecuador",
    "nutrients": "Potassium",
    "quantity": "1kg",
    "price": "2.49",
    "description": "Sweet bananas.",
    "organic": false
  }
]
```

---

## Learning Highlights

- **File System**: Learn how to read and write files synchronously and asynchronously in Node.js.
- **Routing**: Understand how to handle different URL paths using basic conditional logic.
- **HTML Templating**: Practice replacing placeholders in HTML templates with dynamic data.
- **Error Handling**: See examples of error handling in both synchronous and asynchronous file operations.
- **Refactoring**: Explore alternative approaches (e.g., Promises, async/await) for better readability and maintainability.

- **Product Details**: Implement the `/product` route to display detailed information about a single product.

- **Templating Engines**: Experiment with templating engines like EJS, Pug, or Handlebars for more advanced templating.
- **Dynamic Data**: Replace the static JSON file with a database (e.g., MongoDB, MySQL) for dynamic data handling.
- **ES6 Modules** (coming soon): Transition the codebase to use modern JavaScript syntax and ES6 module structure for better scalability and maintainability.

---

**What’s new in feature/modules?**
🔄 Code Refactoring: The index.js file has been cleaned up for better readability and maintainability.

🧼 **Removed Comment Clutter:** Unnecessary or outdated comments were removed to streamline the learning experience.

🧠 **Modular Functions:** Key features like templating, routing, and response handling have been broken into clear, concise modules.

✨ **Improved Readability:** Cleaner variable and function names, organized file structure, and streamlined logic.

📦 **ES6 Modules Transition (Planned):** Moving towards ES6 import/export syntax to embrace modern JavaScript standards.

This branch maintains educational clarity while introducing best practices for cleaner production-ready code.

---

If you're curious to compare the beginner-friendly approach with a more refined modular structure, simply switch to the branch:

```bash
git checkout feature/modules
```

## 🚧 Current Development: feature/npm

This branch introduces essential project setup improvements with `npm` and dev tools.

### ✅ What's Done

- Initialized `npm` and created a `package.json` file.
- Installed [`slugify`](https://www.npmjs.com/package/slugify) for cleaner, URL-friendly strings (e.g., product slugs).
- Installed `nodemon` as a **dev dependency** for hot reloading during development.
- Created `.gitignore` to prevent `node_modules`, `.log` files, and other untracked files from being committed.

### 💡 Why It Matters

- **Modular Development**: Keeps project dependencies well-organized.
- **Improved Dev Workflow**: `nodemon` auto-restarts the server on file changes.
- **Clean Repository**: `.gitignore` avoids unnecessary clutter on GitHub.

### 🛠 How to Use

After cloning or switching to this branch, run:

```bash
npm install
```

```bash
npm run dev
```

Try:

```bash
git checkout main            # Basic CommonJS
git checkout feature/basic-nodeJs  # The building from line 1 with comments!
git checkout feature/modules # Modular CommonJS
git checkout feature/npm     # npm & dev tools setup
git checkout feature/es6     # You are here!
```

## Acknowledgments

This project was created as a learning exercise to understand the fundamentals of Node.js without relying on external frameworks — focusing purely on core concepts.

Built by **Tuanthong Vaidyanond**
The foundational concepts and structure are based on the course by [Jonas Schmedtmann](https://jonas.io/).
**Node.js, Express, MongoDB &More**

© Jonas Schmedtmann
This project is open for personal and commercial use, but not to be claimed as your own design.
Crediting the original author is highly appreciated!

---

```

```
