import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Базовая конфигурация Flask приложения"""
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'workworkworkworkworkworkworkworkwork'
    
    # режим отладки на время разработки надо
    DEBUG = os.environ.get('FLASK_DEBUG', 'False') == 'True'
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')
    
    # для подключения реакта
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
    
    # БД на sqlite
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')
    
    # URI для SQLite базы данных
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        f'sqlite:///{os.path.join(INSTANCE_DIR, "cleaning.db")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

