from django.db import models
from django.apps import apps
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.contrib.auth.hashers import make_password

# Create your models here.

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError("The given username must be set")
        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    username_validator = None
    EMAIL_FIELD = "email"
    photo = models.ImageField("Фото пользователя", upload_to="user/", blank=True, null=True)
    phone = models.CharField("Номер телефона", max_length=20, blank=True)
    patronymic = models.CharField("Отчество", max_length=150, blank=True)
    date_birth = models.DateField('Дата Рождения', null=True)
    address = models.CharField("Адресс доставки", max_length=300, blank=True)
    email = models.EmailField("Email", blank=True, null=True, unique=True)

    REQUIRED_FIELDS = ["last_name", "first_name"]
    USERNAME_FIELD = "email"

    objects = UserManager()

