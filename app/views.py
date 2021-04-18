"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app, db
from flask import render_template, request, redirect, jsonify,url_for, flash, session, send_from_directory
from app.models import CarsModel, Favourites, Users
from werkzeug.utils import secure_filename

###
# Routing for your application.
###

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return app.send_static_file('index.html')


@app.route('/api/users/<user_id>',methods=['GET'])
def get_user(user_id):
    user = db.session.query(Users).filter(Users.id==user_id).first()
    print('User',user)
    user_details = {
        "id": user.id,
        "username": user.username,
        "name": user.name,
        "photo": user.photo,
        "email": user.email,
        "location": user.location,
        "biography": user.biography,
        "date_joined": user.date_joined
    }
    return jsonify(user_details), 200

@app.route('/api/users/<user_id>/favourites',methods=['GET'])
def get_favourites(user_id):
    favourites = db.session.query(CarsModel).join(Favourites).filter(Favourites.user_id==user_id).all()
    fav_cars = []
    for fav_car in favourites:
        car = {
            "id": fav_car.id,
            "description": fav_car.description,
            "year": fav_car.year,
            "make": fav_car.make,
            "model": fav_car.model,
            "colour": fav_car.colour,
            "transmission": fav_car.transmission,
            "car_type": fav_car.car_type,
            "price": fav_car.price,
            "photo": fav_car.photo,
            "user_id": fav_car.user_id
        }
        fav_cars.append(car)
    return jsonify(fav_cars), 200

# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404

