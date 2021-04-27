import os
from app import app, db, login_manager
from flask import render_template, request, redirect, jsonify, url_for, _request_ctx_stack,\
                flash, session, send_from_directory, make_response, g
from app.models import CarsModel, Favourites, Users
from werkzeug.utils import secure_filename
from .forms import RegisterForm, AddForm, LoginForm
from flask_login import current_user, login_user, logout_user, login_required
from flask_login import LoginManager
# Using JWT
import jwt
import datetime
from sqlalchemy.exc import IntegrityError

###
# Routing for your application.
###
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    # return app.send_static_file('index.html')
    return render_template('index.html')


@app.route('/api/auth/login', methods=['POST'])
def login():
    print('User', current_user)
    if current_user.is_authenticated:
        return jsonify({'message':'already logged in'}), 200

    form = LoginForm()
    print("data",form.data)
    try:
        if form.validate_on_submit():
            user = Users.query.filter_by(username=form.username.data).first()
            if user is None or not user.check_password(form.password.data):
                return jsonify({"status": 401, "data": "Username not or Password incorrect"}),401
            
            remember_me  = False
            if 'remember_me' in request.form:
                remember_me = True
            # get user id, load into session
            login_user(user, remember=remember_me)

            payload = {
                'id': user.id, 
                'username': user.username,
                'iat': datetime.datetime.now(datetime.timezone.utc),
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=23)
            }

            token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify({"message": 'Login Successful', 'token':token}), 200
    except Exception as e:
        print(e)
        return jsonify({"status": 401, "data": "Form not completed properly"}), 401
        
    return jsonify({"status": 401, "data": "Form not completed properly"}), 401
 

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
        try:
            new_user = Users(username, password, fullname, location, email, biography, filename)

            db.session.add(new_user)
            db.session.commit()

            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            user = db.session.query(Users).filter(Users.username == username).first()
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
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'error': 'Username or email already address already exists'}), 401
        return jsonify(user_details), 201
    return jsonify(errorMsg(form)), 401


@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    print("logout")
    return jsonify({'message' : 'logout successful'}), 200


@app.route('/api/users/<user_id>', methods=['GET'])
@login_required
def get_user(user_id):
    user = db.session.query(Users).filter(Users.id == user_id).first()
    # print('User', user)
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
    # print('User', user_details)
    return jsonify(user_details), 200


@app.route('/api/users/<user_id>/favourites', methods=['GET'])
@login_required
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
            "colour": fav_car.colour,
            "transmission": fav_car.transmission,
            "car_type": fav_car.car_type,
            "price": fav_car.price,
            "photo": fav_car.photo,
            "user_id": fav_car.user_id
        }
        fav_cars.append(car)
    return jsonify(fav_cars), 200


@app.route('/api/cars', methods=['POST'])
@login_required
def addvehicle():
    form = AddForm()
    print ("form",form.make.data,form.model.data,form.colour.data,form.year.data,\
       form.price.data,form.car_type.data,form.transmission.data,form.photo.data,form.description.data)
    #token = request.headers['Authorization'].split()[1]
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
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(
            app.config['UPLOAD_FOLDER'], filename
        ))
          
        # addcar = Addcars(car_id, filename, caption)
        addcar = CarsModel(description, make, model, colour, year, transmission, car_type, price, filename, current_user.get_id())

        db.session.add(addcar)
        db.session.commit()
        return jsonify({'message': 'Car sucessfully added!'}),200
    return jsonify({'message': 'Car was not succesfully added'}),404


@app.route('/api/cars/<car_id>', methods=['GET'])
@login_required
def get_car(car_id):
    """
        Get Details of a specific car.
    """

    # Convert to integer - just in case
    car_id = int(car_id)

    # Retrieves a Car from the Database with the matching Car ID
    requested_car = db.session.query(CarsModel).filter_by(id=car_id).first()
    # OR - (either should work) | requested_car = db.session.query(CarsModel).get(car_id)

    # Check to see if the Car was found
    if (requested_car == None):

        error_message = {
            "message": "Access token is missing or invalid"
        }

        # If Car not found, send 401 & error message
        return jsonify(error_message), 401

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

    # Gets the User's ID to make a Fasvourite's object
    # current_user_id = current_user.id
    current_user_id = current_user.get_id() #TODO: Find a way to get the current User ID

    # Retrieves a Favourite from the Database with the matching Car ID
    requested_fav = db.session.query(Favourites).filter_by(car_id=car_id, user_id=current_user_id).first()

    # Check to see if the Favourite was found for that Car and User
    if (requested_fav != None):
        # If found, send 201. It's not an error, but it should identify when a car was favourited
        return jsonify(car), 201

    return jsonify(car), 200


@app.route('/api/cars/<car_id>/favourite', methods=['POST'])
@login_required
def favourite_car(car_id):
    """
        Add car to Favourites for logged in user.
    """

    # Gets the User's ID to make a Fasvourite's object
    # current_user_id = current_user.id
    current_user_id = 2 #TODO: Find a way to get the current User ID

    # Retrieves a Favourite from the Database with the matching Car ID
    requested_fav = db.session.query(Favourites).filter_by(car_id=car_id, user_id=current_user_id).first()

    # Created the Favourite JSON object
    favourite_obj = {
        "message": "Car Successfully Favourited",
        "car_id": car_id
    }

    # Check to see if the Favourite was found
    if (requested_fav != None):
        
        favourite_obj = {
            "message": "Access token is missing or invalid",
            "car_id": car_id
        }

        # If found, delete it from the database
        db.session.delete(requested_fav)
        db.session.commit()

        return jsonify(favourite_obj), 401

    # Make Favourite's object for database...
    favourite = Favourites(car_id, current_user_id)

    # ... then add it to the database
    db.session.add(favourite)
    db.session.commit()

    # flash('Added to Favourite!', category='success')
    return jsonify(favourite_obj), 200


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

# This is needed to retrieve the images from the uploads folder
@app.route('/uploads/<filename>')
def get_image(filename):
    rootdir = os.getcwd()
    return send_from_directory(os.path.join(rootdir, app.config['UPLOAD_FOLDER']), filename)


# user_loader callback. This callback is used to reload the user object from
# the user ID stored jwt
@login_manager.request_loader
def load_user_from_request(request):
    auth = request.headers.get('Authorization', None) # or request.cookies.get('token', None)
    # print( 'Request header', request.headers.get('Authorization'))
    print("Request", request.headers)
    print()
    print()
    print( 'CSRF Token', request.headers.get('X-CSRFToken'))
    if not auth:
      return None

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      return None
    elif len(parts) == 1:
      return None
    elif len(parts) > 2:
      return None

    token = parts[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        user = Users.query.filter_by(id=int(payload['id'])).first()
        if user:
            # print('User in loader', user)
            return user
    except jwt.ExpiredSignatureError:
        return None
    except jwt.DecodeError:
        return None
    return None


def errorMsg(form):
    errorMessages = []
   
    for field, errors in form.errors.items():
        for error in errors:
            message = u"You have an error in %s field, %s" % (
                    getattr(form, field).label.text,
                    error
                )
            errorMessages.append(message)

    return errorMessages


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