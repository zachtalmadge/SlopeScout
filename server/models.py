from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re
from datetime import datetime

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    

class Resort(db.Model, SerializerMixin):
    __tablename__ = 'resorts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    description = db.Column(db.String)

    # Relationships
    events = db.relationship('ResortEvent', back_populates='resort', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='resort', cascade='all, delete-orphan')
    bookmarks = db.relationship('Bookmark', back_populates='resort', cascade='all, delete-orphan')
    
    # serialize_rules = ('-events.resort', '-reviews.resort', '-bookmarks.resort')
    # serialize_only = ('',)
    
    
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
    
    
class Bookmark(db.Model, SerializerMixin):
    __tablename__ = 'bookmarks'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    resort_id = db.Column(db.Integer, db.ForeignKey('resorts.id'), primary_key=True)
    
    resort = db.relationship('Resort', back_populates='bookmarks')
    
    serialize_only = ('user_id', 'resort_id')
    
    
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    
    resort_events = db.relationship('ResortEvent', back_populates='event')
    
    # serialization_rules = ('-resort_events',)
    serialize_only = ('id', 'name', 'description')
    
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
    
    
class ResortEvent(db.Model, SerializerMixin):
    __tablename__ = 'resort_events'
    
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime)
    resort_id = db.Column(db.Integer, db.ForeignKey('resorts.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    resort = db.relationship('Resort', back_populates='events')
    event = db.relationship('Event', back_populates='resort_events')
    
    serialize_only=('id', 'time', 'resort_id', 'event_id', 'event')
    
    
class UserEvent(db.Model, SerializerMixin):
    __tablename__ = 'user_events'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('resort_events.id'))
    
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    resort_id = db.Column(db.Integer, db.ForeignKey('resorts.id'))
    
    resort = db.relationship('Resort', back_populates='reviews')
    
    serialize_rules = ('-resort.reviews')