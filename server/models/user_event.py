from . import validates, SerializerMixin, association_proxy

from config import db

class UserEvent(db.Model, SerializerMixin):
    __tablename__ = 'user_events'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('resort_events.id'))