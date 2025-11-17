# FinEase

**FinEase** is a personal finance management web application that helps users manage their income, expenses, and savings goals efficiently. It allows users to record transactions, set monthly budgets, and view insightful financial summaries with charts and reports.  

This project demonstrates **CRUD operations**, **authentication**, **backend integration**, and **data visualization** — ideal for showcasing full-stack development skills.

---

##  Live Links

-  **Live Website:** [ ](#)
- 💻 **Client Repository:** [  ](#)
- 🖥️ **Server Repository:** [  ](#)

---

##  Key Features

-  **User Authentication:** Email/password & Google login via Firebase  
-  **Transaction Management (CRUD):** Add, update, delete, and view personal transactions  
-  **Reports with Charts:** Visualize income & expenses using Pie and Bar charts  
-  **Light/Dark Mode:** Switch between light and dark themes  
-  **SweetAlert Notifications:** Modern popups for success/error messages  
-  **Responsive Design:** Fully optimized for desktop, tablet, and mobile  
-  **Custom 404 Page:** Friendly “Not Found” page for invalid routes  

---

## Main Pages & Functionalities

###  Home Page
- Motivational **banner** section  
- Overview of **total income, expense, and balance** (from database)  
- Two static sections:  
  - *Budgeting Tips*  
  - *Why Financial Planning Matters*

###  Authentication
- **Signup**: Name, Email, Password, PhotoURL  
- **Login**: Email/Password & Google Login  
- Password validation rules:
  - At least one uppercase and lowercase letter  
  - Minimum length: 6 characters  
- All messages shown via **SweetAlert** (no default alerts)  

###  Private Routes
Accessible only to logged-in users:
- `/add-transaction`
- `/my-transactions`
- `/transaction/:id`
- `/transaction/update/:id`
- `/reports`
- `/profile`

###  Transaction Operations (CRUD)
####  Add Transaction
- Fields: Type, Category, Amount, Description, Date, User Email & Name  
- Stores data in MongoDB  
- Shows success message after submission  

####  Update Transaction
- Pre-filled form with existing data  
- Updates instantly after saving  

####  Delete Transaction
- SweetAlert confirmation before deletion  
- Instantly updates UI after removing  

#### View Transaction Details
- Full details including Type, Category, Amount, and Date  
- Displays total amount per category  

---

##  Reports Page
- Displays income & expense summary using **Recharts**  
- Supports filtering by month  
- Pie Chart (by category) and Bar Chart (monthly totals)  

---

##  My Profile
- Displays name, photo, and email  
- Allows profile updates  

---

##  Tech Stack

### **Frontend**
- React (Vite)
- React Router 
- Tailwind CSS
- SweetAlert2
- Recharts
- Firebase Authentication

### **Backend**
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK (Authorization)

---

## 🗄️ Database Example (MongoDB)
```json
{
  "type": "expense",
  "category": "home",
  "amount": 1000,
  "description": "house rent",
  "date": "2025-01-15T00:00:00.000Z",
  "email": "xyz@gmail.com",
  "name": "Hero"
}
