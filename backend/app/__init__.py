from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()


def create_app(config_class=Config):
    """функция для создания Flask приложения"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    from app.routes import bp as main_bp
    app.register_blueprint(main_bp)
    
    return app

