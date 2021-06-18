from flask import request, jsonify
from .import auth
from ..models import *
from ..import db
from flask_login import login_user, login_required, current_user


@auth.route('/users/add', methods=['POST'])
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

@auth.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
    user = User.get_user(request_data["userId"])
    
    
    if user is not None and user.verify_password(request_data["userPassword"]):
        login_user(user, request_data["remember_me"])
        user = User.json(user)
        
    
    return jsonify([{"User": user}])


@auth.route('/log', methods=['GET'])
def log():
    
    user = User.get_user(21)
    if user:
        user = User.json(user)
    else :
        user = None
    
    return jsonify(user)
