from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask import redirect, url_for, flash
from flask_login import current_user
from wtforms import PasswordField, TextAreaField
from wtforms.validators import DataRequired
from app import db
from app.models import User, PortfolioItem, Promotion, CleaningType, AdditionalService, CalculatorSettings
import json


class SecureModelView(ModelView):
    """Базовый класс для защищенных представлений админки"""
    
    def is_accessible(self):
        """Проверка доступа к админке"""
        return current_user.is_authenticated and current_user.is_admin
    
    def inaccessible_callback(self, name, **kwargs):
        """Редирект на страницу входа, если нет доступа"""
        return redirect(url_for('admin_auth.login'))


class UserAdminView(SecureModelView):
    """Представление для управления пользователями"""
    
    column_list = ['id', 'username', 'email', 'is_admin', 'created_at']
    column_searchable_list = ['username', 'email']
    column_filters = ['is_admin', 'created_at']
    column_labels = {
        'id': 'ID',
        'username': 'Имя пользователя',
        'email': 'Email',
        'is_admin': 'Администратор',
        'created_at': 'Дата создания'
    }
    
    form_columns = ['username', 'email', 'is_admin']

    
    def scaffold_form(self):
        """Создаем форму с дополнительным полем пароля"""
        form_class = super().scaffold_form()
        
        form_class.password = PasswordField('Пароль')
        
        return form_class
    
    def create_form(self, obj=None):
        form = super().create_form(obj)
        # При создании пароль обязателен
        if hasattr(form, 'password'):
            form.password.validators = [DataRequired()]
        return form
    
    def edit_form(self, obj=None):
        form = super().edit_form(obj)
        # При редактировании пароль опционален
        if hasattr(form, 'password'):
            form.password.validators = []
            form.password.label.text = 'Пароль (оставьте пустым, чтобы не менять)'
        return form
    
    def on_model_change(self, form, model, is_created):
        """Обработка изменения модели"""
        if is_created:
            if not form.password.data:
                flash('Пароль обязателен при создании пользователя!', 'error')
                return False
            model.set_password(form.password.data)
        elif form.password.data:
            model.set_password(form.password.data)
    
    def delete_model(self, model):
        """Защита от удаления самого себя"""
        if model.id == current_user.id:
            flash('Нельзя удалить самого себя!', 'error')
            return False
        return super().delete_model(model)


class PortfolioAdminView(SecureModelView):
    """Представление для управления портфолио"""
    
    column_list = ['id', 'title', 'category', 'area', 'time', 'price', 'created_at']
    column_searchable_list = ['title', 'description', 'category']
    column_filters = ['category', 'created_at']
    column_labels = {
        'id': 'ID',
        'title': 'Название',
        'description': 'Описание',
        'category': 'Категория',
        'area': 'Площадь',
        'time': 'Время',
        'price': 'Цена',
        'images': 'Изображения',
        'created_at': 'Дата создания',
        'updated_at': 'Дата обновления'
    }
    
    form_columns = ['title', 'description', 'category', 'area', 'time', 'price', 'images']
    
    form_extra_fields = {
        'images': TextAreaField('Изображения (JSON массив) - опционально', description='Введите JSON массив URL изображений, например: ["url1.jpg", "url2.jpg"]')
    }
    
    def on_model_change(self, form, model, is_created):
        """Обработка изменения модели"""
        if form.images.data and form.images.data.strip():
            try:
                images_data = json.loads(form.images.data)
                if isinstance(images_data, list):
                    model.images = json.dumps(images_data, ensure_ascii=False)
                else:
                    flash('Поле "Изображения" должно быть JSON массивом!', 'error')
                    return False
            except json.JSONDecodeError as e:
                flash(f'Неверный формат JSON в поле "Изображения": {str(e)}', 'error')
                return False
        else:
            model.images = None
    
    def edit_form(self, obj=None):
        """Форма редактирования с предзаполнением JSON"""
        form = super().edit_form(obj)
        if obj and obj.images:
            try:
                images_list = json.loads(obj.images)
                form.images.data = json.dumps(images_list, ensure_ascii=False, indent=2)
            except:
                form.images.data = obj.images
        return form


