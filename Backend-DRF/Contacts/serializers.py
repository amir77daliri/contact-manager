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
    group = serializers.IntegerField()

    class Meta:
        model = Contacts
        fields = '__all__'

    def create(self, validated_data):
        group_id = validated_data.pop("group")
        try:
            group = Groups.objects.get(id=group_id)
            contact = Contacts.objects.create(**validated_data, group=group)
            print("hello")
            return contact
        except:
            raise serializers.ValidationError("گروه انتخاب شده اشتباه است.")

