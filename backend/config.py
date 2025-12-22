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
    
    # Создаем папку instance если её нет
    os.makedirs(INSTANCE_DIR, exist_ok=True)
    
    if os.environ.get('DATABASE_URL'):
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    else:
        # Формируем абсолютный путь напрямую
        db_file = os.path.join(INSTANCE_DIR, "cleaning.db")
        absolute_path = os.path.abspath(db_file)
        # Преобразуем обратные слеши в прямые для Windows
        db_uri = absolute_path.replace('\\', '/')
        # Используем 3 слеша для абсолютного пути в Windows
        SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_uri}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

