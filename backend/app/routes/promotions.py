from flask import Blueprint, jsonify, request
from app import db
from app.models import Promotion
from datetime import datetime

bp = Blueprint('promotions', __name__)


@bp.route('/', methods=['GET'], strict_slashes=False)
def get_promotions():
    """Получить все акции"""
    try:
        active_only = request.args.get('active_only', 'false').lower() == 'true'
        
        query = Promotion.query
        
        if active_only:
            query = query.filter_by(is_active=True)
        
        promotions = query.order_by(Promotion.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'data': [promo.to_dict() for promo in promotions],
            'count': len(promotions)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:promo_id>', methods=['GET'])
def get_promotion(promo_id):
    """Получить конкретную акцию"""
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        return jsonify({
            'success': True,
            'data': promotion.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/', methods=['POST'])
def create_promotion():
    """Создать новую акцию"""
    try:
        data = request.get_json()
        
        # Валидация
        if not data.get('title'):
            return jsonify({
                'success': False,
                'error': 'Title is required'
            }), 400
        
        # Создание
        promotion = Promotion(
            title=data.get('title'),
            description=data.get('description'),
            valid_until=data.get('valid_until'),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(promotion)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Promotion created successfully',
            'data': promotion.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:promo_id>', methods=['PUT'])
def update_promotion(promo_id):
    """Обновить акцию"""
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        data = request.get_json()
        
        # Обновление полей
        if 'title' in data:
            promotion.title = data['title']
        if 'description' in data:
            promotion.description = data['description']
        if 'valid_until' in data:
            promotion.valid_until = data['valid_until']
        if 'is_active' in data:
            promotion.is_active = data['is_active']
        
        promotion.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Promotion updated successfully',
            'data': promotion.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:promo_id>', methods=['DELETE'])
def delete_promotion(promo_id):
    """Удалить акцию"""
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        
        db.session.delete(promotion)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Promotion deleted successfully'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:promo_id>/toggle', methods=['POST'])
def toggle_promotion(promo_id):
    """Переключить статус активности акции"""
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        
        promotion.is_active = not promotion.is_active
        promotion.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Promotion {"activated" if promotion.is_active else "deactivated"}',
            'data': promotion.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

