from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('collector', 'Trash Collector'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    # Add more custom fields here if needed (e.g., phone_number, address)

    def __str__(self):
        return self.username

