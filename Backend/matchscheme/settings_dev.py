"""
Development settings for MatchScheme - Uses SQLite for migrations, MongoDB for data
"""
from .settings import *

# Use SQLite for development/migrations
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEBUG = True
