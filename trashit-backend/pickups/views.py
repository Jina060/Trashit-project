from django.shortcuts import render

# pickup/views.py

from rest_framework import generics, permissions
from .models import PickupRequest
from .serializers import PickupRequestSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

User = get_user_model()

class PickupRequestCreateView(generics.CreateAPIView):
    queryset = PickupRequest.objects.all()
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically assign a collector based on dummy location logic
        location = self.request.data.get("location")

        # Find an available collector (you can improve this later with filters)
        collector = User.objects.filter(role='collector').first()

        serializer.save(customer=self.request.user, collector=collector)

