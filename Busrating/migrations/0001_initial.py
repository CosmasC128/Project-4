# Generated by Django 3.2.8 on 2021-10-22 14:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Userprofile', '0001_initial'),
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
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to=settings.AUTH_USER_MODEL)),
                ('userprofile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='Userprofile.userprofile')),
            ],
        ),
    ]
