from django.db import models
import os


class Groups(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.name


def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    name, ext = get_filename_ext(filename)
    final_name = f'{instance.fullname}-{ext}'
    return f'images/{final_name}'


class Contacts(models.Model):
    fullname = models.CharField(max_length=200)
    photo = models.ImageField(upload_to=upload_image_path)
    mobile = models.CharField(max_length=11)
    email = models.EmailField()
    job = models.CharField(max_length=200)
    group = models.OneToOneField(Groups, on_delete=models.CASCADE, related_name='contact')
