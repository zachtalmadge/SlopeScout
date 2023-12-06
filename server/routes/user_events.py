from flask import request
from flask_restful import Resource
from models.user_event import UserEvent
from config import db

class UserEvents(Resource):
    def get(self, user_id, resort_event_id):
        try:
            user_events = UserEvent.query.filter_by(user_id=user_id, event_id=resort_event_id).all()
            return [user_event.serialize() for user_event in user_events], 200
        except Exception as e:
            return {'message': str(e)}, 500

    def post(self, user_id, resort_event_id):
        try:
            user_event = UserEvent(user_id=user_id, event_id=resort_event_id)
            db.session.add(user_event)
            db.session.commit()
            return user_event.serialize(), 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    def delete(self, user_id, resort_event_id):
        try:
            if user_event:= UserEvent.query.filter_by(user_id=user_id, event_id=resort_event_id).first():
                db.session.delete(user_event)
                db.session.commit()
                return {'message': 'Event registration deleted'}, 200
            return {'message': 'Event registration not found'}, 404
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500