from django.urls import path
from .views import (
    ContactsListApi,
    GroupListApi,
    CreateContactApi,
    ContactRetrieveUpdateDestroyApi
)

urlpatterns = [
    path('contacts/', ContactsListApi.as_view()),
    path('add-contact/', CreateContactApi.as_view()),
    path('groups/', GroupListApi.as_view()),
    path('contact/<int:pk>/', ContactRetrieveUpdateDestroyApi.as_view()),
]
