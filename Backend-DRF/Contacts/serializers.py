from rest_framework import serializers
from .models import Contacts, Groups


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Groups
        fields = '__all__'


class ContactsSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = Contacts
        fields = '__all__'


class CreateContactSerializer(serializers.ModelSerializer):
    ...