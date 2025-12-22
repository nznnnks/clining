"""Скрипт для инициализации данных калькулятора из исходных данных"""
from app import create_app, db
from config import Config
from app.models import CleaningType, AdditionalService, CalculatorSettings

app = create_app(Config)

def init_calculator_data():
    """Инициализирует данные калькулятора из исходных значений"""
    with app.app_context():
        try:
            # Данные типов уборки
            cleaning_types_data = [
                {'id': 'maintenance', 'label': 'Поддерживающая', 'price': 70, 'order': 1},
                {'id': 'general', 'label': 'Генеральная', 'price': 130, 'order': 2},
                {'id': 'after-renovation', 'label': 'После ремонта', 'price': 150, 'order': 3}
            ]
            
            # Данные дополнительных услуг
            additional_services_data = [
                {'id': 'oven', 'label': 'Мытье духовки внутри', 'price': 800, 'unit': 'шт.', 'order': 1},
                {'id': 'microwave', 'label': 'Мытье СВЧ внутри', 'price': 400, 'unit': 'шт.', 'order': 2},
                {'id': 'fridge', 'label': 'Мытье холодильника внутри', 'price': 800, 'unit': 'шт.', 'order': 3},
                {'id': 'windows', 'label': 'Мойка окон', 'price': 400, 'unit': 'створка', 'order': 4},
                {'id': 'chandelier', 'label': 'Мытье хрустальной люстры', 'price': 1500, 'unit': 'шт.', 'order': 5},
                {'id': 'hood', 'label': 'Мытье вытяжки', 'price': 400, 'unit': 'шт.', 'order': 6},
                {'id': 'washing-machine', 'label': 'Мытье стиральной машины внутри', 'price': 550, 'unit': 'шт.', 'order': 7},
                {'id': 'ironing', 'label': 'Глажка', 'price': 1000, 'unit': '60 мин', 'order': 8},
                {'id': 'bed-linen', 'label': 'Смена постельного белья', 'price': 500, 'unit': 'комплект', 'order': 9},
                {'id': 'balcony', 'label': 'Уборка на балконе', 'price': 600, 'unit': 'м²', 'order': 10}
            ]
            
            # Добавляем типы уборки
            print("Добавление типов уборки...")
            for ct_data in cleaning_types_data:
                existing = CleaningType.query.filter_by(id=ct_data['id']).first()
                if existing:
                    # Обновляем существующий
                    existing.label = ct_data['label']
                    existing.price = ct_data['price']
                    existing.order = ct_data['order']
                    existing.is_active = True
                    print(f"   ✓ Обновлен: {ct_data['label']}")
                else:
                    # Создаем новый
                    ct = CleaningType(**ct_data)
                    db.session.add(ct)
                    print(f"   ✓ Создан: {ct_data['label']}")
            
            # Добавляем дополнительные услуги
            print("\nДобавление дополнительных услуг...")
            for as_data in additional_services_data:
                existing = AdditionalService.query.filter_by(id=as_data['id']).first()
                if existing:
                    # Обновляем существующий
                    existing.label = as_data['label']
                    existing.price = as_data['price']
                    existing.unit = as_data['unit']
                    existing.order = as_data['order']
                    existing.is_active = True
                    print(f"   ✓ Обновлена: {as_data['label']}")
                else:
                    # Создаем новый
                    asv = AdditionalService(**as_data)
                    db.session.add(asv)
                    print(f"   ✓ Создана: {as_data['label']}")
            
            # Добавляем настройки калькулятора
            print("\nДобавление настроек калькулятора...")
            min_price_setting = CalculatorSettings.query.filter_by(key='min_price').first()
            if min_price_setting:
                min_price_setting.value = '4000'
                min_price_setting.description = 'Минимальная цена заказа (₽)'
                print("   ✓ Обновлена настройка: min_price = 4000")
            else:
                min_price_setting = CalculatorSettings(
                    key='min_price',
                    value='4000',
                    description='Минимальная цена заказа (₽)'
                )
                db.session.add(min_price_setting)
                print("   ✓ Создана настройка: min_price = 4000")
            
            db.session.commit()
            print("\nДанные калькулятора успешно инициализированы!")
            
        except Exception as e:
            db.session.rollback()
            print(f"Ошибка при инициализации данных: {e}")
            import traceback
            traceback.print_exc()
            raise

if __name__ == '__main__':
    init_calculator_data()

