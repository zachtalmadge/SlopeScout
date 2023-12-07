#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import (
    Resort, 
    Event, 
    User, 
    ResortEvent, 
    UserEvent, 
    Bookmark, 
    Review
)


def create_users():
    for _ in range(20):
        user = User()
        db.session.add(user)

    db.session.commit()

def create_events():
    events = [
        Event(
            name="Ski and Snowboard Competitions",
            description="Competitions involving skiing and snowboarding, including races, freestyle events, and big air contests."
        ),
        Event(
            name="Terrain Park Events",
            description="Freestyle riding events in terrain parks, such as rail jams, slopestyle competitions, and halfpipe contests."
        ),
        Event(
            name="Après-Ski Parties",
            description="Post-skiing gatherings featuring live music, DJs, and drink specials to create a festive atmosphere."
        ),
        Event(
            name="Night Skiing",
            description="Skiing sessions held at night with special events like torchlight parades, fireworks, and themed evenings."
        ),
        Event(
            name="Winter Festivals",
            description="Festivals with winter-themed activities like ice carving, snow sculpting, dog sledding, and more."
        ),
        Event(
            name="Ski and Snowboard Clinics",
            description="Instructional clinics and workshops for skiers and snowboarders, including lessons from professional instructors."
        ),
        Event(
            name="Race Series",
            description="A series of ski and snowboard races, including giant slalom, slalom, and downhill races."
        ),
        Event(
            name="Demo Days",
            description="Events where equipment manufacturers showcase their latest ski and snowboard gear for testing."
        ),
        Event(
            name="Holiday Events",
            description="Special events and activities for holidays like Christmas, New Year's, Valentine's Day, and Easter."
        ),
        Event(
            name="Torchlight Parades",
            description="Evening parades with skiers and snowboarders carrying lit torches, often followed by fireworks displays."
        ),
        Event(
            name="Snowshoeing and Cross-Country Events",
            description="Events including snowshoe races, cross-country ski races, and guided tours for non-downhill activities."
        ),
        Event(
            name="Film Screenings",
            description="Screenings of skiing and snowboarding movies or documentaries in lodges or outdoor venues."
        ),
        Event(
            name="Family and Kids' Activities",
            description="Family-friendly activities like snow tubing, sledding, ice skating, and storytelling sessions."
        ),
        Event(
            name="Mountain Tours",
            description="Guided mountain tours and wildlife observation outings to appreciate the natural beauty of the surroundings."
        ),
        Event(
            name="Charity Events",
            description="Fundraising events to support local causes, including charity ski races and auctions."
        ),
    ]
    
    for event in events:
        db.session.add(event)
    db.session.commit()