class PromotionAdminView(SecureModelView):
    """Представление для управления акциями/комплексными предложениями"""
    
    column_list = ['id', 'title', 'valid_until', 'is_active', 'created_at']
    column_searchable_list = ['title', 'description']
    column_filters = ['is_active', 'created_at']
    column_labels = {
        'id': 'ID',
        'title': 'Название',
        'description': 'Описание',
        'valid_until': 'Действительно до',
        'is_active': 'Активна',
        'created_at': 'Дата создания',
        'updated_at': 'Дата обновления'
    }
    
    form_columns = ['title', 'description', 'valid_until', 'is_active']


class CleaningTypeAdminView(SecureModelView):
    """Представление для управления типами уборки"""
    
    column_list = ['id', 'label', 'price', 'order', 'is_active', 'updated_at']
    column_searchable_list = ['id', 'label']
    column_filters = ['is_active']
    column_labels = {
        'id': 'ID (код)',
        'label': 'Название',
        'price': 'Цена за м² (₽)',
        'order': 'Порядок',
        'is_active': 'Активен',
        'created_at': 'Дата создания',
        'updated_at': 'Дата обновления'
    }
    
    form_columns = ['id', 'label', 'price', 'order', 'is_active']
    
    column_default_sort = 'order'


class AdditionalServiceAdminView(SecureModelView):
    """Представление для управления дополнительными услугами"""
    
    column_list = ['id', 'label', 'price', 'unit', 'order', 'is_active', 'updated_at']
    column_searchable_list = ['id', 'label']
    column_filters = ['is_active']
    column_labels = {
        'id': 'ID (код)',
        'label': 'Название',
        'price': 'Цена (₽)',
        'unit': 'Единица измерения',
        'order': 'Порядок',
        'is_active': 'Активна',
        'created_at': 'Дата создания',
        'updated_at': 'Дата обновления'
    }
    
    form_columns = ['id', 'label', 'price', 'unit', 'order', 'is_active']
    
    column_default_sort = 'order'


class CalculatorSettingsAdminView(SecureModelView):
    """Представление для управления настройками калькулятора"""
    
    column_list = ['key', 'value', 'description', 'updated_at']
    column_searchable_list = ['key', 'description']
    column_labels = {
        'key': 'Ключ',
        'value': 'Значение',
        'description': 'Описание',
        'updated_at': 'Дата обновления'
    }
    
    form_columns = ['key', 'value', 'description']
    
    can_create = True
    can_delete = False  # Не даем удалять настройки


def init_admin(app):
    """Инициализация Flask-Admin"""
    admin = Admin(
        app,
        name='Админ-панель',
        template_mode='bootstrap3'
    )
    
    # Регистрация модели пользователей
    admin.add_view(UserAdminView(User, db.session, name='Пользователи', endpoint='users'))
    
    # Регистрация модели портфолио
    admin.add_view(PortfolioAdminView(PortfolioItem, db.session, name='Портфолио', endpoint='admin_portfolio'))
    
    # Регистрация модели акций
    admin.add_view(PromotionAdminView(Promotion, db.session, name='Акции', endpoint='admin_promotions'))
    
    # Регистрация моделей калькулятора
    admin.add_view(CleaningTypeAdminView(CleaningType, db.session, name='Типы уборки', endpoint='admin_cleaning_types', category='Калькулятор'))
    admin.add_view(AdditionalServiceAdminView(AdditionalService, db.session, name='Доп. услуги', endpoint='admin_additional_services', category='Калькулятор'))
    admin.add_view(CalculatorSettingsAdminView(CalculatorSettings, db.session, name='Настройки', endpoint='admin_calculator_settings', category='Калькулятор'))
    
    return admin

