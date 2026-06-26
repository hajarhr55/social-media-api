# Social Media REST API

This REST API was developed specifically to serve as the backend for my Social Media Frontend project.

🔗 **Frontend Repository:**  
https://github.com/hajarhr55/social-media-frontend

A RESTful API built with Node.js, Express.js, and PostgreSQL.  
It handles authentication, user accounts, posts, comments, and image uploads using Cloudinary.

---

## 📖 Overview

This API powers a social media platform where users can:

- Register and log in  
- Create, edit, and delete posts  
- Upload images  
- Add comments  
- View user profiles  
- Retrieve posts with pagination  

---

## ✨ Features

- User registration  
- User login  
- JWT authentication  
- User profile retrieval  
- Create posts  
- Retrieve all posts  
- Retrieve a single post  
- Update posts  
- Delete posts  
- Add comments  
- Upload profile images  
- Upload post images  
- Pagination  
- Input validation  
- Error handling  
- Password hashing (bcrypt)  

---

## 🧰 Tech Stack

- Node.js  
- Express.js  
- PostgreSQL  
- SQL  
- JWT  
- Bcrypt  
- Multer  
- Cloudinary  
- Dotenv  
- CORS  
- Git & GitHub  

---

## 🧠 Skills Practiced

- REST API development  
- Backend architecture  
- Express routing  
- PostgreSQL database design  
- SQL queries  
- CRUD operations  
- Authentication & authorization  
- JWT  
- Password hashing  
- File upload handling  
- Cloud image storage  
- Middleware development  
- Error handling  
- Environment variables  
- API testing  
- Git workflow  

---

## 🚀 API Endpoints

### 🔐 Authentication
- POST `/register`
- POST `/login`

### 👤 Users
- GET `/users/:id`

### 📝 Posts
- GET `/posts`
- GET `/posts/:id`
- POST `/posts`
- PUT `/posts/:id`
- DELETE `/posts/:id`

### 💬 Comments
- POST `/posts/:id/comments`

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Configure environment variables
```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### 4️⃣ Start the server
```bash
npm start
```
---
## 🙋‍♀️ Author

**Hajar Al‑Anazi** 

---

# Social Media REST API – واجهة برمجة تطبيقات التواصل الاجتماعي
تم تطوير هذه الـ API خصيصًا لتكون الواجهة الخلفية لمشروع الواجهة الأمامية الخاص بي.

🔗 **رابط المشروع:**  
https://github.com/hajarhr55/social-media-frontend

---


واجهة REST API مبنية باستخدام Node.js وExpress.js وPostgreSQL.
تدير تسجيل الدخول، المستخدمين، المنشورات، التعليقات، ورفع الصور باستخدام Cloudinary.

---

## 📖 نظرة عامة على المشروع
تتيح هذه الـ API للمستخدمين:

التسجيل وتسجيل الدخول

إنشاء وتعديل وحذف المنشورات

رفع الصور

إضافة التعليقات

عرض الملفات الشخصية

استعراض المنشورات مع دعم الترقيم (Pagination)

---

## ✨ المميزات
تسجيل مستخدمين

تسجيل الدخول

مصادقة JWT

جلب بيانات المستخدم

إنشاء منشورات

جلب جميع المنشورات

جلب منشور واحد

تعديل المنشورات

حذف المنشورات

إضافة تعليقات

رفع صور الملف الشخصي

رفع صور المنشورات

التحقق من المدخلات

التعامل مع الأخطاء

تشفير كلمات المرور

---

## 🧰 التقنيات المستخدمةا
Node.js

Express.js

PostgreSQL

SQL

JWT

Bcrypt

Multer

Cloudinary

Dotenv

CORS

Git & GitHub

---

## 🧠 المهارات المكتسبة
تطوير REST API

تصميم البنية الخلفية

تنظيم المسارات في Express

تصميم قواعد بيانات PostgreSQL

كتابة استعلامات SQL

عمليات CRUD

المصادقة والصلاحيات

JWT

تشفير كلمات المرور

رفع الملفات

تخزين الصور في السحابة

تطوير Middleware

التعامل مع الأخطاء

استخدام المتغيرات البيئية

اختبار الـ API

Git Workflow

---

## 🚀 المسارات (Endpoints)
المصادقة
POST /register

POST /login

المستخدمون
GET /users/:id

المنشورات
GET /posts

GET /posts/:id

POST /posts

PUT /posts/:id

DELETE /posts/:id

التعليقات
POST /posts/:id/comments

---

## ⚙️ البدء بالمشروع
### 1️⃣ استنساخ المشروع
```bash
git clone <repository-url>
```
### 2️⃣ تثبيت الحزم
```bash
npm install
```
### 3️⃣ إعداد ملف البيئة
```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### 4️⃣ تشغيل الخادم
```bash
npm start
```
---

## 🙋‍♀️ المطورة

**هاجر العنزي**
