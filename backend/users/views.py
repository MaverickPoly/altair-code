from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from .models import Profile
from .serializers import ProfileSerializer, RegisterSerializer
from django.contrib.auth.models import User
from django.conf import settings


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action == "list":
            return Profile.objects.filter(user=self.request.user)
        return Profile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class TokenCookieDeleteView(APIView):
    def post(self, request):
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        cookie_name = getattr(settings, 'SIMPLE_JWT', {}).get('AUTH_COOKIE')

        if cookie_name:
            response.delete_cookie(cookie_name)
            # If you also have a refresh token cookie, delete that as well
            refresh_cookie_name = getattr(settings, 'SIMPLE_JWT', {}).get('AUTH_COOKIE_REFRESH')
            if refresh_cookie_name:
                response.delete_cookie(refresh_cookie_name)

        return response


# Leaderboard
@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard(request):
    profiles = Profile.objects.select_related('user').order_by('-xp')
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

