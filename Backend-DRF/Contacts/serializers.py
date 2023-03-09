from rest_framework import serializers
from .models import Contacts, Groups


class ContactsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contacts
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Groups
        fields = '__all__'
