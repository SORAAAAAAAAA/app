import re
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Initialize Flask app, database, and bcrypt
app = Flask(__name__)
CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///new_users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Define a User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    phoneNum = db.Column(db.Integer, nullable=False)

# Create the database (run this once, e.g., in a separate script)
with app.app_context():
    db.create_all()

class BaseService:
    def __init__(self):
        self.email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

    def validate_email(self, email):
        if not re.match(self.email_regex, email):
            return False
        return True

class UserService(BaseService):
    def __init__(self):
        super().__init__()

    def register_user(self, data):
        email = data.get('email')
        password = data.get('password')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        phoneNum = data.get('phoneNum')
        confirmPassword = data.get('confirmPassword')

        if not self.validate_email(email):
            return {"error": "Invalid email address!"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "User already exists!"}, 400

        if password != confirmPassword:
            return {"error": "Passwords do not match!"}, 400

        if len(password) < 8:
            return {"error": "Password must be at least 8 characters long!"}, 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, firstName=firstName, lastName=lastName, phoneNum=phoneNum)
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201

class LogSign:
    def __init__(self):
        self.user_service = UserService()

    @staticmethod
    @app.route('/')
    def hello():
        return jsonify({"message": "Hello, World!"})

    @staticmethod
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        user_service = UserService()
        response, status = user_service.register_user(data)
        return jsonify(response), status

log_sign = LogSign()

if __name__ == '__main__':
    app.run(debug=True)