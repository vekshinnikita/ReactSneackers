from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import CustomUser

# Register your models here.

class MyUserAdmin(UserAdmin):
    model = CustomUser
    ordering = ("first_name","last_name")  
    list_display = ("email","first_name","last_name")  
    list_display_link = ("email",)  
    search_fields = ("email", "first_name", "last_name","phone")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (("Personal info"), {"fields": ("photo","first_name", "last_name", "patronymic", "phone","date_birth")}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email",("first_name","last_name"), "password1", "password2"),
            },
        ),
    )

admin.site.register(CustomUser, MyUserAdmin)
admin.site.unregister(Group)