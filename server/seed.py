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
        Resort(name="Vail", city="Vail", state="Colorado", description="A premier ski destination in the Rocky Mountains.", resort_map="https://cdn.ski/kjz4WkNNw14lPVVt.jpeg"),
        Resort(name="Aspen Snowmass", city="Aspen", state="Colorado", description="Famous for its upscale ski resorts and vibrant cultural scene.", resort_map="https://dns1.pistepro.com/eyJidWNrZXQiOiJwaXN0ZXByby5jb20iLCJrZXkiOiJtYXBzL2ltZy8yMDE5IFNub3dtYXNzIFdlYnNpdGUgTWFwLndlYnAiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjkzMSwiaGVpZ2h0Ijo2NDIsImZpdCI6ImNvdmVyIn19fQ=="),
        Resort(name="Park City Mountain Resort", city="Park City", state="Utah", description="Largest ski resort in the US with diverse terrain.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Breckenridge Ski Resort", city="Breckenridge", state="Colorado", description="Popular ski resort known for its alpine activities.", resort_map="https://scene7.vailresorts.com/is/image/vailresorts/20231031_BR_winter-trail_map_001-1?resMode=sharp2&wid=412&fit=constrain,1&dpr=on,2.625"),
        Resort(name="Mammoth Mountain", city="Mammoth Lakes", state="California", description="A large ski resort in the Eastern Sierra, known for its long ski season.", resort_map="https://dns1.pistepro.com/eyJidWNrZXQiOiJwaXN0ZXByby5jb20iLCJrZXkiOiJtYXBzL2ltZy9NYW1tb3RoX2Zyb250c2lkZS53ZWJwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjAwLCJoZWlnaHQiOjYzMCwiZml0IjoiY292ZXIifX19"),
        Resort(name="Jackson Hole Mountain Resort", city="Teton Village", state="Wyoming", description="Renowned for its challenging terrain and beautiful landscapes.", resort_map="https://www.datocms-assets.com/50871/1700605089-jacksonhole-winter-mountain-map-2023-24.jpg?fit=crop&w=2500"),
        Resort(name="Big Sky Resort", city="Big Sky", state="Montana", description="One of the largest ski resorts in North America, known for its big skiing.", resort_map="https://bigskyresort.com/assets/Images/Orphaned%20Images/Maps.jpg"),
        Resort(name="Stowe Mountain Resort", city="Stowe", state="Vermont", description="A premier East Coast destination with a charming village and diverse trails.", resort_map="https://files.skimap.org/l6i4srczd49yexey92zjvmc89z72"),
        Resort(name="Sun Valley Resort", city="Sun Valley", state="Idaho", description="America's first destination ski resort with a rich history.", resort_map="https://s3.onthesnow.com/images/trailmaps/idaho/sun-valley/20221031182225/xlarge.jpg"),
        Resort(name="Telluride Ski Resort", city="Telluride", state="Colorado", description="Offers a unique combination of skiing and cultural experience.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Heavenly Mountain Resort", city="South Lake Tahoe", state="California", description="A major ski resort known for its breathtaking views of Lake Tahoe.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Deer Valley Resort", city="Park City", state="Utah", description="An upscale ski resort known for its amenities and ski-only policy.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Beaver Creek Resort", city="Beaver Creek", state="Colorado", description="A luxury ski resort known for its family-friendly atmosphere and world-class service.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Squaw Valley Alpine Meadows", city="Olympic Valley", state="California", description="A large ski resort with diverse terrain, known for hosting the 1960 Winter Olympics.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Keystone Resort", city="Keystone", state="Colorado", description="A popular resort offering extensive terrain, night skiing, and family activities.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Steamboat Ski Resort", city="Steamboat Springs", state="Colorado", description="Famous for its 'Champagne Powder' snow and Western heritage.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Whiteface Mountain", city="Wilmington", state="New York", description="Known for its vertical drop and hosting the 1980 Winter Olympics.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Mount Bachelor", city="Bend", state="Oregon", description="One of the largest ski resorts in the Pacific Northwest, known for its dry snow.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Taos Ski Valley", city="Taos", state="New Mexico", description="A unique ski resort with a blend of Native American and Spanish cultures.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Snowbird", city="Snowbird", state="Utah", description="Famous for its long seasons and challenging terrain, attracting advanced skiers.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Killington Ski Resort", city="Killington", state="Vermont", description="Known as the 'Beast of the East,' it's the largest ski area in the Eastern United States.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Copper Mountain", city="Frisco", state="Colorado", description="A favorite among locals with diverse terrain and a laid-back atmosphere.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Northstar California Resort", city="Truckee", state="California", description="A family-friendly resort known for its excellent grooming and upscale accommodations.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Crystal Mountain", city="Enumclaw", state="Washington", description="The largest ski resort in Washington State, offering spectacular views of Mt. Rainier.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Sugarloaf", city="Carrabassett Valley", state="Maine", description="One of the top ski destinations in New England, known for its challenging terrain.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Snowmass", city="Snowmass Village", state="Colorado", description="Part of the Aspen/Snowmass complex, it offers a wide variety of terrain.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Alta Ski Area", city="Alta", state="Utah", description="Famous for its powder skiing and its 'skiers only' policy.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Grand Targhee Resort", city="Alta", state="Wyoming", description="Known for its deep powder and spectacular Teton mountain views.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Mount Hood Meadows", city="Mount Hood", state="Oregon", description="Offers some of the most spectacular skiing and snowboarding in the Northwest.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Palisades Tahoe", city="Olympic Valley", state="California", description="Known for its challenging terrain and hosting the 1960 Winter Olympics.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Loon Mountain", city="Lincoln", state="New Hampshire", description="Popular for its accessible terrain and family-friendly atmosphere.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Stratton Mountain", city="Stratton", state="Vermont", description="Offers a blend of upscale amenities and varied terrain.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Sunday River", city="Newry", state="Maine", description="Known for its reliable snowfall and extensive network of trails.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Sugarbush Resort", city="Warren", state="Vermont", description="Features diverse terrain across two mountains and a charming base village.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Smugglers' Notch Resort", city="Jeffersonville", state="Vermont", description="Famous for its family-friendly activities and excellent ski school.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Winter Park Resort", city="Winter Park", state="Colorado", description="Colorado's longest continually operated ski resort, known for its varied terrain.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Mount Sunapee", city="Newbury", state="New Hampshire", description="A family-friendly resort known for its excellent grooming and comfortable atmosphere.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Okemo Mountain Resort", city="Ludlow", state="Vermont", description="Offers a wide range of terrain and a well-regarded ski school.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Waterville Valley Resort", city="Waterville Valley", state="New Hampshire", description="A self-contained resort offering a variety of activities and skiing options.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my"),
        Resort(name="Arapahoe Basin", city="Keystone", state="Colorado", description="Known for its long ski season and challenging terrain.", resort_map="https://files.skimap.org/7suygsqrjehjm4jocwt8bhm289my")
    ]

    for resort in resorts:
        db.session.add(resort)
    db.session.commit()

def create_resort_events():
    resorts = Resort.query.all()
    events = Event.query.all()

    for _ in range(300):
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

    for resort in resorts:
        for _ in range(randint(5, 10)):  # Each resort gets 5 to 10 reviews
            review = Review(
                text=fake.paragraph(nb_sentences=5),  # More realistic review text
                rating=randint(1, 5),  # Rating from 1 to 5
                user_id=rc(users).id,
                resort_id=resort.id  # Assign the current resort's ID
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