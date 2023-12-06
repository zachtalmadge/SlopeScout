from flask import request
from flask_restful import Resource
from models.review import Review
from config import db

class ResortReview(Resource):
    def post(self, resort_id):
        data = request.get_json()
        try:
            review = Review(text=data['text'], rating=data['rating'], resort_id=resort_id)
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    def delete(self, resort_id):
        data = request.get_json()
        review_id = data.get('review_id')
        try:
            review = Review.query.filter_by(id=review_id, resort_id=resort_id).first()
            if review:
                db.session.delete(review)
                db.session.commit()
                return {'message': 'Review deleted'}, 200
            return {'message': 'Review not found'}, 404
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    def put(self, resort_id):
        data = request.get_json()
        review_id = data.get('review_id')
        try:
            review = Review.query.filter_by(id=review_id, resort_id=resort_id).first()
            if review:
                review.text = data.get('text', review.text)
                review.rating = data.get('rating', review.rating)
                db.session.commit()
                return review.to_dict(), 200
            return {'message': 'Review not found'}, 404
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500