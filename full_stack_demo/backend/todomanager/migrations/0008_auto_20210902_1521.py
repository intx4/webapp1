# Generated by Django 3.2.6 on 2021-09-02 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todomanager', '0007_auto_20210902_1318'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='date',
            new_name='deadline',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='is_private',
            new_name='isPrivate',
        ),
    ]