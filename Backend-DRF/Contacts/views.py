from rest_framework import generics, status
from rest_framework.response import Response
from .models import Contacts, Groups
from .serializers import ContactsSerializer, GroupSerializer, CreateContactSerializer
from rest_framework.pagination import PageNumberPagination


class ContactPagination(PageNumberPagination):
    page_size = 20
    max_page_size = 100
    page_size_query_param = 'page_size'


class ContactsListApi(generics.ListAPIView):
    """
        Api View for contacts list
    """
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer
    pagination_class = ContactPagination


class GroupListApi(generics.ListAPIView):
    """
        Api View for Groups list
    """
    queryset = Groups.objects.all()
    serializer_class = GroupSerializer


class CreateContactApi(generics.CreateAPIView):
    queryset = Contacts.objects.all()
    serializer_class = CreateContactSerializer


class ContactRetrieveUpdateDestroyApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contacts.objects.all()
    serializer_class = CreateContactSerializer
