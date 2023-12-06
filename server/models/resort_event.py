from . import validates, SerializerMixin, association_proxy

from config import db

class ResortEvent(db.Model, SerializerMixin):
    __tablename__ = 'resort_events'
    
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Integer)
    resort_id = db.Column(db.Integer, db.ForeignKey('resorts.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    resort = db.relationship('Resort', back_populates='events')
    event = db.relationship('Event', back_populates='resort_events')
    
    serialize_rules = ('-resort.events')