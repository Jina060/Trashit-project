# pickup/serializers.py

from rest_framework import serializers
from .models import PickupRequest
from django.contrib.auth import get_user_model

User = get_user_model()

class PickupRequestSerializer(serializers.ModelSerializer):
    customer = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = PickupRequest
        fields = [
            'id',
            'customer',
            'collector',
            'plan',
            'location',
            'date',
            'time',
            'payment_status',
            'transaction_id',
            'created_at',
        ]
        read_only_fields = ['collector', 'payment_status', 'transaction_id', 'created_at']
