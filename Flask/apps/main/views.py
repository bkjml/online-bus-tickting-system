from . import main
from flask import request,jsonify
from ..models import *




@main.route('/users', methods=['GET'])
def get_users():
    return jsonify([{'Users': User.get_all_users()}])


@main.route('/addBus', methods=['POST'])
def addBus():
    request_data = request.get_json()
    checkId = Bus.get_bus(request_data["busId"])
    if checkId is None:
        Bus.add_bus(request_data["busId"], request_data["busName"], request_data["startingPoint"], request_data["endingPoint"],
                    request_data["totalSeats"], request_data["cost"], request_data["busType"])
        addedBus = Bus.json(Bus.get_bus(request_data["busId"]))
    else:
        addedBus = None


    return jsonify([{'Bus' : addedBus}])

@main.route('/setAvailability', methods=['POST'])
def setAvail():
    request_data = request.get_json()
    checkId = Bus.get_bus(request_data["busId"])
    if checkId is None:
        availBus = None
        
    else:
        Bus.set_Avail(request_data["availableDate"], request_data["availableSeat"], request_data["busId"])
        availBus = Bus.get_avail_buses() #Bus.jsonavail(Bus.get_avail_bus[request_data["busId"]])
        
    return jsonify([{'Bus': availBus}])


@main.route('/check', methods=['GET', 'POST'])
def checkAvail():
    request_data = request.get_json()
    availBuses =  Bus.get_search_buses(request_data["availableDate"], request_data["startingPoint"], request_data["endingPoint"])
    
    return jsonify([{'Check': availBuses}])

@main.route('/bookTicket', methods=['GET','POST'])
def bookTicket():
    request_data = request.get_json()
    checkBus = Bus.jsonavail(Bus.get_bus(1))
    if (checkBus is not None) and (checkBus["availDate"] is not None) and (checkBus["availSeat"] >= 0):
        if (checkBus["availSeat"] > request_data["numOfSeats"]):
            

            idcheck = Ticket.get_Tickets(request_data["tickeId"])
            if(idcheck is None):
                Ticket.add_Ticket(request_data["tickeId"], request_data["numOfSeats"], checkBus["busId"], checkBus["availDate"], request_data["userId"])
                seats = checkBus["availSeat"] - request_data["numOfSeats"]
                Bus.update_seat(seats, checkBus["busId"])
                checkBus = Ticket.json(Ticket.get_Tickets(request_data["tickeId"]))
        
    else:
        checkBus = None
   
    return jsonify([{"Ticket":checkBus}])


@main.route('/avail', methods=['GET'])
def avail():

    return jsonify([{'Bus': Bus.get_avail_buses()}])


@main.route('/buses', methods=['GET'])
def get_buses():

    return jsonify([{'Bus': Bus.get_all_buses()}])

@main.route('/getTicket', methods=["POST", "GET"])
def get_ticket():

    request_data = request.get_json()
    checkId = Ticket.get_Tickets(request_data["bookingId"])
    if checkId is not None:
        checkId = Ticket.json(checkId)
    return jsonify([{"Ticket" : checkId}])

@main.route('/deleteTicket', methods=["POST", "GET"])
def deleteTicket():
    request_data = request.get_json()
    return jsonify([{"Ticket": Ticket.delete_Ticket(request_data["bookingId"])}]) 

