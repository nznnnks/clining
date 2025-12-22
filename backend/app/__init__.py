from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from config import Config

db = SQLAlchemy()
login_manager = LoginManager()


def create_app(config_class=Config):
    """Factory функция для создания Flask приложения"""
    import os
    template_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates')
    app = Flask(__name__, template_folder=template_dir)
    
    # Сначала формируем правильный URI БД с абсолютным путем для Windows
    # Это нужно сделать ДО загрузки конфигурации и инициализации db
    if not os.environ.get('DATABASE_URL'):
        base_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        instance_dir = os.path.join(base_dir, 'instance')
        os.makedirs(instance_dir, exist_ok=True)
        db_file = os.path.join(instance_dir, 'cleaning.db')
        absolute_path = os.path.abspath(db_file)
        db_uri_fixed = absolute_path.replace('\\', '/')
        correct_uri = f'sqlite:///{db_uri_fixed}'
        # Устанавливаем правильный URI в config_class ПЕРЕД загрузкой конфигурации
        config_class.SQLALCHEMY_DATABASE_URI = correct_uri
    
    app.config.from_object(config_class)
    
    # Дополнительная проверка: если URI все еще относительный, исправляем
    if not os.environ.get('DATABASE_URL'):
        current_uri = app.config.get('SQLALCHEMY_DATABASE_URI', '')
        if current_uri.startswith('sqlite:///') and ':/' not in current_uri[10:]:
            # URI относительный, исправляем
            base_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
            instance_dir = os.path.join(base_dir, 'instance')
            db_file = os.path.join(instance_dir, 'cleaning.db')
            absolute_path = os.path.abspath(db_file)
            db_uri_fixed = absolute_path.replace('\\', '/')
            correct_uri = f'sqlite:///{db_uri_fixed}'
            app.config['SQLALCHEMY_DATABASE_URI'] = correct_uri
    
    db.init_app(app)
    
    # После инициализации db проверяем и исправляем engine, если нужно
    if not os.environ.get('DATABASE_URL'):
        with app.app_context():
            current_uri = app.config.get('SQLALCHEMY_DATABASE_URI', '')
            if current_uri.startswith('sqlite:///') and ':/' not in current_uri[10:]:
                # URI все еще относительный, переинициализируем engine
                base_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
                instance_dir = os.path.join(base_dir, 'instance')
                db_file = os.path.join(instance_dir, 'cleaning.db')
                absolute_path = os.path.abspath(db_file)
                db_uri_fixed = absolute_path.replace('\\', '/')
                correct_uri = f'sqlite:///{db_uri_fixed}'
                app.config['SQLALCHEMY_DATABASE_URI'] = correct_uri
                # Переинициализируем db с правильным URI
                from sqlalchemy import create_engine
                new_engine = create_engine(correct_uri)
                # Обновляем engine в Flask-SQLAlchemy
                db.get_engine = lambda bind=None: new_engine
    login_manager.init_app(app)
    
    # Настройка Flask-Login
    login_manager.login_view = 'admin_auth.login'
    login_manager.login_message = 'Пожалуйста, войдите для доступа к админке'
    login_manager.login_message_category = 'info'
    
    @login_manager.user_loader
    def load_user(user_id):
        from app.models import User
        return User.query.get(int(user_id))
    
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
    
    # Регистрация маршрутов для калькулятора
    from app.routes.calculator import bp as calculator_bp
    app.register_blueprint(calculator_bp, url_prefix='/api/calculator')
    
    # Регистрация маршрутов для админки
    from app.routes.admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/admin')
    
    # Регистрация Flask-Admin
    from app.admin import init_admin
    init_admin(app)
    
    return app

