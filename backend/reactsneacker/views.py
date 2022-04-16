from django.db import models
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from backend.settings import URL_HOST

from .service import PaginationProduct, ProductFilter
from .serializers import BrandListSerializer, OrderSerializer, ProductDetailtSerializers, ProductListSerializers, ReviewCreateSerializer, ReviewSerializers
from .models import Brand, Color, Orders, Product, RatingStar, Review, Sex, Size
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet

class ProductViewSet(ReadOnlyModelViewSet):

    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_class = ProductFilter
    ordering_fields = ('price',)
    pagination_class = PaginationProduct
    search_fields = ['title','description']


    def get_queryset(self):
        movies = Product.objects.filter(draft=False).annotate(
            middle_star=models.Sum(models.F('review__rating__value')) / models.Count(models.F('review'))
        )

        return movies
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializers
        elif self.action == "retrieve":
            return ProductDetailtSerializers

class AddReviewAPI(APIView):

    permission_classes = [IsAuthenticated,]

    def post(self, request, pk):
        text = request.data.get('text')
        value = request.data.get('rating_value')
        if text and value:
            try:
                rating = RatingStar.objects.get(value=value)
                product = Product.objects.get(id=pk)
            except:
                return Response({"detail": "Упс... Что-то пошло не так"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Введённые вами данные не корректны"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ReviewCreateSerializer(data = {"text":text, "user":request.user.id,  "product":product.id,"rating":rating.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        review = Review.objects.get(id=serializer.data["id"])
        serializer_view = ReviewSerializers(review)
        
        return Response(serializer_view.data, status=status.HTTP_201_CREATED)

class FilterFieldsAPI(APIView):

    def get(self, request):
        brands = Brand.objects.all()
        serializerBrand = BrandListSerializer(brands, many=True)
        sexs = Sex.objects.all()
        serializerSexs = BrandListSerializer(sexs, many=True)
        colors = Color.objects.all()
        serializerColors = BrandListSerializer(colors, many=True)
        sizes = Size.objects.all()
        serializerSizes = BrandListSerializer(sizes, many=True)
        return Response({
            'brand': serializerBrand.data,
            'sex': serializerSexs.data,
            'color': serializerColors.data,
            'size': serializerSizes.data,
        })

class OrderAPI(APIView):

    permission_classes = [IsAuthenticated,]

    def get(self, request):
        user = request.user
        orders = Orders.objects.filter(user=user).prefetch_related(Prefetch('products', 
        Product.objects.annotate(middle_star=models.Sum(models.F('review__rating__value')) / models.Count(models.F('review')))))
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        ids_product = request.data.get('ids_product')
        print(ids_product)
        if len(ids_product):
            try:
                products = list(Product.objects.filter(pk__in=ids_product))
                order = Orders(user=user)
                order.save()
                order.products.set(products)
            except:
                print(1)
                return Response({"detail": "Упс... Что-то пошло не так"}, status=status.HTTP_400_BAD_REQUEST)
                
        else:
            print(2)
            return Response({"detail": "Упс... Что-то пошло не так"}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"id": order.id})
    