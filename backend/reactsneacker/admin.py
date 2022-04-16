from django.contrib import admin
from django.utils.safestring import mark_safe


from .models import Brand, Color, Orders, Product, ProductShots, RatingStar, Review, Sex, Size

# Register your models here.


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1
    readonly_fields = ("text", "rating")

class MovieShotsInline(admin.TabularInline):
    model = ProductShots
    extra = 1
    readonly_fields = ("get_image",)

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} height="110"')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title','brand','get_image',"draft",)
    list_filter = ('brand',"color","sex")
    inlines = [MovieShotsInline, ReviewInline]
    save_on_top = True
    list_editable =("draft", )
    readonly_fields = ("get_image",)
    fieldsets = (
        (None, {
            "fields": (("title",),)
        }),
        (None, {
            "fields": ("description", ("poster", "get_image"),)
        }),
        (None, {
            "fields": (("brand", "color","sex","size","price"))
        }),
        ("Options", {
            "fields": ("draft",)
        }),
    )
    def get_image(self, obj):
        return mark_safe(f'<img src={obj.poster.url}  height="110"')
    
@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name','get_color')
    fields = ["name", ("color","get_color")]
    readonly_fields = ("get_color",)

    def get_color(self, obj):
        return mark_safe(f'<div style="border:1px solid black; background-color: {obj.color}; width: 50px; height: 50px;"')


@admin.register(Sex)
class SexAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Size)
class SexAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(ProductShots)
class ProductShotsAdmin(admin.ModelAdmin):
    list_display = ("get_image","image",)
    list_display_link = ("get_image",)
    readonly_fields = ("get_image",)
    fields = [("image","get_image","product")]

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url}  height="110"')

@admin.register(RatingStar)
class RatingStarAdmin(admin.ModelAdmin):
    list_display = ("value",)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("first_name","date",)

@admin.register(Orders)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id","user",)