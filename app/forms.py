from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, TextField, FileField, SelectField
from wtforms.validators import InputRequired, DataRequired,Required
from flask_wtf.csrf import CSRFProtect
from app import app
from flask_wtf.file import FileField, FileRequired, FileAllowed

class RegisterForm(FlaskForm):
    csrf = CSRFProtect(app)
    username = TextField('Username',validators=[DataRequired()])   
    password = PasswordField('Password',validators=[DataRequired()])   
    fullname = TextField('Fullname',validators=[DataRequired()])   
    email = TextField('Email',validators=[DataRequired()])   
    location = TextField('Location',validators=[DataRequired()])   
    biography =TextAreaField('Biography',validators=[DataRequired()])   
    photo = FileField('Photo',validators=[FileRequired(), FileAllowed(['jpg','png'])])

# Abby Form
class AddForm(FlaskForm):
    make = StringField('make', validators=[DataRequired()])
    model= StringField('model', validators=[DataRequired()])
    colour= StringField('colour', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    price = StringField('price', validators=[DataRequired()])
    car_type = SelectField('Type of Car', choices=[("SUV","SUV"),("Sedan","Sedan"),("Hatchback","Hatchback"),("Minivan","Minivan")])
    transmission = SelectField('Transmissions', choices=[("Automatic","Automatic"),("Manual","Manual")])
    description = TextAreaField('description', validators=[DataRequired()])
    photo = FileField('Profile Photo', validators=[FileRequired(), FileAllowed(["jpg","png"],"Images only!")])

class SearchForm(FlaskForm):
    make = StringField('Make', validators=[DataRequired()])
    model  = StringField('Model', validators=[DataRequired()])