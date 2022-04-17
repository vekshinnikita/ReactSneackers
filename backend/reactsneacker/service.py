from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Product
import math



class PaginationProduct(PageNumberPagination):
    page_size = 10
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'page_quantity': math.ceil(self.page.paginator.count/self.page_size),
            'result': data,
            })

class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass

class ProductFilter(filters.FilterSet):

    color = CharFilterInFilter(field_name="color__name", lookup_expr="in")
    sex = CharFilterInFilter(field_name="sex__name", lookup_expr="in")
    brand = CharFilterInFilter(field_name="brand__name", lookup_expr="in")
    size = CharFilterInFilter(field_name="size__name", lookup_expr="in")
    price = filters.RangeFilter()

    class Meta:
        model = Product
        fields = ['color', 'brand', 'sex', 'size', 'price']