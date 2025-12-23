from app import db
from datetime import datetime
import json
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    """Модель пользователя для админки"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        """Хеширует пароль"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Проверяет пароль"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<User {self.username}>'


class PortfolioItem(db.Model):
    """Модель для проектов портфолио"""
    __tablename__ = 'portfolio_items'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50)) 
    area = db.Column(db.String(50))
    time = db.Column(db.String(50))
    price = db.Column(db.String(50))
    images = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'area': self.area,
            'time': self.time,
            'price': self.price,
            'images': json.loads(self.images) if self.images else [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<PortfolioItem {self.id}: {self.title}>'


class Promotion(db.Model):
    """Модель для комплексных предложений (акций)"""
    __tablename__ = 'promotions'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    valid_until = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'valid_until': self.valid_until,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Promotion {self.id}: {self.title}>'


class CleaningType(db.Model):
    """Модель для типов уборки в калькуляторе"""
    __tablename__ = 'cleaning_types'
    
    id = db.Column(db.String(50), primary_key=True)  # maintenance, general, after-renovation
    label = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)  # Цена за м²
    order = db.Column(db.Integer, default=0)  # Порядок отображения
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'id': self.id,
            'label': self.label,
            'price': self.price,
            'order': self.order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<CleaningType {self.id}: {self.label}>'


class AdditionalService(db.Model):
    """Модель для дополнительных услуг в калькуляторе"""
    __tablename__ = 'additional_services'
    
    id = db.Column(db.String(50), primary_key=True) 
    label = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(50), nullable=False)
    order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'id': self.id,
            'label': self.label,
            'price': self.price,
            'unit': self.unit,
            'order': self.order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<AdditionalService {self.id}: {self.label}>'


class CalculatorSettings(db.Model):
    """Модель для настроек калькулятора"""
    __tablename__ = 'calculator_settings'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(50), unique=True, nullable=False)  # min_price, etc.
    value = db.Column(db.String(200), nullable=False)  # Значение настройки
    description = db.Column(db.String(200))  # Описание настройки
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'key': self.key,
            'value': self.value,
            'description': self.description
        }
    
    def __repr__(self):
        return f'<CalculatorSettings {self.key}: {self.value}>'


class Order(db.Model):
    """Модель для заказов из калькулятора"""
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))  # Имя клиента
    phone = db.Column(db.String(50), nullable=False)  # Телефон (обязательное поле)
    comment = db.Column(db.Text)  # Комментарий к заказу
    area = db.Column(db.Integer, nullable=False)  # Площадь помещения в м²
    cleaning_type_id = db.Column(db.String(50), nullable=False)  # ID типа уборки
    cleaning_type_label = db.Column(db.String(200))  # Название типа уборки (для истории)
    additional_services = db.Column(db.Text)  # JSON строка с дополнительными услугами
    base_price = db.Column(db.Integer, nullable=False)  # Базовая цена (до применения минимума)
    adjusted_base_price = db.Column(db.Integer, nullable=False)  # Скорректированная базовая цена (с учетом минимума)
    additional_price = db.Column(db.Integer, default=0)  # Цена дополнительных услуг
    final_price = db.Column(db.Integer, nullable=False)  # Итоговая цена
    status = db.Column(db.String(50), default='new')  # Статус заказа: new, in_progress, completed, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Преобразует объект в словарь для API"""
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'comment': self.comment,
            'area': self.area,
            'cleaning_type_id': self.cleaning_type_id,
            'cleaning_type_label': self.cleaning_type_label,
            'additional_services': json.loads(self.additional_services) if self.additional_services else {},
            'base_price': self.base_price,
            'adjusted_base_price': self.adjusted_base_price,
            'additional_price': self.additional_price,
            'final_price': self.final_price,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Order {self.id}: {self.phone} - {self.final_price} ₽>'