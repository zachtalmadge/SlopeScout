#!/usr/bin/env python3
from flask import request
from flask_restful import Resource
from config import app, db, api
from faker import Faker

from models import (
    Resort, 
    Event, 
    User, 
    ResortEvent, 
    UserEvent, 
    Bookmark, 
    Review
)

fake = Faker()


# Routes
class Resorts(Resource):
    def get(self):
        try:
            resorts = Resort.query.all()
            return [resort.to_dict(
                    rules=('-reviews',)
                ) for resort in resorts], 200
        except Exception as e:
            return {"error": str(e)}, 404


class Events(Resource):
    def get(self):
        events = Event.query.all()
        return [event.to_dict(
            rules=('-resort_events',)
            ) for event in events], 200


class ResortByID(Resource):
    def get(self, id):
        if resort := Resort.query.get(id):
            return resort.to_dict(
                rules=('-events', '-reviews', '-bookmarks')
            )
        return {'message': 'Resort not found'}, 404


class ResortEvents(Resource):
    def post(self, resort_id, event_id):
            # Assuming event_id is provided in the request body if needed
            data = request.get_json()
            resort_event = ResortEvent(resort_id=resort_id, event_id=event_id, time=fake.date_time_this_year())
            print(resort_event)
            try:
                db.session.add(resort_event)
                db.session.commit()
                return resort_event.to_dict(), 201

            except Exception as e:
                db.session.rollback()
                return {'message': str(e)}, 500


class ResortReview(Resource):
    def post(self, resort_id):
        data = request.get_json()
        review = Review(text=data['text'], rating=data['rating'], resort_id=resort_id)
        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 201

    def delete(self, resort_id):
        data = request.get_json()
        review_id = data.get('review_id')
        review = Review.query.filter_by(id=review_id, resort_id=resort_id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review deleted'}, 200
        return {'message': 'Review not found'}, 404

    def put(self, resort_id):
        data = request.get_json()
        review_id = data.get('review_id')
        review = Review.query.filter_by(id=review_id, resort_id=resort_id).first()
        if review:
            review.text = data.get('text', review.text)
            review.rating = data.get('rating', review.rating)
            db.session.commit()
            return review.to_dict(), 200
        return {'message': 'Review not found'}, 404


class UserEvents(Resource):
    def get(self, user_id, resort_event_id):
        try:
            user_events = UserEvent.query.filter_by(user_id=user_id, event_id=resort_event_id).all()
            return [user_event.to_dict() for user_event in user_events], 200
        except Exception as e:
            return {'message': str(e)}, 500

    def post(self, user_id, resort_event_id):
        try:
            user_event = UserEvent(user_id=user_id, event_id=resort_event_id)
            db.session.add(user_event)
            db.session.commit()
            return user_event.to_dict(), 201
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


class UserBookmarks(Resource):
    def get(self, user_id, resort_id):
        try:
            bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
            return [bookmark.to_dict() for bookmark in bookmarks], 200
        except Exception as e:
            return {'message': str(e)}, 500

    def post(self, user_id, resort_id):
        try:
            bookmark = Bookmark(user_id=user_id, resort_id=resort_id)
            db.session.add(bookmark)
            db.session.commit()
            return bookmark.to_dict(
                rules=('-resort',)
            ), 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    def delete(self, user_id, resort_id):
        try:
            if bookmark := Bookmark.query.filter_by(user_id=user_id, resort_id=resort_id).first():
                db.session.delete(bookmark)
                db.session.commit()
                return {'message': 'Bookmark deleted'}, 200
            return {'message': 'Bookmark not found'}, 404
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

# Get all resorts ✅
api.add_resource(Resorts, '/resorts')

# Get resort by ID ✅
api.add_resource(ResortByID, '/resorts/<int:id>')

# Post an event to a resort
api.add_resource(ResortEvents, '/resort/<int:resort_id>/event/<int:event_id>')

# Post / Delete / Put a review for a resort
api.add_resource(ResortReview, '/resort/<int:id>/review')

# Get / Post / Delete a user bookmark
api.add_resource(UserBookmarks, '/user/<int:user_id>/bookmark/<int:resort_id>')

# Get / Post / Delete a user event
api.add_resource(UserEvents, '/user/<int:user_id>/bookmark/<int:resort_id>')

# Get all types of events ✅
api.add_resource(Events, '/events')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

