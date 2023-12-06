from flask import request
from flask_restful import Resource
from models.resort_event import ResortEvent
from config import db

class ResortEvents(Resource):
    def post(self, resort_id, event_id):
        try:
            # Assuming event_id is provided in the request body if needed
            data = request.get_json()
            resort_event = ResortEvent(resort_id=resort_id, event_id=event_id, time=data.get('time'))

            db.session.add(resort_event)
            db.session.commit()
            return resort_event.to_dict(), 201

        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500