from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PolicyViewSet, UserProfileViewSet, CustomTokenObtainPairView, TokenRefreshView, register

router = DefaultRouter()
router.register('policies', PolicyViewSet, basename = 'policy')
router.register('user-profiles', UserProfileViewSet, basename = 'user-profile')

urlpatterns = [
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', register, name='register'),
    path('', include(router.urls)),
]
