# Generated by Django 3.2.8 on 2021-11-13 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Busrating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('passion', models.PositiveIntegerField(default=0)),
                ('presence', models.PositiveIntegerField(default=0)),
                ('presentation', models.PositiveIntegerField(default=0)),
                ('punctuality', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
