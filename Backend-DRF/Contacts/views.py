from rest_framework import generics, status
from rest_framework.response import Response
from .models import Contacts, Groups
from .serializers import ContactsSerializer, GroupSerializer


class ContactsListApi(generics.ListAPIView):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer


class GroupListApi(generics.ListAPIView):
    queryset = Groups.objects.all()
    serializer_class = GroupSerializer