def create_resorts():
    resorts = [
        Resort(name="Vail", city="Vail", state="Colorado", description="A premier ski destination in the Rocky Mountains."),
        Resort(name="Aspen Snowmass", city="Aspen", state="Colorado", description="Famous for its upscale ski resorts and vibrant cultural scene."),
        Resort(name="Park City Mountain Resort", city="Park City", state="Utah", description="Largest ski resort in the US with diverse terrain."),
        Resort(name="Breckenridge Ski Resort", city="Breckenridge", state="Colorado", description="Popular ski resort known for its alpine activities."),
        Resort(name="Mammoth Mountain", city="Mammoth Lakes", state="California", description="A large ski resort in the Eastern Sierra, known for its long ski season."),
        Resort(name="Jackson Hole Mountain Resort", city="Teton Village", state="Wyoming", description="Renowned for its challenging terrain and beautiful landscapes."),
        Resort(name="Big Sky Resort", city="Big Sky", state="Montana", description="One of the largest ski resorts in North America, known for its big skiing."),
        Resort(name="Stowe Mountain Resort", city="Stowe", state="Vermont", description="A premier East Coast destination with a charming village and diverse trails."),
        Resort(name="Sun Valley Resort", city="Sun Valley", state="Idaho", description="America's first destination ski resort with a rich history."),
        Resort(name="Telluride Ski Resort", city="Telluride", state="Colorado", description="Offers a unique combination of skiing and cultural experience."),
        Resort(name="Heavenly Mountain Resort", city="South Lake Tahoe", state="California", description="A major ski resort known for its breathtaking views of Lake Tahoe."),
        Resort(name="Deer Valley Resort", city="Park City", state="Utah", description="An upscale ski resort known for its amenities and ski-only policy."),
        Resort(name="Beaver Creek Resort", city="Beaver Creek", state="Colorado", description="A luxury ski resort known for its family-friendly atmosphere and world-class service."),
        Resort(name="Squaw Valley Alpine Meadows", city="Olympic Valley", state="California", description="A large ski resort with diverse terrain, known for hosting the 1960 Winter Olympics."),
        Resort(name="Keystone Resort", city="Keystone", state="Colorado", description="A popular resort offering extensive terrain, night skiing, and family activities."),
        Resort(name="Steamboat Ski Resort", city="Steamboat Springs", state="Colorado", description="Famous for its 'Champagne Powder' snow and Western heritage."),
        Resort(name="Whiteface Mountain", city="Wilmington", state="New York", description="Known for its vertical drop and hosting the 1980 Winter Olympics."),
        Resort(name="Mount Bachelor", city="Bend", state="Oregon", description="One of the largest ski resorts in the Pacific Northwest, known for its dry snow."),
        Resort(name="Taos Ski Valley", city="Taos", state="New Mexico", description="A unique ski resort with a blend of Native American and Spanish cultures."),
        Resort(name="Snowbird", city="Snowbird", state="Utah", description="Famous for its long seasons and challenging terrain, attracting advanced skiers."),
        Resort(name="Killington Ski Resort", city="Killington", state="Vermont", description="Known as the 'Beast of the East,' it's the largest ski area in the Eastern United States."),
        Resort(name="Copper Mountain", city="Frisco", state="Colorado", description="A favorite among locals with diverse terrain and a laid-back atmosphere."),
        Resort(name="Northstar California Resort", city="Truckee", state="California", description="A family-friendly resort known for its excellent grooming and upscale accommodations."),
        Resort(name="Crystal Mountain", city="Enumclaw", state="Washington", description="The largest ski resort in Washington State, offering spectacular views of Mt. Rainier."),
        Resort(name="Sugarloaf", city="Carrabassett Valley", state="Maine", description="One of the top ski destinations in New England, known for its challenging terrain."),
        Resort(name="Snowmass", city="Snowmass Village", state="Colorado", description="Part of the Aspen/Snowmass complex, it offers a wide variety of terrain."),
        Resort(name="Alta Ski Area", city="Alta", state="Utah", description="Famous for its powder skiing and its 'skiers only' policy."),
        Resort(name="Grand Targhee Resort", city="Alta", state="Wyoming", description="Known for its deep powder and spectacular Teton mountain views."),
        Resort(name="Mount Hood Meadows", city="Mount Hood", state="Oregon", description="Offers some of the most spectacular skiing and snowboarding in the Northwest."),
        Resort(name="Palisades Tahoe", city="Olympic Valley", state="California", description="Known for its challenging terrain and hosting the 1960 Winter Olympics."),
        Resort(name="Loon Mountain", city="Lincoln", state="New Hampshire", description="Popular for its accessible terrain and family-friendly atmosphere."),
        Resort(name="Stratton Mountain", city="Stratton", state="Vermont", description="Offers a blend of upscale amenities and varied terrain."),
        Resort(name="Sunday River", city="Newry", state="Maine", description="Known for its reliable snowfall and extensive network of trails."),
        Resort(name="Sugarbush Resort", city="Warren", state="Vermont", description="Features diverse terrain across two mountains and a charming base village."),
        Resort(name="Smugglers' Notch Resort", city="Jeffersonville", state="Vermont", description="Famous for its family-friendly activities and excellent ski school."),
        Resort(name="Winter Park Resort", city="Winter Park", state="Colorado", description="Colorado's longest continually operated ski resort, known for its varied terrain."),
        Resort(name="Mount Sunapee", city="Newbury", state="New Hampshire", description="A family-friendly resort known for its excellent grooming and comfortable atmosphere."),
        Resort(name="Okemo Mountain Resort", city="Ludlow", state="Vermont", description="Offers a wide range of terrain and a well-regarded ski school."),
        Resort(name="Waterville Valley Resort", city="Waterville Valley", state="New Hampshire", description="A self-contained resort offering a variety of activities and skiing options."),
        Resort(name="Arapahoe Basin", city="Keystone", state="Colorado", description="Known for its long ski season and challenging terrain.")
    ]

    for resort in resorts:
        db.session.add(resort)
    db.session.commit()

def create_resort_events():
    resorts = Resort.query.all()
    events = Event.query.all()

    for _ in range(100):
        resort_event = ResortEvent(
            resort_id=rc(resorts).id,
            event_id=rc(events).id,
            time=fake.date_time_this_year()  # Assuming 'time' is a datetime field
        )
        db.session.add(resort_event)
    db.session.commit()

def create_reviews():
    users = User.query.all()
    resorts = Resort.query.all()

    for _ in range(10):
        review = Review(
            text=fake.text(),
            rating=randint(3, 5),
            user_id=rc(users).id if users else None,
            resort_id=rc(resorts).id if resorts else None
        )
        db.session.add(review)
    db.session.commit()

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
        db.session.commit()
        
        create_users()
        print('Creating users!')
        
        create_events()
        print('creating events!')
        
        create_resorts()
        print('creating resorts!')
        
        create_resort_events()
        print('creating resort events!')
        
        create_reviews()
        print('creating reviews!')
        
        print('done seeding!')