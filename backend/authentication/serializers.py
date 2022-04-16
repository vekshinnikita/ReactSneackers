from rest_framework import serializers
from .service import delete_old_file


from .models import CustomUser

class UserSerializers(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        if (validated_data.get('photo') or validated_data.get('phone') is None) and instance.photo:
            # проверка validated_data.get('phone') is None нужна чтобы когда пользователь отправляет запрос на изменение информации
            # не удалялся текущий вайл (кастыль)
            delete_old_file(instance.photo.path)

        super().update(instance, validated_data)
        return instance
        

    class Meta:
        model = CustomUser
        fields = ["first_name","last_name","patronymic","date_birth","email","phone","address","photo"]