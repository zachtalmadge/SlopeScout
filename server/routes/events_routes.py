from flask_restful import Resource
from models.event import Event

class Events(Resource):
    def get(self):
        events = Event.query.all()
        return [event.to_dict() for event in events], 200