from . import validates, SerializerMixin, association_proxy

from config import db

class Bookmark(db.Model, SerializerMixin):
    __tablename__ = 'bookmarks'
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    resort_id = db.Column(db.Integer, db.ForeignKey('resort.id'), primary_key=True)
    
    user = db.relationship('User', back_populates='bookmarks')
    resort = db.relationship('Resort', back_populates='bookmarks')