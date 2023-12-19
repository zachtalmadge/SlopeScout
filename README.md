# SlopeScout

## Overview

SlopeScout is an innovative web application tailored for ski and snowboarding enthusiasts. It's designed to enhance the winter sports experience by providing detailed information, user reviews, and event updates for various ski resorts. With SlopeScout, users can easily find new destinations for their skiing adventures, read and share experiences through reviews, and stay informed about the latest events happening at their favorite resorts. Whether you are a seasoned skier or a beginner, SlopeScout aims to bring the entire skiing community together, making it easier to explore and enjoy the slopes.


## Features

- **Resort Discovery**: Users can browse and discover different ski resorts.
- **Reviews**: Users can read and post reviews for each ski resort.
- **Events**: Information about events happening at different resorts.
- **User Bookmarks**: Users can bookmark their favorite resorts for easy access.
- **Weather Forecast**: Integration to provide weather forecasts for resorts.

## Technologies Used

- **Frontend**: React, Semantic UI React, React Router
- **Backend**: Flask, Flask-RESTful, Flask-SQLAlchemy, Flask-Migrate
- **Database**: SQLite

## Installation and Setup

### Backend Server Installation

1. **Clone the repository**: `git clone https://github.com/zachtalmadge/SlopeScout.git`
2. **Navigate to the server directory**: `cd SlopeScout/server`
3. **Install dependencies** (assuming you have Pipenv installed): `pipenv install`
4. **Enter the virtual environment**: `pipenv shell`
5. **Set up the database**: 
   - Initialize the database: `flask db init`
   - Apply migrations: `flask db upgrade head`
   - Run Seed file: `python seed.py`
6. **Run the server**: `python app.py`
   - The server will start on `localhost:5555`.

### Frontend Client Installation

1. **Navigate to the client directory**: `cd SlopeScout/client`
2. **Install dependencies**: `npm install`
3. **Run the application**: `npm start`
   - The application will start on `localhost:3000`.

## Possible Future Enhancements

- **User Authentication**: Implement user login and registration for personalized experiences.
- **Social Sharing**: Allow users to share their favorite resorts and reviews on social media.
- **Advanced Filtering**: Enhance resort discovery by adding filters for location, ratings, and facilities.
- **Interactive Maps**: Integrate maps for better visualization of resort locations.
- **Mobile Responsiveness**: Optimize the application for a better mobile user experience.

---

Happy Skiing with SlopeScout!