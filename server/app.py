#!/usr/bin/env python3
from flask import request
from flask_restful import Resource
from config import app, db, api

# route imports
from routes.all_resorts import Resorts
from routes.events_routes import Events
from routes.resort_by_id import ResortByID
from routes.user_bookmarks import UserBookmarks
from routes.resort_events import ResortEvents
from routes.resort_review import ResortReview
from routes.user_events import UserEvents


# Routes
# Get all resorts
api.add_resource(Resorts, '/resorts')

# Get resort by ID
api.add_resource(ResortByID, '/resorts/<int:id>')

# Post an event to a resort
api.add_resource(ResortEvents, '/resort/<int:resort_id>/event/<int:event_id>')

# Post / Delete / Put a review for a resort
api.add_resource(ResortReview, '/resort/<int:id>/review')

# Get / Post / Delete a user bookmark
api.add_resource(UserBookmarks, '/user/<int:user_id>/bookmark/<int:resort_id>')

# Get / Post / Delete a user event
api.add_resource(UserEvents, '/user/<int:user_id>/bookmark/<int:resort_id>')

# Get all types of events
api.add_resource(Events, '/events')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    # app.run(port=5555, debug=True)
    print (Resorts)

