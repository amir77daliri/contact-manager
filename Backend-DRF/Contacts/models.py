from django.db import models
from .utils import upload_image_path


class Groups(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.name


class Contacts(models.Model):
    fullname = models.CharField(max_length=200)
    photo = models.ImageField(upload_to=upload_image_path)
    mobile = models.CharField(max_length=11)
    email = models.EmailField()
    job = models.CharField(max_length=200)
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name='contact')

    def __str__(self):
        return self.fullname
