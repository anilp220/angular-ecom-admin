# 🛒 Ecommerce Admin Panel — Angular (Standalone + Signals)

A production-style ecommerce admin dashboard built using **latest Angular standalone architecture**, integrated with **DummyJSON APIs** for real data simulation.

This project focuses on scalable admin architecture, reusable components, reactive UX, and enterprise frontend patterns.

---

## 🚀 Tech Stack

* **Angular (Latest — Standalone APIs)**
* Signals for reactive state
* Functional Guards & Interceptors
* RxJS (debounce, switchMap, forkJoin)
* SCSS
* DummyJSON (Mock backend APIs)

---

## 📦 Features Implemented

### 🔐 Authentication

* Login via DummyJSON auth API
* JWT token storage
* Auth interceptor (header injection)
* Route guards:

  * `authGuard` → protects private routes
  * `guestGuard` → blocks login for logged users
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
* Confirmation handling

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
* Nested products table per cart

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
* Global service driven

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

## 🧠 Architecture Highlights

* Standalone component architecture
* Functional DI via `inject()`
* Signals for UI reactivity
* Lazy loaded feature modules
* Reusable UI primitives
* Stateless shared components
* Interceptor-driven infra

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

## 🛠️ Local Setup

```bash
# Clone repo
git clone <repo-url>

# Install deps
npm install

# Run dev server
ng serve
```

App runs at:

```
http://localhost:4200
```

---

## 🔑 Dummy Login Credentials

Use DummyJSON test user:

```
Username: kminchelle
Password: 0lelplR
```

---

## 🧪 Future Enhancements

Planned roadmap:

* Orders module
* Analytics charts
* Role-based access
* Image upload
* Confirm dialog service
* Node + Express backend
* MongoDB integration
* JWT refresh tokens
* NGINX deployment
* Dockerization

---

## 📦 Deployment (Upcoming)

Next phase will include:

* Production build
* NGINX hosting
* Reverse proxy setup
* API routing

---

## 📄 License

MIT — free to use and modify.

---

## 🙌 Author

Built as an enterprise admin architecture learning project using modern Angular patterns.
