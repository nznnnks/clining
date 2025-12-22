from app import create_app, db
from config import Config

app = create_app(Config)

from app.models import PortfolioItem, Promotion, User

def init_db():
    """Создает все таблицы в базе данных"""
    with app.app_context():
        try:
            # Убеждаемся, что папка instance существует
            import os
            instance_dir = app.config.get('INSTANCE_DIR', os.path.join(os.path.dirname(__file__), 'instance'))
            os.makedirs(instance_dir, exist_ok=True)
            
            # Проверяем права доступа к папке
            test_file = os.path.join(instance_dir, 'test_write.tmp')
            try:
                with open(test_file, 'w') as f:
                    f.write('test')
                os.remove(test_file)
                print("✅ Права доступа к папке instance: OK")
            except Exception as e:
                print(f"⚠️  Предупреждение: не удалось записать в папку instance: {e}")
            
            print(f"📍 URI БД: {app.config['SQLALCHEMY_DATABASE_URI']}")
            print(f"📍 Папка instance: {instance_dir}")
            
            # Исправляем URI на абсолютный путь для Windows
            import os
            db_file = os.path.join(instance_dir, 'cleaning.db')
            absolute_path = os.path.abspath(db_file)
            db_uri = absolute_path.replace('\\', '/')
            correct_uri = f'sqlite:///{db_uri}'
            print(f"📍 Исправленный URI БД: {correct_uri}")
            
            # Создаем таблицы напрямую через SQLAlchemy с правильным URI
            # Это обходной путь для проблемы с относительными путями в Windows
            from sqlalchemy import create_engine
            engine = create_engine(correct_uri)
            
            # Импортируем модели, чтобы они зарегистрировались в metadata
            from app.models import PortfolioItem, Promotion, User, CleaningType, AdditionalService, CalculatorSettings
            
            # Создаем все таблицы
            db.Model.metadata.create_all(engine)
            print("✅ Таблицы в базе данных успешно созданы!")
            print("\n📊 Созданные таблицы:")
            print("   - users (пользователи/администраторы)")
            print("   - portfolio_items (проекты портфолио)")
            print("   - promotions (комплексные предложения/акции)")
            print("   - cleaning_types (типы уборки)")
            print("   - additional_services (дополнительные услуги)")
            print("   - calculator_settings (настройки калькулятора)")
        except Exception as e:
            print(f"❌ Ошибка при создании таблиц: {e}")
            import traceback
            traceback.print_exc()
            raise

if __name__ == '__main__':
    init_db()

