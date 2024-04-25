from flask import Flask, jsonify, request
import uuid

app = Flask(__name__)

books = []

def validate_book_data(book_data):
    required_fields = ['title', 'author', 'price', 'category', 'publication_year']
    for field in required_fields:
        if field not in book_data:
            return False
    return True

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books/<string:book_id>', methods=['GET'])
def get_book(book_id):
    for book in books:
        if book['id'] == book_id:
            return jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

@app.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    if not validate_book_data(data):
        return jsonify({'error': 'Incomplete book data'}), 400
    
    book = {
        'id': str(uuid.uuid4()),
        'title': data['title'],
        'author': data['author'],
        'price': data['price'],
        'category': data['category'],
        'publication_year': data['publication_year']
    }
    books.append(book)
    return jsonify(book), 201

@app.route('/books/<string:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.get_json()
    if not validate_book_data(data):
        return jsonify({'error': 'Incomplete book data'}), 400
    
    for book in books:
        if book['id'] == book_id:
            book.update({
                'title': data['title'],
                'author': data['author'],
                'price': data['price'],
                'category': data['category'],
                'publication_year': data['publication_year']
            })
            return jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

@app.route('/books/<string:book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books
    books = [book for book in books if book['id'] != book_id]
    return jsonify({'message': 'Book deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
