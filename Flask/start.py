
from flask import Flask, request, Response, redirect, url_for
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/matt"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

    

class Weather(db.Model):
    __tablename__ = 'details'

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String())
    temperature = db.Column(db.Integer)
    windspeed = db.Column(db.Integer)
    event = db.Column(db.String())

    def __init__(self, day, temperature, windspeed, event):
        self.day = day
        self.temperature = temperature
        self.windspeed = windspeed
        self.event = event

    def __repr__(self):
        return f"<Car {self.event}>"


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    userId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    contact = db.Column(db.Integer, nullable = False)
    type = db.Column(db.String(), nullable=False, default = 'user')
    password_hash = db.Column(db.String(), nullable=False)

    @property
    def password(self):
        raise AttributeError('password is not readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def json(self):
        return  {'userId' : self.userId, 'name': self.name, 'email':self.email, 'contact':self.contact, 'type': self.type}

    def add_user(_userId, _name, _email, _contact, _password):
        new_user = User(userId = _userId, name=_name, email = _email, contact = _contact, password=_password)

        db.session.add(new_user)
        db.session.commit()

    def get_all_users():
        return [User.json(user) for user in User.query.all()]


    def get_user(_id):
        
        return (User.query.filter_by(userId=_id).first())
        
    def update_user(_userId,_name, _email, _contact, _password):
        
        user_to_update = User.query.filter_by(userId=_userId).first()
        user_to_update.name = _name
        user_to_update.email = _email
        user_to_update.contact = _contact
        user_to_update.password = _password
        db.session.commit()



    def delete_user(_userId):
        User.query.filter_by(userId=_userId).delete()
        
        db.session.commit()


@app.route('/users/add', methods=['POST'])
def add_user():
    request_data = request.get_json()
    checkId = User.get_user(request_data["userId"])
    if checkId is None:
        User.add_user(request_data["userId"], request_data["userName"],
                     request_data["userEmail"], request_data["userMobile"], request_data["userPassword"])
        
        currentUser = User.json(User.get_user(request_data["userId"]))
    else:
        currentUser = None


    return jsonify([{'User': currentUser}])




@app.route('/users', methods=['GET'])
def get_users():
    return jsonify([{'Users': User.get_all_users()}])
    

@app.route('/')
def index():
    results ={ 
        "data":[
            {
                "day": "",
                "temperature": 5,
                "windspeed": 56,
                "event": ""
                
                
            }]
    }
        
    return jsonify([results])


@app.route('/users/login', methods=['POST'])
def login():
    request_data = request.get_json()
    user = User.get_user(request_data["userId"])
    
    if user is not None and user.verify_password(request_data["userPassword"]):
            user = User.json(user)
        
    
    return jsonify([{"User": user}])



@app.route('/log', methods=['GET'])
def log():
    
    user = User.get_user(21)
    if user:
        user = User.json(user)
    else :
        user = None
    
    return jsonify(user)












if __name__ == '__main__':
    app.run(debug=True)




    