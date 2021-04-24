from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileAllowed, FileField, FileRequired

class AddForm(FlaskForm):
    make = StringField('make', validators=[DataRequired()])
    model= StringField('model')
    colour= StringField('colour')
    year = StringField('year', validators=[DataRequired(), year()])
    price = StringField('price', validators=[DataRequired()])
    car_type = SelectField('Type of Car', choices=[("SUV","SUV"),("Sedan","Sedan"),("Hatchback","Hatchback"),("Minivan","Minivan")])
    transmission = SelectField('Transmissions', choices=[("Automatic","Automatic"),("Manual","Manual")])
    description = TextAreaField('description', validators=[DataRequired()])
    photo = FileField('Profile Photo', validators=[FileRequired(), FileAllowed(["jpg","png"],"Images only!")
