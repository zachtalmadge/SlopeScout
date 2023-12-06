from flask import request
from flask_restful import Resource
from models.bookmark import Bookmark
from config import db

class UserBookmarks(Resource):
    def get(self, user_id, resort_id):
        try:
            bookmarks = Bookmark.query.filter_by(user_id=user_id, resort_id=resort_id).all()
            return [bookmark.to_dict() for bookmark in bookmarks], 200
        except Exception as e:
            return {'message': str(e)}, 500

    def post(self, user_id, resort_id):
        try:
            bookmark = Bookmark(user_id=user_id, resort_id=resort_id)
            db.session.add(bookmark)
            db.session.commit()
            return bookmark.to_dict(), 201
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