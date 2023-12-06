#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import User
from models import Event
from models import ResortEvent
from models import Resort
from models import Review
from models import UserEvent

def create_users():
    pass

def create_events():
    pass

def create_resorts():
    pass

def create_resort_events():
    pass

def create_reviews():
    pass

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Event.query.delete()
        ResortEvent.query.delete()
        Resort.query.delete()
        Review.query.delete()
        User.query.delete()
        UserEvent.query.delete()