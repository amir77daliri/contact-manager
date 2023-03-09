from django.urls import path
from .views import (
    ContactsListApi,
    GroupListApi,
    CreateContactApi
)

urlpatterns = [
    path('contacts/', ContactsListApi.as_view()),
    path('add-contact/', CreateContactApi.as_view()),
    path('groups/', GroupListApi.as_view()),
]
