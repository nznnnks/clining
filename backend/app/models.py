from app import db
from datetime import datetime
import json


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

