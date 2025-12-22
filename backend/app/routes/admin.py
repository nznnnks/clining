from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from app import db
from app.models import User

bp = Blueprint('admin_auth', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    """Страница входа в админку"""
    if current_user.is_authenticated:
        return redirect(url_for('admin.index'))
    
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')
        
        if not username or not password:
            flash('Заполните все поля', 'error')
            return render_template('admin/login.html')
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password) and user.is_admin:
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('admin.index'))
        else:
            flash('Неверное имя пользователя или пароль', 'error')
    
    return render_template('admin/login.html')


@bp.route('/logout')
@login_required
def logout():
    """Выход из админки"""
    logout_user()
    flash('Вы вышли из системы', 'info')
    return redirect(url_for('admin_auth.login'))

