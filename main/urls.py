from django.urls import path

from . import views
from .views_api import AI_api, Music_api

urlpatterns = [
    path('', views.index),
    path('ai_endpoint/', AI_api.as_view()),
    path('music_endpoint/', Music_api.as_view()),
]