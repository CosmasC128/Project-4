# Generated by Django 3.2.8 on 2021-10-24 17:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Jobrole', '0001_initial'),
        ('Jobpost', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobpost',
            name='jobrole',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Jobrole', to='Jobrole.jobrole'),
        ),
    ]
