from django.db import models

# -------------------
# 1. Department Model
# -------------------
class Department(models.Model):
    dept_id = models.AutoField(primary_key=True)
    dept_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.dept_name


# -------------------
# 2. User Model
# -------------------
class User(models.Model):
    USER_TYPES = [
        ('FACULTY', 'Faculty'),
        ('PHD', 'PhD Scholar'),
        ('PRO', 'PRO'),
    ]

    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15)
    designation = models.CharField(max_length=100)
    role = models.CharField(max_length=10, choices=USER_TYPES)

    # Department is optional for PROs
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.role})"


# -------------------
# 3. Booking Model
# -------------------
class Booking(models.Model):
    SLOT_CHOICES = [
        ('FN', 'Forenoon'),
        ('AN', 'Afternoon'),
        ('FD', 'Full Day'),
        ('ES', 'Evening Session'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    booking_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    event_name = models.CharField(max_length=255)
    event_type = models.CharField(max_length=100)
    date = models.DateField()
    slot = models.CharField(max_length=2, choices=SLOT_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    approval_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_name} - {self.date} ({self.slot})"
