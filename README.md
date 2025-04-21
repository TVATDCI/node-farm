# Node-farm (ES6 Version)

This is the **ES6 version** of the Node.js project "Node-farm". It showcases a beginner-to-intermediate progression by converting CommonJS code into modern **ES6 modules**, while maintaining a clean structure for learning core Node.js concepts.

---

## Beginner-Friendly Learning Path

This project starts with basic Node.js using CommonJS, and grows into a modular ES6 setup. It shows how to:

- Read/write files using `fs`
- Serve pages via `http`
- Use templates to dynamically inject data
- Handle basic routing manually
- Transition from CommonJS to ES6 modules

Each step is preserved in branches for easy exploration.

---

## What’s New in `feature/es6`

- Converted all CommonJS (`require`, `module.exports`) to ES6 syntax (`import`, `export`)
- Updated file extensions to `.mjs` or configured `"type": "module"` in `package.json`
- Adjusted built-in modules for compatibility (e.g., `__dirname` workaround)
- Structured code for better scalability with clearer imports/exports

---

## Features

- **ES6 Modules**: Uses modern import/export syntax.
- **Routing**: Serves `/overview`, `/product?id=`, and `/api` routes.
- **HTML Templating**: Simple custom templating using string replacement.
- **Slug Generation**: Converts product names into slugs with `slugify`.
- **Error Handling**: Returns a custom 404 HTML message for unknown routes.

---

## Project Structure

```bash
node-farm/
│
├── dev-data/
│   └── data.json                # JSON file with product data
│
├── templates/
│   ├── template-overview.html   # Template for overview page
│   ├── template-card.html       # Template for individual cards
│   └── template-product.html    # Template for product detail
│
├── modules/
│   └── replaceTemplate.js       # Function to replace placeholders
│
├── index.mjs                    # Main server using ES6
├── package.json                 # Project metadata & config
└── README.md                    # You’re here 😄
```

---

## Routes in this Version

| Route             | Description                                       |
| ----------------- | ------------------------------------------------- |
| `/overview`       | Displays product cards dynamically                |
| `/product?id=0`   | Shows individual product detail (via query param) |
| `/api`            | Returns raw product JSON                          |
| _any other route_ | Returns custom 404 page                           |

---

## Related Branches

| Branch                 | Description                                                                       |
| ---------------------- | --------------------------------------------------------------------------------- |
| `main`                 | Simple beginner-friendly version using CommonJS                                   |
| `feature/basic-nodeJs` | Simple beginner-friendly version using CommonJS with all full comment from line 1 |
| `feature/modules`      | Modularized with CommonJS                                                         |
| `feature/npm`          | Introduces npm, slugify, and nodemon                                              |
| `feature/es6`          | **Modernized with ES6 syntax (this branch)**                                      |

---

## Setup & Usage

### Prerequisites

- Install [Node.js](https://nodejs.org/) (v14+ recommended)

### Run the Server

```bash
# Clone the repo (if not done yet)
git clone https://github.com/TVATDCI/node-farm.git
cd node-farm

# Switch to this branch
git checkout feature/es6

# Install dependencies
npm install

# Run with native node
node index.mjs
```

Visit:

- http://127.0.0.1:8000/overview — for the overview
- http://127.0.0.1:8000/product?id=0 — for individual product
- http://127.0.0.1:8000/api — for raw JSON data

---

## 🔍 Learning Highlights

- ✅ Understanding Node.js core modules
- ✅ Manual HTML templating and routing
- ✅ Modularizing logic (e.g., `replaceTemplate`)
- ✅ Exploring ES6 syntax for cleaner code
- ✅ Using query params to handle dynamic content

---

## To Improve or Explore

- Add support for URL slugs (e.g., `/product/organic-apple`)
- Use a templating engine like **Pug**, **Handlebars**, or **EJS**
- Connect a database (e.g., MongoDB) instead of static JSON
- Add styles or use a framework like **TailwindCSS**
- Set up tests using **Jest** or **Vitest**

---

## Acknowledgments

Project originally inspired by the course:

**Node.js, Express, MongoDB & More** by [Jonas Schmedtmann](https://jonas.io/).

Built & extended by **Tuanthong Vaidyanond** for educational and progressive enhancement.

---

Try:

```bash
git checkout main            # Basic CommonJS
git checkout feature/basic-nodeJs           # Basic CommonJS
git checkout feature/modules # Modular CommonJS
git checkout feature/npm     # npm & dev tools setup
git checkout feature/es6     # You are here!
```
