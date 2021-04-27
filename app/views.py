"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
import sys
from app import app, db
from flask import render_template, request, redirect, jsonify, url_for, flash, session, send_from_directory
from app.models import CarsModel, Favourites, Users
from werkzeug.utils import secure_filename
from .forms import RegisterForm, AddForm, SearchForm
# from flask_login import current_user, login_user, logout_user

###
# Routing for your application.
###

@app.route('/api/register',methods=['POST'])
def register():
    form= RegisterForm()
    if request.method=='POST' and form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        fullname = form.fullname.data
        email = form.email.data
        location = form.location.data
        biography = form.biography.data  
        photo = form.photo.data

        filename=secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        data = Users(username, password, fullname, location, email, biography, filename)

        db.session.add(data)
        db.session.commit()

        register={
            "status": 200,
            "message": fullname + " ,Registered Successfully",
            "username": username
        }
        return jsonify(register=register)
    #  return jsonify(errorMsg(form))


def errorMSg(form):
    errorMessages = []
   
    for field, errors in form.errors.items():
        for error in errors:
            message = u"You have an error in %s field, %s" % (
                    getattr(form, field).label.text,
                    error
                )
            errorMessages.append(message)

    return errorMessages

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    # return app.send_static_file('index.html')
    return render_template('index.html')


@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = db.session.query(Users).filter(Users.id == user_id).first()
    print('User', user)
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


@app.route('/api/users/<user_id>/favourites', methods=['GET'])
def get_favourites(user_id):
    favourites = db.session.query(CarsModel).join(
        Favourites).filter(Favourites.user_id == user_id).all()
    fav_cars = []
    for fav_car in favourites:
        car = {
            "id": fav_car.id,
            "description": fav_car.description,
            "year": fav_car.year,
            "make": fav_car.make,
            "model": fav_car.model,
            "colour": fav_car.colorr,
            "transmission": fav_car.transmission,
            "car_type": fav_car.car_type,
            "price": fav_car.price,
            "photo": fav_car.photo,
            "user_id": fav_car.user_id
        }
        fav_cars.append(car)
    return jsonify(fav_cars), 200

# -------------------------------------------------------------------------------
# JONES' SECTION - START
# -------------------------------------------------------------------------------


@app.route('/api/cars/<car_id>', methods=['GET'])
def get_car(car_id):
    """
        Get Details of a specific car.
    """

    # Convert to integer - just in case
    car_id = int(car_id)

    # Retrieve Car from the Database
    requested_car = db.session.query(CarsModel).filter_by(id=car_id).first()
    # OR - either should work
    # requested_car = db.session.query(CarsModel).get(car_id)

    # Check to see if the Car was found
    if (requested_car == None):

        # If Car not found, flash user then redirect
        flash('Car not found!', category='error')
        return redirect(url_for('cars'))

    # Create new car object
    car = {
        "id": requested_car.id,
        "description": requested_car.description,
        "year": requested_car.year,
        "make": requested_car.make,
        "model": requested_car.model,
        "colour": requested_car.colour,
        "transmission": requested_car.transmission,
        "car_type": requested_car.car_type,
        "price": requested_car.price,
        "photo": requested_car.photo,
        "user_id": requested_car.user_id
    }

    return jsonify(car), 200
    # render_template('car_id.html', car=requested_car)


@app.route('/api/cars/<car_id>/favourite', methods=['POST'])
# @login_required
def favourite_car(car_id):
    """
        Add car to Favourites for logged in user.
    """

    # Gets the User's ID to make a Fasvourite's object
    # current_user_id = current_user.id
    current_user_id = 1

    # Make Favourite's object
    favourite = Favourites(car_id, current_user_id)
    favourite_obj = {
        "car_id": car_id,
        "user_id": 2,
        "favourite": "YES"
    }

    # Add to database
    db.session.add(favourite)
    db.session.commit()

    flash('Added to Favourite!', category='success')
    return jsonify(favourite_obj), 200
    # return redirect(url_for('cars', car_id=car_id))


# This is needed to retrieve the images from the uploads folder
@app.route('/uploads/<filename>')
def get_image(filename):
    rootdir = os.getcwd()
    return send_from_directory(os.path.join(rootdir, app.config['UPLOAD_FOLDER']), filename)

# user_loader callback. This callback is used to reload the user object from
# the user ID stored in the session
# @login_manager.user_loader
# def load_user(id):
#     return Users.query.get(int(id))

# -------------------------------------------------------------------------------
# JONES' SECTION - END
# -------------------------------------------------------------------------------

@app.route('/api/cars', methods=['POST'])
#@login_required
def addvehicle(car_id):
    form = AddForm()
    token = request.headers['Authorization'].split()[1]
    #current_id = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['asdfghjkl'])['id']
    if request.method == 'POST' and form.validate_on_submit():
        make= form.make.data
        model= form.model.data
        colour=form.colour.data
        year=form.year.data
        price=form.price.data
        car_type=form.car_type.data
        transmission=form.transmission.data
        description=form.description.data
        photo = form.photo.data
        filename = photo.filename
        photo.save(os.path.join(
            app.config['UPLOAD_FOLDER'], filename
        ))
          
        # addcar = Addcars(car_id, filename, caption)
        addcar = CarsModel(description, make, model, colour, year, transmission, car_type, price, photo, 1)

        db.session.add(addcar)
        db.session.commit()
        return jsonify({'message': 'Car sucessfully added!'}),200


""" Javian Anderson Code Begins """

@app.route('/api/search',methods=['GET'])
def search():
    #CREATE FORM TO SEARCH BY MAKE OR MODEL
    # searchform = SearchForm()
    # results = []
    if request.method=="GET":
        results = []

        # Make Param
        make = request.args.get('make',default="Boyz")
        # Model Param
        model = request.args.get('model',default="Camry")

        # Make Query
        cars = db.session.query(CarsModel).filter(make==make).all()
        print(type(cars))

        # Model Query
        spec_cars = db.session.query(CarsModel).filter(model==model).all()

        #Both Query
        spec_cars1 = db.session.query(CarsModel).filter(model==model, make==make).all()

        if cars is not None and spec_cars is None:
            for car in cars:
                fcar = {
                    "id": car.id,
                    "description": car.description,
                    "year": car.year,
                    "make": car.make,
                    "model": car.model,
                    "colour": car.color,
                    "transmission": car.transmission,
                    "car_type": car.car_type,
                    "price": car.price,
                    "photo": car.photo,
                    "user_id": car.user_id
                }
                results.append(fcar)
            print(jsonify(results))
            
        
        elif (cars is None and spec_cars is not None):
            for car in spec_cars:
                fcar = {
                    "id": car.id,
                    "description": car.description,
                    "year": car.year,
                    "make": car.make,
                    "model": car.model,
                    "colour": car.color,
                    "transmission": car.transmission,
                    "car_type": car.car_type,
                    "price": car.price,
                    "photo": car.photo,
                    "user_id": car.user_id
                }
                results.append(fcar)
            print(jsonify(results))
        
        elif cars is not None and spec_cars is not None:
            for car in spec_cars1:
                fcar = {
                    "id": car.id,
                    "description": car.description,
                    "year": car.year,
                    "make": car.make,
                    "model": car.model,
                    "colour": car.color,
                    "transmission": car.transmission,
                    "car_type": car.car_type,
                    "price": car.price,
                    "photo": car.photo,
                    "user_id": car.user_id
                }
                results.append(fcar)
            return jsonify(results)

""" Javian Anderson Code ENDS """

###
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
