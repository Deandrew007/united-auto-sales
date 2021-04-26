from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config.from_object(Config)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

db = SQLAlchemy(app)

# Flask-Login login manager
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'

from app import views
