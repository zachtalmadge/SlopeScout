#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models.event import Event
from models.resort_event import ResortEvent
from models.resorts import Resort
from models.review import Review
from models.user import User
from models.user_event import UserEvent

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
