"""
Скрипт для создания администратора
Использование:
    python create_admin.py <username> <email> <password>
    
Пример:
    python create_admin.py admin admin@uborka24.ru admin123
"""
from app import create_app, db
from app.models import User
from config import Config
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = create_app(Config)


def create_admin(username, email, password):
    """Создать администратора"""
    with app.app_context():
        import os
        instance_dir = app.config.get('INSTANCE_DIR', os.path.join(os.path.dirname(__file__), 'instance'))
        db_file = os.path.join(instance_dir, 'cleaning.db')
        absolute_path = os.path.abspath(db_file)
        db_uri = absolute_path.replace('\\', '/')
        correct_uri = f'sqlite:///{db_uri}'
        

        engine = create_engine(correct_uri)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        try:
            # Проверяем, существует ли уже такой пользователь
            existing_user = session.query(User).filter_by(username=username).first()
            if existing_user:
                print(f"Пользователь '{username}' уже существует!")
                return False
            
            # Проверяем email
            existing_email = session.query(User).filter_by(email=email).first()
            if existing_email:
                print(f"Email '{email}' уже используется!")
                return False
            
            # Создаем нового админа
            admin = User(
                username=username,
                email=email,
                is_admin=True
            )
            admin.set_password(password)
            
            session.add(admin)
            session.commit()
            
            print(f"    Администратор '{username}' успешно создан!")
            print(f"   Email: {email}")
            print(f"   Права: Администратор")
            return True
        except Exception as e:
            session.rollback()
            print(f"Ошибка при создании администратора: {e}")
            return False
        finally:
            session.close()


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Использование: python create_admin.py <username> <email> <password>")
        print("Пример: python create_admin.py admin admin@uborka24.ru admin123")
        sys.exit(1)
    
    username = sys.argv[1]
    email = sys.argv[2]
    password = sys.argv[3]
    
    create_admin(username, email, password)

