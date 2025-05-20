from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import RegisterView
from .views import signup

urlpatterns = [
    # register path
    path('register/', RegisterView.as_view(), name='register'),

    # Login endpoint (obtain tokens)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Refresh token endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

#Handle signup
    path('signup/', signup, name='signup'),
]