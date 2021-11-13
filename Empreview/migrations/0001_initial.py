# Generated by Django 3.2.8 on 2021-11-13 14:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Businessprofile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Empreview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pay', models.PositiveIntegerField(default=0)),
                ('patience', models.PositiveIntegerField(default=0)),
                ('positivity', models.PositiveIntegerField(default=0)),
                ('punishment', models.PositiveIntegerField(default=0)),
                ('businessprofile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employeereviews', to='Businessprofile.businessprofile')),
            ],
        ),
    ]
