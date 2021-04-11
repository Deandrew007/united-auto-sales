from . import db
from datetime import datetime
from werkzeug.security import generate_password_hash

class CarsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    description = db.Column(db.String(255))
    make = db.Column(db.String(160))
    model = db.Column(db.String(160))
    color = db.Column(db.String(160))
    year = db.Column(db.String(160))
    transmission = db.Column(db.String(160))
    car_type = db.Column(db.String(160))
    price = db.Column(db.Float, nullable=False)
    photo = db.Column(db.String(160))
    user_id = db.Column(db.Integer)



    def __init__(self, description, make, model, color, year, transmission, car_type, price, photo, user_id):
        self.description = description
        self.make = make
        self.model = model
        self.color = color
        self.year = year
        self.transmission = transmission
        self.car_type = car_type
        self.price = price
        self.photo = photo
        self.user_id = user_id

    def __repr__(self):
        return '<CarsModel %r>' % (self.id)

class FavoritesModel(db.Model):
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    car_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)

    def __init__(self, car_id, user_id):
        self.car_id = car_id
        self.user_id = user_id
    
    def __repr__(self):
        return '<FavoritesModel %r>' % (self.id)

class UsersModel(db.Model):
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    username = db.Column(db.String(255), unique = True)
    password = db.Column(db.String(255))
    name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    email = db.Column(db.String(255), unique = True)
    biography = db.Column(db.String(255))
    photo = db.Column(db.String(255))
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, username, password, name, location, email, biography, photo):
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.name = name
        self.location = location
        self.email = email
        self.biography = biography
        self.photo = photo

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<UsersModel %r>' % (self.id)



