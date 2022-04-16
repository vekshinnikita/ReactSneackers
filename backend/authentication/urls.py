from django.urls import path, include

from .views import UpdateUserView


urlpatterns = [
    path('update/user/', UpdateUserView.as_view()),
]