from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
import requests

import pandas as pd
import random

URL = "http://"
class AI_api(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = requests.post(URL, json=request)
        return Response(data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)


MUSIC_DB = pd.read_csv("music_db.csv")
MUSIC_DB = MUSIC_DB.set_index("dist")
MUSIC_DB['OST'] = MUSIC_DB['OST']*0

class Music_api(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = request.data.get('data')
        values = [round(random.uniform(-0.8, 0.8), 1) for _ in range(11)]
        temp = ((MUSIC_DB.loc[data[0]]+MUSIC_DB.loc[data[1]])*(values+MUSIC_DB.loc[data[2]])).nlargest(3).index.tolist()
        data = {"data": temp}
        return Response(data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)