from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask import redirect, url_for, flash, request
from flask_login import current_user
from wtforms import PasswordField, TextAreaField
from wtforms.validators import DataRequired
from app import db
from app.models import User, PortfolioItem, Promotion, CleaningType, AdditionalService, CalculatorSettings, Order
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
        'images': TextAreaField(
            'Изображения (JSON массив) - опционально', 
            description='Введите JSON массив URL изображений, например: ["url1.jpg", "url2.jpg"]'
        )
    }
    
    def create_form(self, obj=None):
        """Форма создания с инициализацией поля images"""
        form = super().create_form(obj)
        if not hasattr(form, 'images'):
            form.images = TextAreaField('Изображения (JSON массив)')
        form.images.data = ''
        return form
    
    def _process_images_field(self, form, model):
        """Вспомогательный метод для обработки поля images"""

        if request.method == 'POST':
            images_data = request.form.get('images', '')
        else:
            if hasattr(form, 'images') and form.images.data:
                images_data = form.images.data
            elif hasattr(model, 'images') and model.images:
                images_data = model.images
            else:
                images_data = ''
        
        if not images_data:
            if not hasattr(model, 'id') or model.id is None:
                model.images = None
            return True
        
        images_data = str(images_data).strip()
        
        if not images_data:
            if not hasattr(model, 'id') or model.id is None:
                model.images = None
            return True
        
        try:
            # Парсим JSON
            parsed_data = json.loads(images_data)
            
            if not isinstance(parsed_data, list):
                if isinstance(parsed_data, str):
                    parsed_data = [parsed_data]
                else:
                    flash(f'Поле "Изображения" должно быть JSON массивом! Получен тип: {type(parsed_data).__name__}. Используйте формат: ["url1.jpg", "url2.jpg"]', 'error')
                    return False
            
            filtered_data = []
            for img in parsed_data:
                if img and isinstance(img, str) and img.strip():
                    filtered_data.append(img.strip())
            
            if filtered_data:
                json_str = json.dumps(filtered_data, ensure_ascii=False)
                model.images = json_str
            else:
                if not hasattr(model, 'id') or model.id is None:
                    model.images = None
                
        except json.JSONDecodeError as e:
            flash(f'Неверный формат JSON в поле "Изображения": {str(e)}. Введено: {images_data[:100]}. Используйте формат: ["url1.jpg", "url2.jpg"]', 'error')
            return False
        except Exception as e:
            flash(f'Ошибка при обработке поля "Изображения": {str(e)}', 'error')
            return False
            
        return True
    
    def _on_model_change(self, form, model, is_created):
        """Внутренний метод Flask-Admin - переопределяем для полного контроля"""
        result = self._process_images_field(form, model)
        if not result:
            return False
        
        saved_images = model.images
        
        super()._on_model_change(form, model, is_created)
        
        model.images = saved_images
        
        return True
    
    def on_model_change(self, form, model, is_created):
        """Обработка изменения модели - вызывается перед сохранением"""
        result = self._process_images_field(form, model)
        if not result:
            return False
        
        saved_images = model.images
        
        try:
            super().on_model_change(form, model, is_created)
        except AttributeError:
            pass
        
        model.images = saved_images
    
    def on_model_save(self, form, model, is_created):
        """Вызывается после on_model_change, перед сохранением в БД"""
        saved_images = model.images
        
        # Обрабатываем поле
        self._process_images_field(form, model)
        
        # Если после обработки значение None, но было сохраненное значение, восстанавливаем
        if model.images is None and saved_images:
            if hasattr(form, 'images') and form.images.data and str(form.images.data).strip():
                # В форме было что-то введено, но обработка вернула None - оставляем None
                pass
            else:
                model.images = saved_images
        elif saved_images and not model.images:
            model.images = saved_images
    
    def edit_form(self, obj=None):
        """Форма редактирования с предзаполнением JSON"""
        form = super().edit_form(obj)
        
        if not hasattr(form, 'images'):
            form.images = TextAreaField('Изображения (JSON массив)')
        
        if obj and hasattr(obj, 'images') and obj.images:
            try:
                images_list = json.loads(obj.images)
                if isinstance(images_list, list) and len(images_list) > 0:
                    form.images.data = json.dumps(images_list, ensure_ascii=False)
                else:
                    form.images.data = ''
            except (json.JSONDecodeError, TypeError, AttributeError) as e:
                form.images.data = str(obj.images) if obj.images else ''
        else:
            form.images.data = ''
        
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


class OrderAdminView(SecureModelView):
    """Представление для управления заказами"""
    
    column_list = ['id', 'name', 'phone', 'area', 'cleaning_type_label', 'final_price', 'status', 'comment', 'created_at']
    column_searchable_list = ['name', 'phone', 'comment']
    column_filters = ['status', 'cleaning_type_id', 'created_at']
    column_labels = {
        'id': 'ID',
        'name': 'Имя',
        'phone': 'Телефон',
        'comment': 'Комментарий',
        'area': 'Площадь (м²)',
        'cleaning_type_id': 'ID типа уборки',
        'cleaning_type_label': 'Тип уборки',
        'additional_services': 'Доп. услуги',
        'base_price': 'Базовая цена (₽)',
        'adjusted_base_price': 'Скоррект. базовая цена (₽)',
        'additional_price': 'Доп. услуги (₽)',
        'final_price': 'Итоговая цена (₽)',
        'status': 'Статус',
        'created_at': 'Дата создания',
        'updated_at': 'Дата обновления'
    }
    
    form_columns = ['name', 'phone', 'comment', 'area', 'cleaning_type_id', 'cleaning_type_label', 
                    'additional_services', 'base_price', 'adjusted_base_price', 'additional_price', 
                    'final_price', 'status']
    
    form_extra_fields = {
        'comment': TextAreaField(
            'Комментарий',
            description='Комментарий клиента к заказу'
        ),
        'additional_services': TextAreaField(
            'Дополнительные услуги (JSON)',
            description='JSON объект с дополнительными услугами'
        )
    }
    
    column_default_sort = ('created_at', True)  # Сортировка по дате создания (новые сверху)
    
    can_create = False  # Заказы создаются только через калькулятор
    can_edit = True
    can_delete = True
    
    form_choices = {
        'status': [
            ('new', 'Новый'),
            ('in_progress', 'В работе'),
            ('completed', 'Завершен'),
            ('cancelled', 'Отменен')
        ]
    }
    
    def edit_form(self, obj=None):
        """Форма редактирования с предзаполнением JSON"""
        form = super().edit_form(obj)
        
        if obj and hasattr(obj, 'additional_services') and obj.additional_services:
            try:
                services_dict = json.loads(obj.additional_services)
                if isinstance(services_dict, dict):
                    form.additional_services.data = json.dumps(services_dict, ensure_ascii=False, indent=2)
                else:
                    form.additional_services.data = str(obj.additional_services)
            except (json.JSONDecodeError, TypeError, AttributeError):
                form.additional_services.data = str(obj.additional_services) if obj.additional_services else ''
        else:
            form.additional_services.data = ''
        
        return form
    
    def on_model_change(self, form, model, is_created):
        """Обработка изменения модели - валидация JSON"""
        if hasattr(form, 'additional_services') and form.additional_services.data:
            try:
                # Валидируем JSON
                json.loads(form.additional_services.data)
            except json.JSONDecodeError as e:
                flash(f'Неверный формат JSON в поле "Дополнительные услуги": {str(e)}', 'error')
                return False


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
    
    # Регистрация модели заказов
    admin.add_view(OrderAdminView(Order, db.session, name='Заказы', endpoint='admin_orders'))
    
    return admin

