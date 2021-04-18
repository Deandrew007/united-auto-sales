"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app
from flask import render_template, request, redirect, url_for, flash
from app.models import CarsModel, FavoritesModel, UsersModel

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


@app.route('/api/search',methods=['GET'])
def search():
    #CREATE FORM TO SEARCH BY MAKE OR MODEL
    # searchform = SearchForm()
    if request.method=="GET":
        cars=CarsModel.query.filter(CarsModel.make.like('%' + searchform.search.data + "%"))
        spec_cars=CarsModel.query.filter(CarsModel.model.like('%' + searchform.search.data + "%"))

        if cars!=False:
            return render_template('search.html',form=searchform, results=cars)
        
        elif cars==False and spec_cars!=False:
            return render_template('search.hmtl',form=searchform, results=spec_cars)
        
    return render_template('search.html', form=searchform)



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

