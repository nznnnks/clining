# Инициализация пакета routes
from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)


@bp.route('/api/health', methods=['GET'])
def health_check():
    """Проверка работоспособности API"""
    return jsonify({
        'status': 'ok',
        'message': 'API is running',
        'version': '1.0.0'
    }), 200


@bp.route('/api/test', methods=['GET'])
def test():
    """Тестовый endpoint"""
    return jsonify({
        'message': 'Backend is working!',
        'data': {
            'test': True
        }
    }), 200

