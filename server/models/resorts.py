from . import validates, SerializerMixin, association_proxy

from config import db

class Resort(db.Model, SerializerMixin):
    __tablename__ = 'resorts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    description = db.Column(db.String)

    # Relationships
    events = db.relationship('ResortEvent', back_populates='resort')
    reviews = db.relationship('Review', back_populates='resort')
    bookmarks = db.relationship('Bookmark', back_populates='resort')
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name cannot be empty.")
        return name

    @validates('city')
    def validate_city(self, key, city):
        if not city:
            raise ValueError("City cannot be empty.")
        return city

    @validates('state')
    def validate_state(self, key, state):
        if not state:
            raise ValueError("State cannot be empty.")
        return state