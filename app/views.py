"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app
from flask import render_template, request, redirect, url_for, flash, jsonify
from app.models import CarsModel, FavoritesModel, Users
from .forms import RegisterForm
from werkzeug.utils import secure_filename

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
        
        data = Users(username, password, fullname, email, location, biography, filename)

        db.session.add(data)
        db.session.commit()

        register={
            "message": fullname + " ,Registered Successfully",
            "username": username
        }
        return jsonify(register=register), 200
    return jsonify(errorMsg(form))


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
    return app.send_static_file('index.html')


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

