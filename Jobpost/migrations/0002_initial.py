# Generated by Django 3.2.8 on 2021-10-25 19:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Businessprofile', '0002_businessprofile_userprofiles'),
        ('Jobpost', '0001_initial'),
        ('Jobrole', '0001_initial'),
        ('Userprofile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpost',
            name='Userprofiles',
            field=models.ManyToManyField(blank=True, related_name='jobposts', to='Userprofile.Userprofile'),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='business',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobposts', to='Businessprofile.businessprofile'),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='jobrole',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobposts', to='Jobrole.jobrole'),
        ),
    ]
