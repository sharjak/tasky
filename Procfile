release: python manage.py migrate
release: python manage.py makemigrations
release: python run sslserver 0.0.0.0:8000
web: gunicorn tasky.wsgi