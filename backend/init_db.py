from app import create_app, db
from config import Config

app = create_app(Config)

from app.models import PortfolioItem, Promotion

def init_db():
    """Создает все таблицы в базе данных"""
    with app.app_context():
        db.create_all()
        print("Таблицы в базе данных успешно созданы!")
        print(f"Путь к БД: {app.config['SQLALCHEMY_DATABASE_URI']}")
        print("\nСозданные таблицы:")
        print("   - portfolio_items (проекты портфолио)")
        print("   - promotions (комплексные предложения/акции)")

if __name__ == '__main__':
    init_db()

