from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User


class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(unique=True, editable=True)
    description = models.TextField()
    image = models.ImageField(upload_to="languages/", blank=True, null=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


CATEGORY_CHOICES = (
    ("backend", "Backend"),
    ("frontend", "Frontend"),
    ("gamedev", "Game Dev"),
    ("mobiledev", "Mobile Dev"),
    ("beginner", "Beginner"),
    ("intermediate", "Intermediate"),
    ("dsa", "DSA"),
    ("misc", "Misc"),
)

class Course(models.Model):
    language = models.ForeignKey(ProgrammingLanguage, on_delete=models.CASCADE, related_name="courses")
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, editable=True)
    image = models.ImageField(upload_to="courses/", blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("language", "title")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name="lessons", on_delete=models.CASCADE)
    number = models.PositiveIntegerField()
    title = models.CharField(max_length=120)
    content = models.TextField()
    exercise = models.TextField(blank=True)

    class Meta:
        unique_together = ("course", "number")
        ordering = ["number"]

    def __str__(self):
        return f"{self.course.title} – Lesson {self.number}: {self.title}"


class Article(models.Model):
    tags = models.CharField(max_length=120)
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, editable=False)
    content = models.TextField()
    image = models.ImageField(upload_to="articles/", blank=True, null=True)
    view_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


