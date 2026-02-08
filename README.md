# 🛒 Ecommerce Admin Panel — Angular (Standalone + Signals)

A production-style ecommerce admin dashboard built using **latest Angular standalone architecture**, integrated with **DummyJSON APIs** for realistic backend simulation.

This project focuses on scalable admin architecture, reusable UI components, reactive UX, and enterprise frontend infrastructure patterns.

---

## 🚀 Tech Stack

* Angular (Latest — Standalone APIs)
* Signals for reactive state
* Functional Guards & Interceptors
* RxJS (debounce, switchMap, forkJoin)
* SCSS
* DummyJSON APIs

---

## 📦 Features Implemented

### 🔐 Authentication

* Login via DummyJSON auth API
* JWT token storage
* Auth interceptor (header injection)
* Route guards:

  * `authGuard` → protects private routes
  * `guestGuard` → blocks login for authenticated users
* Logout flow
* Header user profile display

---

### 🧭 Layout & Navigation

* Admin layout shell
* Sidebar navigation
* Collapsible sidebar toggle
* Header with user menu
* Active route highlighting

---

### 📊 Dashboard

* KPI cards:

  * Total Products
  * Total Users
  * Total Carts
  * Revenue aggregation
* Parallel API execution using `forkJoin`
* Fault-tolerant data handling

---

### 📦 Products Module (Full CRUD)

* Products list table
* Pagination (reusable component)
* Amazon-style paginator UI
* Reactive search (RxJS debounce)
* Product details page
* Add product form
* Edit product form
* Delete product flow

---

### 👥 Users Module

* Users list table
* Avatar display
* Search + pagination
* User profile details page
* Nested data rendering:

  * Address
  * Company
  * Bank info

---

### 🛒 Carts Module

* Carts list
* User cart totals
* Discounted totals
* Expandable relational view
* Nested products table

---

## ♻️ Reusable Components

* Global pagination component
* Windowed page logic + ellipsis
* Amazon-style paginator UI
* Global loader overlay
* Toast notification system

---

## ⚙️ Global Infrastructure

### Loader Interceptor

* Tracks parallel API requests
* Global spinner overlay
* Request counter handling

### Error Interceptor

Handles:

* 401 → session redirect
* 500 → server error toast
* Network failures

### Toast Notification System

* Success / Error / Info / Warning
* Auto dismiss
* Stackable alerts
* Service driven

---

## 🔎 Reactive Search

Implemented using:

* `FormControl`
* `valueChanges`
* `debounceTime`
* `distinctUntilChanged`
* `switchMap`

Cancels stale API calls automatically.

---

## 📁 Folder Structure

```
src/app
│
├── core
│   ├── services
│   ├── interceptors
│   ├── guards
│
├── shared
│   ├── components
│   │   ├── pagination
│   │   ├── toast
│   │   └── global-loader
│
├── layout
│   ├── admin-layout
│   ├── header
│   └── sidebar
│
├── features
│   ├── dashboard
│   ├── products
│   ├── users
│   └── carts
│
└── app.routes.ts
```

---

## 🔌 APIs Used

DummyJSON endpoints:

```
POST   /auth/login
GET    /auth/me

GET    /products
GET    /products/:id
POST   /products/add
PUT    /products/:id
DELETE /products/:id

GET    /users
GET    /users/:id

GET    /carts
```

Docs: [https://dummyjson.com](https://dummyjson.com)

---

# 🛠️ Local Setup

```bash
git clone <repo-url>
npm install
ng serve
```

App runs at:

```
http://localhost:4200
```

---

# 🔑 Dummy Login Credentials

```
Username: kminchelle
Password: 0lelplR
```

---

# 🚀 Local Deployment Using NGINX

This project can be deployed locally using NGINX to simulate a production environment.

---

## Step 1 — Create Production Build

```bash
ng build --configuration production
```

Build output:

```
dist/<project-name>/browser/
```

Contains deployable static files.

---

## Step 2 — Install NGINX

### macOS

```bash
brew install nginx
brew services start nginx
```

### Ubuntu / Linux

```bash
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
```

---

## Step 3 — Copy Angular Build to NGINX Root

### macOS

```bash
cp -r dist/<project-name>/browser/* \
/opt/homebrew/var/www/
```

### Linux

```bash
sudo cp -r dist/<project-name>/browser/* \
/var/www/html/
```

---

## Step 4 — Configure SPA Routing

Edit NGINX config:

### macOS

```
/opt/homebrew/etc/nginx/nginx.conf
```

### Linux

```
/etc/nginx/sites-available/default
```

---

### Server Configuration

```nginx
server {

  listen 8080;
  server_name localhost;

  root /opt/homebrew/var/www;   # adjust path
  index index.html;

  location / {

    try_files $uri
               $uri/
               /index.html;

  }

}
```

Linux path example:

```nginx
root /var/www/html;
```

---

## Step 5 — Restart NGINX

### macOS

```bash
brew services restart nginx
```

### Linux

```bash
sudo systemctl restart nginx
```

---

## Step 6 — Verify Deployment

Open browser:

```
http://localhost:8080
```

Test SPA routes:

```
/dashboard
/products
/users
/carts
```

Refresh page to confirm routing works.

---

# 🧠 Deployment Notes

* Angular builds static files
* NGINX serves them as web assets
* `try_files` ensures SPA routing works
* Same setup scales to cloud deployment

---

# 🧪 Future Enhancements

Planned roadmap:

* Orders module
* Analytics charts
* Role-based access
* Image upload
* Confirm dialog service
* Node + Express backend
* MongoDB integration
* JWT refresh tokens
* AWS / Cloud deployment
* Dockerization

---

# 📄 License

MIT — free to use and modify.

---

# 🙌 Author

Built as an enterprise admin architecture learning project using modern Angular patterns and deployment practices.
