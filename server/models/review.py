from . import validates, SerializerMixin, association_proxy

from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    resort_id = db.Column(db.Integer, db.ForeignKey('resort.id'))
    
    resort = db.relationship('Resort', back_populates='reviews')
    
    serialize_rules = ('-resort.reviews')