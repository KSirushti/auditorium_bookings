# Generated by Django 5.1.7 on 2025-03-31 13:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('dept_id', models.AutoField(primary_key=True, serialize=False)),
                ('dept_name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('mobile', models.CharField(max_length=15)),
                ('designation', models.CharField(max_length=100)),
                ('role', models.CharField(choices=[('FACULTY', 'Faculty'), ('PHD', 'PhD Scholar'), ('PRO', 'PRO')], max_length=10)),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bookings.department')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('booking_id', models.AutoField(primary_key=True, serialize=False)),
                ('event_name', models.CharField(max_length=255)),
                ('event_type', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('slot', models.CharField(choices=[('FN', 'Forenoon'), ('AN', 'Afternoon'), ('FD', 'Full Day'), ('ES', 'Evening Session')], max_length=2)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('REJECTED', 'Rejected')], default='PENDING', max_length=10)),
                ('approval_time', models.DateTimeField(auto_now_add=True)),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bookings.department')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bookings.user')),
            ],
        ),
    ]
