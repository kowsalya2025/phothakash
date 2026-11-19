# Akash Photography - PHP Backend

A lightweight, secure, and production-ready PHP REST backend for the **Akash Photography** application.

---

## 📁 Directory Structure

```text
backend/
├── api/
│   ├── inquiry.php        # POST: Submit new booking inquiry (validated & saved)
│   ├── inquiries.php      # GET: List all inquiries (Admin view)
│   ├── services.php       # GET: List 9 photography services
│   └── testimonials.php   # GET: List client testimonials & reviews
├── config/
│   ├── cors.php           # CORS headers & preflight OPTIONS handler
│   └── database.php       # PDO Database connection (SQLite default / MySQL ready)
├── db/
│   └── inquiries.db       # SQLite database file (auto-created on first run)
├── index.php              # API overview & health check
└── README.md              # Documentation
```

---

## 🚀 How to Run Locally

### Option 1: Built-in PHP Server (Recommended for local dev)
Run the following in the project root:
```bash
php -S localhost:8000 -t backend
```
The API is now live at: `http://localhost:8000/`

Test endpoints:
- `http://localhost:8000/index.php` (API status)
- `http://localhost:8000/api/services.php`
- `http://localhost:8000/api/testimonials.php`
- `http://localhost:8000/api/inquiries.php`

### Option 2: XAMPP / WAMP / MAMP
1. Copy the `backend/` folder into your Apache document root:
   - XAMPP: `C:\xampp\htdocs\photoakash\backend`
2. The endpoints will be accessible at:
   - `http://localhost/photoakash/backend/api/inquiry.php`

---

## 🗄️ Database

By default, the backend uses **SQLite PDO**, which requires **zero configuration** and stores data in `backend/db/inquiries.db`. The `inquiries` table is automatically created on first request.

### Switching to MySQL / MariaDB (Optional for Shared Hosting)
In `backend/config/database.php`, change:
```php
private static $driver = 'mysql';
private static $mysqlHost = 'localhost';
private static $mysqlDb   = 'akash_photography';
private static $mysqlUser = 'your_username';
private static $mysqlPass = 'your_password';
```

---

## 🔌 API Endpoints Reference

### 1. Submit Inquiry
- **Method**: `POST`
- **URL**: `/api/inquiry.php`
- **Headers**: `Content-Type: application/json`
- **Payload**:
```json
{
  "name": "Akash Sharma",
  "email": "akash@example.com",
  "phone": "+91 9876543210",
  "whatsapp": "+91 9876543210",
  "date": "2026-12-15",
  "eventType": "Wedding",
  "location": "Chennai",
  "message": "Looking for cinematic wedding photography coverage."
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Thank you for contacting Akash Photography!...",
  "inquiry_id": 1,
  "data": { ... }
}
```

### 2. Get All Inquiries
- **Method**: `GET`
- **URL**: `/api/inquiries.php`
