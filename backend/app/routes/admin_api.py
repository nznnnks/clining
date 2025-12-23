from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, login_required, current_user
from app import db
from app.models import (
    Order, CleaningType, AdditionalService, CalculatorSettings,
    PortfolioItem, Promotion, User
)
from datetime import datetime
import json

bp = Blueprint('admin_api', __name__)


def check_admin():
    """Проверка прав администратора"""
    if not current_user.is_authenticated or not current_user.is_admin:
        return jsonify({
            'success': False,
            'error': 'Требуется авторизация администратора'
        }), 401
    return None


# ========== AUTH API ==========

@bp.route('/login', methods=['POST'])
def login():
    """API для входа в админку"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'Отсутствуют данные в запросе'
            }), 400
            
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({
                'success': False,
                'error': 'Заполните все поля'
            }), 400
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password) and user.is_admin:
            login_user(user)
            return jsonify({
                'success': True,
                'message': 'Успешный вход',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Неверное имя пользователя или пароль'
            }), 401
    except Exception as e:
        import traceback
        print(f"Login error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/logout', methods=['POST'])
@login_required
def logout():
    """API для выхода из админки"""
    try:
        logout_user()
        return jsonify({
            'success': True,
            'message': 'Вы вышли из системы'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/check', methods=['GET'])
@login_required
def check():
    """Проверка текущей авторизации"""
    try:
        if current_user.is_authenticated and current_user.is_admin:
            return jsonify({
                'success': True,
                'authenticated': True,
                'user': {
                    'id': current_user.id,
                    'username': current_user.username,
                    'email': current_user.email
                }
            }), 200
        else:
            return jsonify({
                'success': False,
                'authenticated': False,
                'error': 'Требуется авторизация администратора'
            }), 401
    except Exception as e:
        return jsonify({
            'success': False,
            'authenticated': False,
            'error': str(e)
        }), 500


# ========== ORDERS API ==========

@bp.route('/orders', methods=['GET'])
@login_required
def get_orders():
    """Получить все заказы"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        orders = Order.query.order_by(Order.created_at.desc()).all()
        return jsonify({
            'success': True,
            'data': [order.to_dict() for order in orders],
            'count': len(orders)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/orders/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    """Получить конкретный заказ"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        order = Order.query.get_or_404(order_id)
        return jsonify({
            'success': True,
            'data': order.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/orders/<int:order_id>', methods=['PUT'])
@login_required
def update_order(order_id):
    """Обновить заказ"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        order = Order.query.get_or_404(order_id)
        data = request.get_json()
        
        if 'status' in data:
            order.status = data['status']
        if 'name' in data:
            order.name = data['name']
        if 'phone' in data:
            order.phone = data['phone']
        if 'comment' in data:
            order.comment = data['comment']
        if 'area' in data:
            order.area = data['area']
        if 'additional_services' in data:
            order.additional_services = json.dumps(data['additional_services']) if data['additional_services'] else None
        
        order.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Заказ обновлен успешно',
            'data': order.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/orders/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    """Удалить заказ"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        order = Order.query.get_or_404(order_id)
        db.session.delete(order)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Заказ удален успешно'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ========== CALCULATOR API ==========

# Cleaning Types
@bp.route('/calculator/cleaning-types', methods=['GET'])
@login_required
def get_cleaning_types_admin():
    """Получить все типы уборки (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        cleaning_types = CleaningType.query.order_by(CleaningType.order).all()
        return jsonify({
            'success': True,
            'data': [ct.to_dict() for ct in cleaning_types]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/cleaning-types/<string:type_id>', methods=['GET'])
@login_required
def get_cleaning_type_admin(type_id):
    """Получить конкретный тип уборки"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        cleaning_type = CleaningType.query.get_or_404(type_id)
        return jsonify({
            'success': True,
            'data': cleaning_type.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/calculator/cleaning-types', methods=['POST'])
@login_required
def create_cleaning_type():
    """Создать новый тип уборки"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        data = request.get_json()
        
        if not data.get('id') or not data.get('label') or not data.get('price'):
            return jsonify({
                'success': False,
                'error': 'Поля id, label и price обязательны'
            }), 400
        
        cleaning_type = CleaningType(
            id=data['id'],
            label=data['label'],
            price=data['price'],
            order=data.get('order', 0),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(cleaning_type)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Тип уборки создан успешно',
            'data': cleaning_type.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/cleaning-types/<string:type_id>', methods=['PUT'])
@login_required
def update_cleaning_type(type_id):
    """Обновить тип уборки"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        cleaning_type = CleaningType.query.get_or_404(type_id)
        data = request.get_json()
        
        if 'label' in data:
            cleaning_type.label = data['label']
        if 'price' in data:
            cleaning_type.price = data['price']
        if 'order' in data:
            cleaning_type.order = data['order']
        if 'is_active' in data:
            cleaning_type.is_active = data['is_active']
        
        cleaning_type.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Тип уборки обновлен успешно',
            'data': cleaning_type.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/cleaning-types/<string:type_id>', methods=['DELETE'])
@login_required
def delete_cleaning_type(type_id):
    """Удалить тип уборки"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        cleaning_type = CleaningType.query.get_or_404(type_id)
        db.session.delete(cleaning_type)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Тип уборки удален успешно'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Additional Services
@bp.route('/calculator/additional-services', methods=['GET'])
@login_required
def get_additional_services_admin():
    """Получить все дополнительные услуги (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        services = AdditionalService.query.order_by(AdditionalService.order).all()
        return jsonify({
            'success': True,
            'data': [s.to_dict() for s in services]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/additional-services/<string:service_id>', methods=['GET'])
@login_required
def get_additional_service_admin(service_id):
    """Получить конкретную дополнительную услугу"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        service = AdditionalService.query.get_or_404(service_id)
        return jsonify({
            'success': True,
            'data': service.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/calculator/additional-services', methods=['POST'])
@login_required
def create_additional_service():
    """Создать новую дополнительную услугу"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        data = request.get_json()
        
        if not data.get('id') or not data.get('label') or not data.get('price') or not data.get('unit'):
            return jsonify({
                'success': False,
                'error': 'Поля id, label, price и unit обязательны'
            }), 400
        
        service = AdditionalService(
            id=data['id'],
            label=data['label'],
            price=data['price'],
            unit=data['unit'],
            order=data.get('order', 0),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(service)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Дополнительная услуга создана успешно',
            'data': service.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/additional-services/<string:service_id>', methods=['PUT'])
@login_required
def update_additional_service(service_id):
    """Обновить дополнительную услугу"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        service = AdditionalService.query.get_or_404(service_id)
        data = request.get_json()
        
        if 'label' in data:
            service.label = data['label']
        if 'price' in data:
            service.price = data['price']
        if 'unit' in data:
            service.unit = data['unit']
        if 'order' in data:
            service.order = data['order']
        if 'is_active' in data:
            service.is_active = data['is_active']
        
        service.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Дополнительная услуга обновлена успешно',
            'data': service.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/additional-services/<string:service_id>', methods=['DELETE'])
@login_required
def delete_additional_service(service_id):
    """Удалить дополнительную услугу"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        service = AdditionalService.query.get_or_404(service_id)
        db.session.delete(service)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Дополнительная услуга удалена успешно'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Calculator Settings
@bp.route('/calculator/settings', methods=['GET'])
@login_required
def get_calculator_settings():
    """Получить все настройки калькулятора"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        settings = CalculatorSettings.query.all()
        return jsonify({
            'success': True,
            'data': [s.to_dict() for s in settings]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/settings/<string:key>', methods=['GET'])
@login_required
def get_calculator_setting(key):
    """Получить конкретную настройку"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        setting = CalculatorSettings.query.filter_by(key=key).first_or_404()
        return jsonify({
            'success': True,
            'data': setting.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/calculator/settings', methods=['POST'])
@login_required
def create_calculator_setting():
    """Создать новую настройку калькулятора"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        data = request.get_json()
        
        if not data.get('key') or not data.get('value'):
            return jsonify({
                'success': False,
                'error': 'Поля key и value обязательны'
            }), 400
        
        setting = CalculatorSettings(
            key=data['key'],
            value=data['value'],
            description=data.get('description', '')
        )
        
        db.session.add(setting)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Настройка создана успешно',
            'data': setting.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/calculator/settings/<string:key>', methods=['PUT'])
@login_required
def update_calculator_setting(key):
    """Обновить настройку калькулятора"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        setting = CalculatorSettings.query.filter_by(key=key).first_or_404()
        data = request.get_json()
        
        if 'value' in data:
            setting.value = data['value']
        if 'description' in data:
            setting.description = data['description']
        
        setting.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Настройка обновлена успешно',
            'data': setting.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ========== PORTFOLIO API ==========

@bp.route('/portfolio', methods=['GET'])
@login_required
def get_portfolio_items_admin():
    """Получить все проекты портфолио (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
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


@bp.route('/portfolio/<int:item_id>', methods=['GET'])
@login_required
def get_portfolio_item_admin(item_id):
    """Получить конкретный проект портфолио (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
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


@bp.route('/portfolio', methods=['POST'])
@login_required
def create_portfolio_item_admin():
    """Создать новый проект портфолио (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        data = request.get_json()
        
        if not data.get('title'):
            return jsonify({
                'success': False,
                'error': 'Поле title обязательно'
            }), 400
        
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
            'message': 'Проект портфолио создан успешно',
            'data': item.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/portfolio/<int:item_id>', methods=['PUT'])
@login_required
def update_portfolio_item_admin(item_id):
    """Обновить проект портфолио (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        item = PortfolioItem.query.get_or_404(item_id)
        data = request.get_json()
        
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
            'message': 'Проект портфолио обновлен успешно',
            'data': item.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/portfolio/<int:item_id>', methods=['DELETE'])
@login_required
def delete_portfolio_item_admin(item_id):
    """Удалить проект портфолио (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        item = PortfolioItem.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Проект портфолио удален успешно'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ========== PROMOTIONS API ==========

@bp.route('/promotions', methods=['GET'])
@login_required
def get_promotions_admin():
    """Получить все акции (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
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


@bp.route('/promotions/<int:promo_id>', methods=['GET'])
@login_required
def get_promotion_admin(promo_id):
    """Получить конкретную акцию (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
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


@bp.route('/promotions', methods=['POST'])
@login_required
def create_promotion_admin():
    """Создать новую акцию (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        data = request.get_json()
        
        if not data.get('title'):
            return jsonify({
                'success': False,
                'error': 'Поле title обязательно'
            }), 400
        
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
            'message': 'Акция создана успешно',
            'data': promotion.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/promotions/<int:promo_id>', methods=['PUT'])
@login_required
def update_promotion_admin(promo_id):
    """Обновить акцию (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        data = request.get_json()
        
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
            'message': 'Акция обновлена успешно',
            'data': promotion.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/promotions/<int:promo_id>', methods=['DELETE'])
@login_required
def delete_promotion_admin(promo_id):
    """Удалить акцию (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        db.session.delete(promotion)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Акция удалена успешно'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/promotions/<int:promo_id>/toggle', methods=['POST'])
@login_required
def toggle_promotion_admin(promo_id):
    """Переключить статус активности акции (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        promotion = Promotion.query.get_or_404(promo_id)
        promotion.is_active = not promotion.is_active
        promotion.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Акция {"активирована" if promotion.is_active else "деактивирована"}',
            'data': promotion.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ========== USERS API ==========

@bp.route('/users', methods=['GET'])
@login_required
def get_users():
    """Получить всех пользователей (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        users = User.query.order_by(User.created_at.desc()).all()
        return jsonify({
            'success': True,
            'data': [user.to_dict() for user in users],
            'count': len(users)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/users/<int:user_id>', methods=['GET'])
@login_required
def get_user(user_id):
    """Получить конкретного пользователя (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        user = User.query.get_or_404(user_id)
        return jsonify({
            'success': True,
            'data': user.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@bp.route('/users', methods=['POST'])
@login_required
def create_user():
    """Создать нового пользователя (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        data = request.get_json()
        
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': 'Поля username, email и password обязательны'
            }), 400
        
        # Проверяем уникальность username
        if User.query.filter_by(username=data['username']).first():
            return jsonify({
                'success': False,
                'error': 'Пользователь с таким именем уже существует'
            }), 400
        
        # Проверяем уникальность email
        if User.query.filter_by(email=data['email']).first():
            return jsonify({
                'success': False,
                'error': 'Пользователь с таким email уже существует'
            }), 400
        
        user = User(
            username=data['username'],
            email=data['email'],
            is_admin=data.get('is_admin', False)
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Пользователь создан успешно',
            'data': user.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/users/<int:user_id>', methods=['PUT'])
@login_required
def update_user(user_id):
    """Обновить пользователя (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        # Защита от снятия прав у самого себя
        if user.id == current_user.id and 'is_admin' in data and not data['is_admin']:
            return jsonify({
                'success': False,
                'error': 'Нельзя снять права администратора у самого себя'
            }), 400
        
        if 'username' in data:
            # Проверяем уникальность username
            existing_user = User.query.filter_by(username=data['username']).first()
            if existing_user and existing_user.id != user_id:
                return jsonify({
                    'success': False,
                    'error': 'Пользователь с таким именем уже существует'
                }), 400
            user.username = data['username']
        
        if 'email' in data:
            # Проверяем уникальность email
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user and existing_user.id != user_id:
                return jsonify({
                    'success': False,
                    'error': 'Пользователь с таким email уже существует'
                }), 400
            user.email = data['email']
        
        if 'password' in data and data['password']:
            user.set_password(data['password'])
        
        if 'is_admin' in data:
            # Защита от снятия прав у самого себя
            if user.id == current_user.id and not data['is_admin']:
                return jsonify({
                    'success': False,
                    'error': 'Нельзя снять права администратора у самого себя'
                }), 400
            user.is_admin = data['is_admin']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Пользователь обновлен успешно',
            'data': user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/users/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    """Удалить пользователя (админ)"""
    error_response = check_admin()
    if error_response:
        return error_response
    
    try:
        user = User.query.get_or_404(user_id)
        
        # Защита от удаления самого себя
        if user.id == current_user.id:
            return jsonify({
                'success': False,
                'error': 'Нельзя удалить самого себя'
            }), 400
        
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Пользователь удален успешно'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

