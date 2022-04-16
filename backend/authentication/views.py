from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import requests
from .models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializers


# Create your views here.

class UpdateUserView(APIView):

    permission_classes = [IsAuthenticated,] 
    

    def post(self, request):
        data = request.data

        if data.get('email'):
            return Response({'detail': "Изменение email невозможно"})
        elif data.get('password'):
            return Response({'detail': "Изменить пароль можно только при входе в систему нажав на кнопку 'Забыл пароль?'"})

        if data:
            user = CustomUser.objects.get(email=request.user.email)
            serializer = UserSerializers(user, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            data = serializer.data
            if data["photo"]:
                protocol = 'https://' if request.is_secure() else 'http://'
                web_url = protocol + request.get_host()
                data["photo"] = web_url + data["photo"]
            return Response(data)
        else:
            return Response({"detail": "что-то пошло не так"})
