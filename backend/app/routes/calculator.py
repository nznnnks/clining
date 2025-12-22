from flask import Blueprint, jsonify, request
from app import db
from app.models import CleaningType, AdditionalService, CalculatorSettings
from datetime import datetime

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

