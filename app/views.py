"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
from app import app, db
from flask import render_template, request, redirect, url_for, flash
from app.models import CarsModel, FavoritesModel, UsersModel
from flask.helpers import send_from_directory

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

    return render_template('car_id.html', car=requested_car)


@app.route('/api/cars/<car_id>/favourite', methods=['POST'])
@login_required
def favourite_car(car_id):
    """
        Add car to Favourites for logged in user.
    """

    return 0


# This is needed to retrieve the images from the uploads folder
@app.route('/uploads/<filename>')
def get_image(filename):
    rootdir = os.getcwd()
    return send_from_directory(os.path.join(rootdir, app.config['UPLOAD_FOLDER']), filename)

# -------------------------------------------------------------------------------
# JONES' SECTION - END
# -------------------------------------------------------------------------------


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
