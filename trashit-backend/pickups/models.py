from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class PickupRequest(models.Model):
    PLAN_CHOICES = [
        ('on_demand', 'On-Demand'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pickups")
    collector = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_pickups")

    plan = models.CharField(max_length=20, choices=PLAN_CHOICES)
    location = models.TextField()  # full address
    latitude = models.FloatField(null=True, blank=True)   # for maps
    longitude = models.FloatField(null=True, blank=True)  # for maps
    date = models.DateField()
    time = models.TimeField()

    payment_status = models.CharField(max_length=20, default='pending')  # or 'paid'
    payment_confirmed = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.username} - {self.plan} - {self.date}"
