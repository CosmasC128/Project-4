# Generated by Django 3.2.8 on 2021-10-25 10:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0003_auto_20211021_1410'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
    ]
