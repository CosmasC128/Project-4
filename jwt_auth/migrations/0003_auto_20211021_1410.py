# Generated by Django 3.2.8 on 2021-10-21 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_auto_20211021_1407'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='coverLetter',
        ),
        migrations.RemoveField(
            model_name='user',
            name='cv',
        ),
        migrations.RemoveField(
            model_name='user',
            name='description',
        ),
        migrations.RemoveField(
            model_name='user',
            name='title',
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=50),
        ),
    ]
