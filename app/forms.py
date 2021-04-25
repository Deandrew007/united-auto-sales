  
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Required
from wtforms import validators, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired 

class SearchForm(FlaskForm):
    make = StringField('Make', [validators.Required("(Required)")])
    model  = StringField('Model', [validators.Required("(Required)")])