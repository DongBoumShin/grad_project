from django.urls import path

from . import views
#from api_endpoint.views import AI_api
from .views_api import AI_api

urlpatterns = [
    path('', views.index),
    path('ai_endpoint/', AI_api.as_view()),
]