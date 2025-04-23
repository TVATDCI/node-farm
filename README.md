# Node-farm Async/Await ES6 Version

<img src="./assets/js.svg" alt="JavaScript Logo" width="50" />
<img src="./assets/node-js.svg" alt="NodeJs Logo" width="50" style="margin-left: 5px;"/>
<img src="./assets/html-5.svg" alt="HTML-5 Logo" width="50" style="margin-left: 5px;"/>
<img src="./assets/css-3.svg" alt="CSS-3 Logo" width="50" style="margin-left: 5px;"/>

<p align="center">
<img src="./assets/green-ani.svg" alt="About me" width="50" align="left" style="margin-right: 5px;"/>
</p>

This is the **async/await-enhanced version** of the Node.js project "Node-farm", continuing from the `feature/es6` branch. It builds upon modern **ES6 module syntax** while integrating **async/await patterns** to improve readability, performance, and error handling.

---

## 🔁 From `feature/es6` to `feature/async-await`

This version takes the clean, modular ES6 setup and:

- Refactors all `fs.readFileSync` calls to **asynchronous `fs.promises.readFile`**
- Uses `async/await` and `Promise.all()` for concurrent template reading
- Wraps server startup in a `try/catch` block for improved **error safety**
- Retains clean **routing**, **templating**, and **slugify** logic

---

## Features

- **Async/Await File Handling**: Non-blocking operations with `fs.promises`
- **ES6 Modules**: Clean imports/exports with `.mjs` and `"type": "module"`
- **Manual Routing**: Handles `/overview`, `/product?id=`, `/api` with raw Node.js
- **Templating**: Uses HTML files and custom string replacement logic
- **Slug Support**: Clean product URLs powered by `slugify`
- **Error Handling**: Server startup wrapped in `try/catch` for robustness

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
└── README.md                    # You’re here 😜
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

- Install [Node.js](https://nodejs.org/) (I'm using v18)

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
node index.js
```

Visit:

- http://127.0.0.1:8000/overview — for the overview
- http://127.0.0.1:8000/product?id=0 — for individual product
- http://127.0.0.1:8000/api — for raw JSON data

---

## 🔍 Learning Highlights

- Understanding Node.js core modules
- Manual HTML templating and routing
- Modularizing logic (e.g., `replaceTemplate`)
- Exploring ES6 syntax for cleaner code
- Using query params to handle dynamic content

---

## To Improve or Explore

- Add support for URL slugs (e.g., `/product/organic-apple`)
- Use a templating engine like **Pug**, **Handlebars**, or **EJS**
- Store product data in a database (e.g., MongoDB)
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
git checkout feature/es6     # modern ES6
git checkout feature/async-await  # I am here!
```

Future plans like `feature/slugs`, `feature/db`, is in consideration.
At the mean time, i am also looking for a job 😏
Or "internship" to keep practicing and progressing my skills!

Thank you for smiling!
