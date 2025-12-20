from flask import Blueprint, jsonify, request
from app import db
from app.models import PortfolioItem
from datetime import datetime
import json

bp = Blueprint('portfolio', __name__)


@bp.route('/', methods=['GET'])
def get_portfolio_items():
    """Получить все проекты портфолио"""
    try:
        category = request.args.get('category')
        
        query = PortfolioItem.query
        
        if category:
            query = query.filter_by(category=category)
        
        items = query.order_by(PortfolioItem.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'data': [item.to_dict() for item in items],
            'count': len(items)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:item_id>', methods=['GET'])
def get_portfolio_item(item_id):
    """Получить конкретный проект портфолио"""
    try:
        item = PortfolioItem.query.get_or_404(item_id)
        return jsonify({
            'success': True,
            'data': item.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/', methods=['POST'])
def create_portfolio_item():
    """Создать новый проект портфолио"""
    try:
        data = request.get_json()
        
        # Валидация
        if not data.get('title'):
            return jsonify({
                'success': False,
                'error': 'Title is required'
            }), 400
        
        # Создание
        item = PortfolioItem(
            title=data.get('title'),
            description=data.get('description'),
            category=data.get('category'),
            area=data.get('area'),
            time=data.get('time'),
            price=data.get('price'),
            images=json.dumps(data.get('images', [])) if data.get('images') else None
        )
        
        db.session.add(item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Portfolio item created successfully',
            'data': item.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:item_id>', methods=['PUT'])
def update_portfolio_item(item_id):
    """Обновить проект портфолио"""
    try:
        item = PortfolioItem.query.get_or_404(item_id)
        data = request.get_json()
        
        # Обновление полей
        if 'title' in data:
            item.title = data['title']
        if 'description' in data:
            item.description = data['description']
        if 'category' in data:
            item.category = data['category']
        if 'area' in data:
            item.area = data['area']
        if 'time' in data:
            item.time = data['time']
        if 'price' in data:
            item.price = data['price']
        if 'images' in data:
            item.images = json.dumps(data['images']) if data['images'] else None
        
        item.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Portfolio item updated successfully',
            'data': item.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/<int:item_id>', methods=['DELETE'])
def delete_portfolio_item(item_id):
    """Удалить проект портфолио"""
    try:
        item = PortfolioItem.query.get_or_404(item_id)
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Portfolio item deleted successfully'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

