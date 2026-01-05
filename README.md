# AdoptyCo – Pet Adoption & Supplies Marketplace

A comprehensive platform for adopting pets and purchasing pet supplies, built with modern web technologies. This project includes both client and server sides, fully functional with CRUD operations, authentication, and deployment-ready setup.

---

## 🌐 Live Links

* **Client (Frontend) Hosting:** [https://adoption-web-by-saadferozee.web.app/](https://adoption-web-by-saadferozee.web.app/)  
* **Server (Backend) Hosting:** [https://adoptyco.vercel.app/](https://adoptyco.vercel.app/)

---

## 📂 GitHub Repositories

* **Client Repo:** [https://github.com/saadferozee/PH_assignment_10](https://github.com/saadferozee/PH_assignment_10)  
* **Server Repo:** [https://github.com/saadferozee/PH_assignment_10_server](https://github.com/saadferozee/PH_assignment_10_server)



---

## 🚀 Features

* User authentication and role management with Firebase Auth  
* Full CRUD functionality for listings and orders  
* Filter listings by category, recent listings, and user-specific listings  
* Responsive design using Tailwind CSS and DaisyUI  
* Real-time feedback with SweetAlert2  
* Interactive tooltips and UI enhancements  

---

## 🛠 Tech Stack

**Frontend:** React, Vite, Tailwind CSS, DaisyUI, Firebase Auth, Axios, React Router, SweetAlert2, React Tooltip  
**Backend:** Node.js, Express.js, MongoDB Atlas, dotenv, CORS  
**Hosting:** Firebase Hosting (Client), Vercel (Server)

---

## 🗂 Project Structure

```

Assignment_10_client/
├─ .firebase
├─ dist
├─ node_modules
├─ public
├─ src
│  ├─ assets
│  ├─ Components
│  │  ├─ AboutSection.jsx
│  │  ├─ CategorySection.jsx
│  │  ├─ HeroSection.jsx
│  │  ├─ PetHeroSection.jsx
│  │  ├─ ProductCard.jsx
│  │  ├─ RecentListingsSection.jsx
│  │  └─ Root.jsx
│  ├─ Contexts
│  │  └─ AuthContext.jsx
│  ├─ Elements
│  │  ├─ Footer.jsx
│  │  ├─ Headline.jsx
│  │  ├─ Navbar.jsx
│  │  └─ ReactTooltip.jsx
│  ├─ Firebase
│  ├─ Pages
│  │  ├─ Error/
│  │  ├─ AddListing.jsx
│  │  ├─ AddOrder.jsx
│  │  ├─ Home.jsx
│  │  ├─ Loading.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyListings.jsx
│  │  ├─ MyOrders.jsx
│  │  ├─ MyProfile.jsx
│  │  ├─ PetAndSupplies.jsx
│  │  ├─ ProductDetails.jsx
│  │  ├─ Register.jsx
│  │  └─ UpdateListing.jsx
│  ├─ Providers
│  │  └─ AuthProvider.jsx
│  └─ Router
│     ├─ App.css
│     ├─ App.jsx
│     ├─ index.css
│     └─ main.jsx
├─ .env.local
├─ .firebaserc
├─ .gitignore
├─ eslint.config.js
├─ firebase.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js

````

---

## 🔗 API Endpoints (Server)

**Base URL:** `https://adoptyco.vercel.app/`  

### Listings API

| Endpoint                       | Method | Description                |
| ------------------------------ | ------ | -------------------------- |
| `/listings`                    | POST   | Create a new listing       |
| `/listings`                    | GET    | Get all listings           |
| `/listings/recentListings`     | GET    | Get 6 most recent listings |
| `/listings/product/:id`        | GET    | Get single product details |
| `/listings/myListings/:email`  | GET    | Get listings by user email |
| `/listings/category/:category` | GET    | Get listings by category   |
| `/listings/update/:id`         | PUT    | Update listing by ID       |
| `/listings/delete/:id`         | DELETE | Delete listing by ID       |

### Orders API

| Endpoint         | Method | Description               |
| ---------------- | ------ | ------------------------- |
| `/orders`        | POST   | Create a new order        |
| `/orders`        | GET    | Get all orders            |
| `/orders/:email` | GET    | Get orders by buyer email |

---
---

###### _If You want to Clone This Repo :_
## ⚙ Setup Instructions

#### Client

1. Clone the repository:
```bash
git clone https://github.com/saadferozee/PH_assignment_10.git
````

2. Install dependencies:

```bash
cd PH_assignment_10
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

#### Server

1. Clone the repository:

```bash
git clone https://github.com/saadferozee/PH_assignment_10_server.git
```

2. Install dependencies:

```bash
cd PH_assignment_10_server
npm install
```

3. Start the server:

```bash
npm run start
```

---

## 📌 Notes

* Ensure `.env` file is set up with MongoDB connection string and Firebase credentials
* Client and server should run concurrently for full functionality
* Live deployment links provide the production-ready version

---

## 🔗 Author

### **Saad Ferozee**
*GitHub:* [https://github.com/saadferozee](https://github.com/saadferozee)
*LinkedIn:* [https://www.linkedin.com/in/saadferozee/](https://www.linkedin.com/in/saadferozee/)

---