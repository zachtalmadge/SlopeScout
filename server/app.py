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

# Routes
class Resorts(Resource):
    def get(self):
        try:
            resorts = Resort.query.all()
            return [resort.to_dict(
                rules=('id', 'name', 'city', 'state', 'description', 'events', 'bookmarks')
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
                rules=('id', 'name', 'city', 'state', 'description', 'events', 'bookmarks', 'reviews', 'resort_map')
            )
        return {'message': 'Resort not found'}, 404

class GetResortReview(Resource):
     def get(self, resort_id):
        try:
            reviews = Review.query.filter_by(resort_id=resort_id).all()
            return [review.to_dict() for review in reviews], 200
        except Exception as e:
            return {"error": str(e)}, 500
        
api.add_resource(GetResortReview, '/resort/reviews/<int:resort_id>')

class ResortReview(Resource):
    
    def post(self):
        data = request.get_json()
        review = Review(user_id=1, **data)
        try:
            db.session.add(review)
            db.session.commit()
            return review.to_dict(
                rules=('id', 'text', 'rating', 'resort_id')
                ), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 422

    def delete(self):
        data = request.get_json()
        if review:= db.session.get(Review, data['id']):
            try:
                db.session.delete(review)
                db.session.commit()
                return {'message': 'Review deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 404
        return {'message': 'Review not found'}, 404

    def put(self):
        data = request.get_json()
        if review := db.session.get(Review, data['id']):
            try:
                for attr in data:
                    setattr(review, attr, data[attr])
                db.session.add(review)
                db.session.commit()
                return review.to_dict(), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {'message': 'Review not found'}, 404
    
# Post / Delete / Put a review for a resort 
api.add_resource(ResortReview, '/resort/reviews')


class UserBookmarks(Resource):

    def get(self, user_id, resort_id):
        try:
            bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
            return [bookmark.to_dict(
                rules=('-resort.events', '-resort.bookmarks', '-resort.reviews',)
                ) for bookmark in bookmarks], 200
        except Exception as e:
            return {'message': str(e)}, 500

    def post(self, user_id, resort_id):
        try:
            # Check if the bookmark already exists for the user
            existing_bookmark = Bookmark.query.filter_by(user_id=1, resort_id=resort_id).first()
            if existing_bookmark:
                return {'message': 'Bookmark already exists for this user and resort'}, 400
            bookmark = Bookmark(user_id=user_id, resort_id=resort_id)
            db.session.add(bookmark)
            db.session.commit()
            return bookmark.to_dict(
                rules=('-resort.events', '-resort.bookmarks', '-resort.reviews',)
            ), 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    def delete(self, user_id, resort_id):
        try:
            if bookmark := Bookmark.query.filter_by(user_id=1, resort_id=resort_id).first():
                db.session.delete(bookmark)
                db.session.commit()
                return {'message': 'Bookmark deleted'}, 200
            return {'message': 'Bookmark not found'}, 404
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

# Get all resorts ✅✅✅
api.add_resource(Resorts, '/resorts')

# Get resort by ID ✅✅✅
api.add_resource(ResortByID, '/resorts/<int:id>')

# Get / Post / Delete a user bookmark ✅✅✅
api.add_resource(UserBookmarks, '/user/<int:user_id>/bookmark/<int:resort_id>')

# Get all types of events ✅✅✅
api.add_resource(Events, '/events')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)