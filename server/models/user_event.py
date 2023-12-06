from . import validates, SerializerMixin, association_proxy

from config import db

class UserEvent(db.Model, SerializerMixin):
    __tablename__ = 'user_events'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    
    user = db.relationship('User', back_populates='user_events')
    event = db.relationship('Event', back_populates='user_events')