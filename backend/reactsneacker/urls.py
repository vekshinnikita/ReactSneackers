from django.urls import path, include

from .views import AddReviewAPI, FilterFieldsAPI, OrderAPI, ProductViewSet


urlpatterns = [
    path('products/', ProductViewSet.as_view({"get": "list"})),
    path('products/<int:pk>/', ProductViewSet.as_view({"get": "retrieve"})),
    path('products/<int:pk>/review/', AddReviewAPI.as_view()),
    path('filter/fields/', FilterFieldsAPI.as_view()),
    path('orders/', OrderAPI.as_view()),
]