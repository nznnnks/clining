from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()


def create_app(config_class=Config):
    """Factory функция для создания Flask приложения"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # Регистрация основных маршрутов
    from app.routes import bp as main_bp
    app.register_blueprint(main_bp)
    
    # Регистрация маршрутов для портфолио
    from app.routes.portfolio import bp as portfolio_bp
    app.register_blueprint(portfolio_bp, url_prefix='/api/portfolio')
    
    # Регистрация маршрутов для акций
    from app.routes.promotions import bp as promotions_bp
    app.register_blueprint(promotions_bp, url_prefix='/api/promotions')
    
    return app

