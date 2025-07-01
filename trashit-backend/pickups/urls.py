# pickup/urls.py

from django.urls import path
from .views import PickupRequestCreateView

urlpatterns = [
    path('schedule/', PickupRequestCreateView.as_view(), name='schedule-pickup'),
]
