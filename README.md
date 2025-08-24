# Backend: Node.js To-do REST API (No Database)

Simple REST API using **Express + TypeScript** with **in-memory storage** (no database).

---

## 🚀 Run

```bash
npm install
npm run dev
# open http://localhost:3000/health
```

## 📦 Build & Start

```bash
npm run build
npm start
```

---

## 🗑️ Endpoints

| Method | URL         | Description                                  | Body Example                                |
| ------ | ----------- | -------------------------------------------- | ------------------------------------------- |
| GET    | /health     | Check if API is running                      | -                                           |
| GET    | /todos      | Get all todos (optional query: q, completed) | -                                           |
| GET    | /todos/\:id | Get todo by ID                               | -                                           |
| POST   | /todos      | Create a new todo                            | `{ "title": "string", "completed": false }` |
| PATCH  | /todos/\:id | Update a todo partially                      | `{ "completed": true }`                     |
| PUT    | /todos/\:id | Replace a todo                               | `{ "title": "string", "completed": false }` |
| DELETE | /todos/\:id | Delete a todo                                | -                                           |

---

## 🤚 Testing with Postman

### 1. ตรวจสอบ API ว่ายังทำงานอยู่

* **Method:** `GET`
* **URL:** `http://localhost:3000/health`
* **Headers:** (ไม่ต้องใส่)
* **Body:** (ไม่ต้องใส่)

### 2. สร้าง todo ใหม่

* **Method:** `POST`
* **URL:** `http://localhost:3000/todos`
* **Headers:** `Content-Type: application/json`
* **Body (raw → JSON):**

```json
{
  "title": "Buy milk"
}
```

### 3. ดู todos ทั้งหมด

* **Method:** `GET`
* **URL:** `http://localhost:3000/todos`
* **Headers:** (ไม่ต้องใส่)
* **Body:** (ไม่ต้องใส่)

### 4. อัปเดต todo (id=1)

* **Method:** `PATCH`
* **URL:** `http://localhost:3000/todos/1`
* **Headers:** `Content-Type: application/json`
* **Body (raw → JSON):**

```json
{
  "completed": true
}
```

### 5. ลบ todo (id=1)

* **Method:** `DELETE`
* **URL:** `http://localhost:3000/todos/1`
* **Headers:** (ไม่ต้องใส่)
* **Body:** (ไม่ต้องใส่)


