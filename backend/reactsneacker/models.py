from distutils.command.upload import upload
from itertools import product
from pdb import post_mortem
from django.db import models
from django.forms import CharField
from authentication.models import CustomUser
from backend.settings import URL_HOST


# Create your models here.

class Brand(models.Model):
    name = models.CharField('Название бренда' ,max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"

class Color(models.Model):
    name = models.CharField('Название Цвета' ,max_length=150)
    color = models.CharField("Hex цвета", max_length=7, help_text="Указывать Hex цвета")

    def __str__(self):
        return self.name 

   

    
    class Meta:
        verbose_name = "Цвет"
        verbose_name_plural = "Цвета"
    
class Sex(models.Model):
    name = models.CharField('Пол' ,max_length=150)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Пол"
        verbose_name_plural = "Пол"

class Size(models.Model):
    name = models.CharField('Размер' ,max_length=150)

    def __str__(self):
        return self.name
    def __int__(self):
        return int(self.name)
    
    class Meta:
        verbose_name = "Размер"
        verbose_name_plural = "размеры"


class Product(models.Model):
    title = models.CharField('Название' ,max_length=150)
    color = models.ManyToManyField(Color, verbose_name="Цвета")
    brand = models.ForeignKey(Brand, verbose_name="Бренд", on_delete=models.CASCADE)
    sex = models.ManyToManyField(Sex, verbose_name="Пол")
    size = models.ManyToManyField(Size, verbose_name="Размеры")
    description = models.TextField("Описание")
    price = models.PositiveIntegerField("Цена", default=0)
    poster = models.ImageField("Постер", upload_to="posters/")
    draft = models.BooleanField("Черновик", default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
    
    def url_poster(self):
        return (URL_HOST + self.poster.url)


class ProductShots(models.Model):
    image = models.ImageField("Изображение", upload_to="images/")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="shots")

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"
    
    def url(self):
        return (URL_HOST + self.image.url)

    
class RatingStar(models.Model):
    value = models.SmallIntegerField("Значение", default=0, unique=True)

    class Meta:
        verbose_name = "Звезда рейтинга"
        verbose_name_plural = "Звезды рейтинга"
        ordering = ["-value"]
    
    def __int__(self):
        return self.value
    
    def __str__(self):
        return f'{self.value}'

class Review(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name="Пользователь", on_delete=models.CASCADE) 
    text = models.TextField("Сообщение", max_length=5000)
    date = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, verbose_name="Товар", on_delete=models.CASCADE, related_name="review")
    rating = models.ForeignKey(RatingStar, verbose_name="Оценка",on_delete=models.CASCADE)

    def first_name(self):
        return self.user.first_name
    first_name.short_description = 'Имя пользователя'

    def user_photo(self):
        try:
            return (URL_HOST + self.user.photo.url)
        except:
            return None



    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-date"]

class Orders(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name="Пользователь", on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, verbose_name="Товары")
    date = models.DateTimeField(auto_now_add=True)
    delivered = models.BooleanField("Доставлен", default=False)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"