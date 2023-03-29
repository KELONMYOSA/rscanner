from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class UserProfileManager(UserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = UserProfile(email=email, **extra_fields)
        user.password = make_password(password)
        user.username = email
        user.save(using=self._db)
        return user


class UserProfile(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    company = models.CharField(max_length=150, blank=True)
    avatar = models.CharField(max_length=255, blank=True)

    REQUIRED_FIELDS = ["first_name", "last_name", "company", "avatar"]
    USERNAME_FIELD = 'email'

    objects = UserProfileManager()

    class Meta:
        db_table = 'auth_user'