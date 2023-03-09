from django.urls import path
from .views import (
    ContactsListApi,
    GroupListApi
)

urlpatterns = [
    path('', ContactsListApi.as_view()),
    path('groups', GroupListApi.as_view()),
]
