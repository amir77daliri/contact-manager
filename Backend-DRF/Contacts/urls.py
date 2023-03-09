from django.urls import path
from .views import (
    ContactsListApi,
    GroupListApi,
    CreateContactApi
)

urlpatterns = [
    path('', ContactsListApi.as_view()),
    path('add', CreateContactApi.as_view()),
    path('groups', GroupListApi.as_view()),
]
