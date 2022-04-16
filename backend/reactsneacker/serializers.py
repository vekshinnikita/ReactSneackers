from rest_framework import serializers

from authentication.serializers import UserSerializers
from .models import Brand, Color, Orders, Product, ProductShots, RatingStar, Review, Sex, Size


class ColorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = ("id","name", "color")

class BrandListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = ("id", "name")

class SexListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sex
        fields = ("id", "name")

class SizeListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Size
        fields = ("id", "name")


class StarSerializers(serializers.ModelSerializer):

    class Meta:
        model = RatingStar
        fields = ( "id", "value")

class ReviewSerializers(serializers.ModelSerializer):

    rating = serializers.IntegerField()

    class Meta:
        model = Review
        fields = ( "id", "user_photo", "first_name", "text", "date", "rating")
    
class ReviewCreateSerializer(serializers.ModelSerializer):
    """Добавление отзыва"""

    class Meta:
        model = Review
        fields = "__all__"


class ProductShotsSerializers(serializers.ModelSerializer):

    class Meta:
        model = ProductShots
        fields = ("id", "url",)


class ProductListSerializers(serializers.ModelSerializer):
    middle_star = serializers.IntegerField()

    class Meta:
        model = Product
        fields = ("id", "title", "url_poster", "price", "middle_star")


class ProductDetailtSerializers(serializers.ModelSerializer):
    color = ColorListSerializer(read_only=True, many=True)
    shots = ProductShotsSerializers(read_only=True, many=True)
    review = ReviewSerializers(many=True)
    size = SizeListSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        exclude = ("draft","sex","brand")




class OrderSerializer(serializers.ModelSerializer):

    products = ProductListSerializers(many=True, read_only=True)
    
    class Meta:
        model = Orders
        fields = ('id','products','date','delivered')