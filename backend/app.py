from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/alexialibrary"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200))
    year = db.Column(db.Integer)


@app.get("/api/books")
def get_books():
    books = Book.query.all()

    return jsonify([
        {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "year": book.year
        }
        for book in books
    ])


@app.post("/api/books")
def add_book():
    data = request.json

    book = Book(
        title=data["title"],
        author=data.get("author"),
        year=data.get("year")
    )

    db.session.add(book)
    db.session.commit()

    return jsonify({
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "year": book.year
    }), 201


@app.put("/api/books/<int:id>")
def update_book(id):
    book = db.get_or_404(Book, id)
    data = request.json

    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.year = data.get("year", book.year)

    db.session.commit()

    return jsonify({"message": "Book updated"})


@app.delete("/api/books/<int:id>")
def delete_book(id):
    book = db.get_or_404(Book, id)

    db.session.delete(book)
    db.session.commit()

    return jsonify({"message": "Book deleted"})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
