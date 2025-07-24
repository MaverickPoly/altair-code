from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, RegisterView, TokenCookieDeleteView, leaderboard

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('auth/logout/', TokenCookieDeleteView.as_view(), name='logout_cookie_delete'),
    path("leaderboard/", leaderboard, name="leaderboard"),
]
