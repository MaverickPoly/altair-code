from rest_framework import serializers
from .models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = [
            "id", "user", "bio", "github_account",
             "completed_lessons", "xp", "created_at", "updated_at"
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    github_account = serializers.URLField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "bio", "github_account"]

    def create(self, validated_data):
        bio = validated_data.pop("bio", "")
        github = validated_data.pop("github_account", "")
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, bio=bio, github_account=github)
        return user

