# Generated by Django 3.2.8 on 2021-10-22 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Businessprofile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=None, max_length=50)),
                ('location', models.CharField(default=None, max_length=300)),
                ('description', models.TextField(default=None, max_length=3000)),
                ('header_image', models.TextField(default=None, max_length=100)),
            ],
        ),
    ]