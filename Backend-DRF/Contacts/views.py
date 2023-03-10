from rest_framework import generics, status
from rest_framework.response import Response
from .models import Contacts, Groups
from .serializers import ContactsSerializer, GroupSerializer, CreateContactSerializer


class ContactsListApi(generics.ListAPIView):
    """
        Api View for contacts list
    """
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer


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
