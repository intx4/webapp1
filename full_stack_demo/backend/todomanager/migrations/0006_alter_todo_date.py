# Generated by Django 3.2.6 on 2021-08-30 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todomanager', '0005_alter_todo_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='date',
            field=models.DateField(),
        ),
    ]
