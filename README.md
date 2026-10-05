# Alexia's Library

A full-stack web application for searching and saving books.

## Features

- Responsive HTML/CSS frontend
- Personal profile with skills
- JavaScript form validation
- Search books by title using the Open Library API
- Loading and error messages
- Save books to a PostgreSQL database
- View saved books
- REST API with CRUD operations using Flask

## Technologies

- HTML
- CSS
- JavaScript
- Open Library API
- Python
- Flask
- Flask-SQLAlchemy
- PostgreSQL

## Project Structure

```text
project/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Create the PostgreSQL database

Create a PostgreSQL database called:

```text
alexialibrary
```

The PostgreSQL server should run on the default port `5432`.

### 5. Configure the database

In `backend/app.py`, set the PostgreSQL connection:

```python
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/alexialibrary"
)
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### 6. Run the backend

From the project folder:

```bash
python backend/app.py
```

The Flask server will run at:

```text
http://127.0.0.1:5000
```

The database tables are created automatically when the application starts.

### 7. Open the frontend

Open `frontend/index.html` in a browser.

The application can now:

- Search books using Open Library
- Save books through the Flask API
- Store books in PostgreSQL
- Display saved books from the database

## REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get all saved books |
| POST | `/api/books` | Save a new book |
| PUT | `/api/books/<id>` | Update a book |
| DELETE | `/api/books/<id>` | Delete a book |

## Development Stages

### Stage 1 — Frontend

Implemented:
- Responsive HTML/CSS layout
- Personal information and skills
- JavaScript form validation

### Stage 2 — API Integration

Implemented:
- Open Library API
- Book title search
- `fetch()` and `async/await`
- JSON processing
- Loading indicator
- Error handling

### Stage 3 — Backend and Database

Implemented:
- Flask REST API
- PostgreSQL database
- SQLAlchemy ORM
- CRUD operations
- Saving books from the frontend
- Displaying saved books from PostgreSQL

## Git Commits

The project was developed incrementally with separate commits:

```text
feat: add responsive frontend and form validation
feat: integrate Open Library API
feat: add Flask REST API and PostgreSQL book storage
```
