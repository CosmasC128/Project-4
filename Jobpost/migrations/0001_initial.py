# Generated by Django 3.2.8 on 2021-10-24 17:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Businessprofile', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Jobpost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('text', models.TextField(max_length=3000)),
                ('jobrole', models.CharField(max_length=50)),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Business', to='Businessprofile.businessprofile')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobpost', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
