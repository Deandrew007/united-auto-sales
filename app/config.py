import os

class Config(object):
    """Base Config Object"""
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'Som3$ec5etK*y'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://rtdlrxuadorarl:1b4339bbc427e08ecc288600ce72a8d7e8bcdf408c4a7f1162dd36d3263b8ebb@ec2-3-234-85-177.compute-1.amazonaws.com:5432/dbbp26gb1faqs7'
    SQLALCHEMY_TRACK_MODIFICATIONS = False # This is just here to suppress a warning from SQLAlchemy as it will soon be removed
    # UPLOAD_FOLDER= './uploads'
    UPLOAD_FOLDER = './app/static/uploads'

class DevelopmentConfig(Config):
    """Development Config that extends the Base Config Object"""
    DEVELOPMENT = True
    DEBUG = True

class ProductionConfig(Config):
    """Production Config that extends the Base Config Object"""
    DEBUG = False