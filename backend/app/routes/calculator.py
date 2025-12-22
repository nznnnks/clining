from flask import Blueprint, jsonify, request
from app import db
from app.models import CleaningType, AdditionalService, CalculatorSettings, Order
from datetime import datetime
import json

bp = Blueprint('calculator', __name__)


@bp.route('/prices', methods=['GET'])
def get_calculator_prices():
    """Получить все цены для калькулятора"""
    try:
        # Получаем типы уборки (только активные)
        cleaning_types = CleaningType.query.filter_by(is_active=True).order_by(CleaningType.order).all()
        
        # Получаем дополнительные услуги (только активные)
        additional_services = AdditionalService.query.filter_by(is_active=True).order_by(AdditionalService.order).all()
        
        # Получаем минимальную цену
        min_price_setting = CalculatorSettings.query.filter_by(key='min_price').first()
        min_price = int(min_price_setting.value) if min_price_setting else 4000
        
        return jsonify({
            'success': True,
            'data': {
                'cleaningTypes': [ct.to_dict() for ct in cleaning_types],
                'additionalServices': [asv.to_dict() for asv in additional_services],
                'minPrice': min_price
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/order', methods=['POST'])
def create_order():
    """Создать новый заказ из калькулятора"""
    try:
        data = request.get_json()
        
        # Валидация обязательных полей
        if not data.get('phone'):
            return jsonify({
                'success': False,
                'error': 'Телефон обязателен для заполнения'
            }), 400
        
        if not data.get('area') or not isinstance(data.get('area'), int) or data.get('area') < 10:
            return jsonify({
                'success': False,
                'error': 'Площадь должна быть не менее 10 м²'
            }), 400
        
        if not data.get('cleaningType'):
            return jsonify({
                'success': False,
                'error': 'Тип уборки обязателен'
            }), 400
        
        # Получаем информацию о типе уборки
        cleaning_type = CleaningType.query.filter_by(id=data.get('cleaningType')).first()
        if not cleaning_type:
            return jsonify({
                'success': False,
                'error': 'Тип уборки не найден'
            }), 400
        
        # Создаем заказ
        order = Order(
            name=data.get('name', ''),
            phone=data.get('phone'),
            comment=data.get('comment', ''),
            area=data.get('area'),
            cleaning_type_id=data.get('cleaningType'),
            cleaning_type_label=cleaning_type.label,
            additional_services=json.dumps(data.get('additionalServices', {}), ensure_ascii=False),
            base_price=data.get('basePrice', 0),
            adjusted_base_price=data.get('adjustedBasePrice', 0),
            additional_price=data.get('additionalPrice', 0),
            final_price=data.get('finalPrice', 0),
            status='new'
        )
        
        db.session.add(order)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Заказ успешно создан',
            'data': order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': f'Ошибка при создании заказа: {str(e)}'
        }), 500

