from rest_framework import viewsets, permissions, decorators, response, status
from .models import ProgrammingLanguage, Course, Lesson, Article
from .serializers import (
    ProgrammingLanguageSerializer,
    CourseSerializer,
    LessonSerializer,
    ArticleSerializer,
)
from users.models import Profile
from django.db.models import F


class ProgrammingLanguageViewSet(viewsets.ModelViewSet):
    queryset = ProgrammingLanguage.objects.all()
    serializer_class = ProgrammingLanguageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def complete(self, request, pk=None):
        course = self.get_object()
        request.user.completed_courses.add(course)
        request.user.xp += 250
        request.user.save()
        return response.Response({"xp": request.user.xp})


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @decorators.action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def complete(self, request, pk=None):
        lesson = self.get_object()
        profile: Profile = request.user.profile

        # add only if not already completed
        if not profile.completed_lessons.filter(pk=lesson.pk).exists():
            profile.completed_lessons.add(lesson)
            profile.xp += 15
            profile.save(update_fields=["xp"])
            return response.Response(
                {"detail": "Lesson marked complete", "xp": profile.xp},
                status=status.HTTP_200_OK,
            )
        return response.Response(
            {"detail": "Lesson already completed"}, status=status.HTTP_200_OK
        )


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    lookup_field = "slug"

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.view_count = F("view_count") + 1
        obj.save(update_fields=["view_count"])
        obj.refresh_from_db(fields=["view_count"])
        return super().retrieve(request, *args, **kwargs)
