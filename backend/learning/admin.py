from django.contrib import admin
from .models import Course, Lesson, ProgrammingLanguage, Article


admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(ProgrammingLanguage)
admin.site.register(Article)
