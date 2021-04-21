"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
from app import app, db
from flask import render_template, request, redirect, jsonify, url_for, flash, session, send_from_directory
from app.models import CarsModel, FavoritesModel, UsersModel as Users
from werkzeug.utils import *

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


""" Javian Anderson Code Begins """

@app.route('/api/search',methods=['GET'])
def search():
    #CREATE FORM TO SEARCH BY MAKE OR MODEL
    # searchform = SearchForm()
    results = []
    if request.method=="GET":
        # results = []
        # cars=CarsModel.query.filter(CarsModel.make.like('%' + searchform.search.data + "%"))
        cars = db.session.query(CarsModel).filter(CarsModel.make.like('%' + searchform.search.data + "%"))
        # spec_cars=CarsModel.query.filter(CarsModel.model.like('%' + searchform.search.data + "%"))
        spec_car = db.session.query(CarsModel).filter(CarsModel.model.like('%' + searchform.search.data + "%"))

        if cars is not None and spec_cars is None:
            for car in cars:
                car_dets= {
                    "id": car.id,
                    "description": car.description,
                    "make": car.make,
                    "model": car.model,
                    "colour": car.colour,
                    "year": car.year,
                    "transmission": car.transmission,
                    "car_type": car.car_type,
                    "price": car.price,
                    "photo": car.photo,
                    "user_id": car.user_id
                }
                results.append(car_dets)
            return jsonify(results)
            # return render_template('search.html',form=searchform, results=results)
        
        elif (cars is None and spec_cars is not None):
            for car in spec_cars:
                car_dets= {
                    "id": car.id,
                    "description": car.description,
                    "make": car.make,
                    "model": car.model,
                    "colour": car.colour,
                    "year": car.year,
                    "transmission": car.transmission,
                    "car_type": car.car_type,
                    "price": car.price,
                    "photo": car.photo,
                    "user_id": car.user_id
                }
                results.append(car_dets)
            
            return jsonify(results)
            # return render_template('search.hmtl',form=searchform, results=results)
        
    # return render_template('search.html', form=searchform,  results=results)

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

