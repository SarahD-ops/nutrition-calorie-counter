# 🥗 Nutrition & Calorie Counter

A full-stack web application for tracking daily food intake, calories, and macronutrients such as protein, carbohydrates, and fat.

The application allows users to create an account, log in securely, search for foods, calculate nutrition based on quantity, and track their daily nutrition.

---

## 🚀 Features

- User Registration and Login
- Secure password hashing using bcrypt
- JWT-based authentication
- Food search with nutrition information
- Automatic calorie and macronutrient calculation
- Add food entries to daily food log
- Track:
  - Calories
  - Protein
  - Carbohydrates
  - Fat
- View today's nutrition summary
- Delete food entries
- User-specific food records
- MongoDB Atlas database
- Responsive frontend

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JWT (JSON Web Token)
- bcryptjs
- dotenv

### Development Tools
- Visual Studio Code
- Postman
- Nodemon
- Git & GitHub

---

## 📁 Project Structure

```text
nutrition-calorie-counter/
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Food.js
│   ├── NutritionFood.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   └── nutritionRoutes.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── seedFoods.js
├── server.js
└── README.md
