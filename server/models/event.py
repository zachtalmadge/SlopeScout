from . import validates, SerializerMixin, association_proxy

from config import db

class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Event name cannot be empty.")
        return name

    @validates('description')
    def validate_description(self, key, description):
        if not description:
            raise ValueError("Event description cannot be empty.")
        return description