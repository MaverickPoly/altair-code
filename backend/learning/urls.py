from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProgrammingLanguageViewSet, CourseViewSet, LessonViewSet, ArticleViewSet

router = DefaultRouter()
router.register(r'programming-languages', ProgrammingLanguageViewSet, basename='programming-language')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'lessons', LessonViewSet, basename='lesson')
router.register(r'articles', ArticleViewSet, basename='article')

urlpatterns = [
    path('', include(router.urls)),
    path('courses/<int:course_pk>/lessons/', LessonViewSet.as_view({'get': 'list', 'post': 'create'}), name='course-lessons'),
    path('courses/<int:course_pk>/lessons/<int:pk>/', LessonViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='course-lesson-detail'),
]
