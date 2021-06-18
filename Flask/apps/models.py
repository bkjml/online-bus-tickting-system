from enum import unique
from flask_login import UserMixin
from sqlalchemy.orm import backref
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import datetime



class Bus(db.Model):
    __tablename__ = 'bus'

    busId = db.Column(db.Integer, primary_key=True)
    busName = db.Column(db.String(), nullable=False)
    startingPoint = db.Column(db.String(), nullable=False)
    endingPoint = db.Column(db.String(), nullable=False)
    totalSeats = db.Column(db.String(), nullable=False)
    cost = db.Column(db.Integer, nullable = False)
    busType = db.Column(db.String(), nullable = False)
    availDate = db.Column(db.DateTime)
    availSeat = db.Column(db.Integer)
    
    
    
    ticket = db.relationship('Ticket', backref='bus', lazy=True)

    def jsonavail(self):
        return  {'availDate' : self.availDate, 'availSeat': self.availSeat, 'busId':self.busId}
    
     
    
    def set_Avail(_availDate, _availSeat, _busId):
        bus_to_update = Bus.query.filter_by(busId=_busId).first()
        bus_to_update.availDate = _availDate
        bus_to_update.availSeat = _availSeat
        db.session.commit()

    def update_seat(_availSeat, _busId):
        bus_to_update = Bus.query.filter_by(busId=_busId).first()
        bus_to_update.availSeat = _availSeat
        db.session.commit()

    def get_avail_buses():
        return [Bus.json(bus) for bus in Bus.query.filter(Bus.availDate.isnot(None)).all()]
    
    def get_avail_bus(_id):
        return Bus.query.filter(Bus.availDate.isnot(None), busId = _id).first() 
    
    def get_search_buses( _availDate, _startingPoint, _endingPoint):
        return [Bus.jsonavail(buses) for buses in Bus.query.filter(Bus.availDate == _availDate, Bus.startingPoint == _startingPoint, Bus.endingPoint == _endingPoint).all()]
        
    def get_bus(_id):
        
        return (Bus.query.filter_by(busId=_id).first())

    def json(self):
        return  {'busId' : self.busId, 'busName': self.busName, 'startingPoint':self.startingPoint, 'endingPoint' : self.endingPoint, 'totalSeats':self.totalSeats, 'cost' : self.cost, 'busType': self.busType, 'availDate' : self.availDate, 'availSeat': self.availSeat}
    
    def add_bus(_busId, _busName, _startingPoint, _endingPoint, _totalSeats, _cost, _busType):
        new_bus = Bus(busId = _busId, busName=_busName, startingPoint =_startingPoint, endingPoint = _endingPoint, totalSeats=_totalSeats, cost = _cost, busType = _busType)

        db.session.add(new_bus)
        db.session.commit()


    def delete_bus(_busId):
        Bus.query.filter_by(busId=_busId).delete()
        
        db.session.commit()

    def get_all_buses():
        return [Bus.json(bus) for bus in Bus.query.all()]
'''
    
class Avail(db.Model):
    __tablename__ = 'avail'
    
    
    availDate = db.Column(db.DateTime, nullable=False)
    availSeat = db.Column(db.DateTime, nullable=False)
    busId = db.Column(db.Integer, db.ForeignKey('bus.busId'),  unique=True)

    ticket = db.relationship('Ticket', backref='avail', lazy=True)

    def json(self):
        return  {'availDate' : self.availDate, 'availSeat': self.availSeat, 'busId':self.busId}

    def get_avail_buses():
        return [Avail.json(avail) for avail in Avail.query.all()]

    def set_Avail(_availDate, _availSeat, _busId):
        set_avail = User(availDate = _availDate, availSeat = _availSeat, busId = _busId)

        db.session.add(set_avail)
        db.session.commit()
'''


class Ticket(db.Model):
    __tablename__= 'ticket'

    tickeId = db.Column(db.Integer, primary_key=True)
    bookingDate = db.Column(db.DateTime, nullable = False, default=datetime.datetime.utcnow)
    seats =  db.Column(db.Integer, nullable = False)
    busId = db.Column(db.Integer, db.ForeignKey('bus.busId'))
    travelDate = db.Column(db.DateTime)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))

    
    #bus_Id = db.relationship("Bus", foreign_keys=[busId])
    #travel_date = db.relationship("Bus", foreign_keys=[travelDate])
    #user_id = db.relationship("User", foreign_keys=[userId])

    def json(self):
        return  {'ticketId' : self.tickeId, 'bookingDate': self.bookingDate, 'seats':self.seats, 'busId':self.busId, 'travelDate': self.travelDate, 'userId' : self.userId}
    
    def get_all_tickets():
        return [Ticket.json(ticket) for ticket in Ticket.query.all()]
    
    def add_Ticket(_tickeId, _seats, _busId, _travelDate, _userId):
        new_ticket = Ticket(tickeId = _tickeId,seats = _seats, busId = _busId, travelDate=_travelDate, userId = _userId)

        db.session.add(new_ticket)
        db.session.commit()
    def get_Ticket(_seat, _availDate):
        return Ticket.json(Ticket.query.filter(seats = _seat, availDate = _availDate).first())
    def get_Tickets(_id):
        
        return Ticket.query.filter_by(tickeId=_id).first()
    def delete_Ticket(_ticketId):
        Ticket.query.filter_by(tickeId=_ticketId).delete()
        db.session.commit()
    
    


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    contact = db.Column(db.Integer, nullable = False)
    type = db.Column(db.String(), nullable=False, default = 'user')
    password_hash = db.Column(db.String(), nullable=False)

    ticket = db.relationship('Ticket', backref='users', lazy=True)

    @property
    def password(self):
        raise AttributeError('password is not readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def json(self):
        return  {'userId' : self.id, 'name': self.name, 'email':self.email, 'contact':self.contact, 'type': self.type}

    def add_user(_userId, _name, _email, _contact, _password):
        new_user = User(id = _userId, name=_name, email = _email, contact = _contact, password=_password)

        db.session.add(new_user)
        db.session.commit()

    def get_all_users():
        return [User.json(user) for user in User.query.all()]


    def get_user(_id):
        
        return (User.query.filter_by(id=_id).first())
        
    def update_user(_userId,_name, _email, _contact, _password):
        
        user_to_update = User.query.filter_by(id=_userId).first()
        user_to_update.name = _name
        user_to_update.email = _email
        user_to_update.contact = _contact
        user_to_update.password = _password
        db.session.commit()



    def delete_user(_userId):
        User.query.filter_by(id=_userId).delete()
        
        db.session.commit()

