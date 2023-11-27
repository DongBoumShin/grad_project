from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
import requests
from bs4 import BeautifulSoup as bs
import pandas as pd
import random
from .forms import ImageUploadForm

URL = "http://172.31.39.43:8080"
class AI_api(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            # Access the uploaded file in-memory
            image_file = request.FILES['image']
            image_content = image_file.read()
            data = requests.post(URL, files={'image': image_content})
        else:
            data = {'age':'ybs', 'gender':'men', 'emotion':'neutral'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        data = {'age': 'ybs', 'gender': 'men', 'emotion': 'neutral'}
        return Response(data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)


MUSIC_DB = pd.read_csv("main/music_db.csv")
MUSIC_DB = MUSIC_DB.set_index("dist")
MUSIC_DB.iloc[:-1] = MUSIC_DB.iloc[:-1].astype(float)
MUSIC_DB['OST'] = MUSIC_DB['OST']*0

class Music_api(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = request.data.get('data')
        print(data)
        values = [round(random.uniform(-0.8, 0.8), 1) for _ in range(11)]
        genres = ((MUSIC_DB.loc[data[0]]+MUSIC_DB.loc[data[1]])*(values+MUSIC_DB.loc[data[2]])).astype(float)
        genres = genres.nlargest(3).index.tolist()
        genres = MUSIC_DB.loc['codes', genres]
        user_agent = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'}
        lst = []
        for code in genres:
            ls = []
            selector1 = 'div.ellipsis.rank01'
            selector2 = 'div.ellipsis.rank02'
            selector3 = {"width":60}
            if code == "GN1700":
                res = requests.get('https://www.melon.com/genre/jazz_list.htm?gnrCode=GN1700', headers=user_agent)
            elif code == "GN1600":
                res = requests.get('https://www.melon.com/genre/classic_list.htm?gnrCode=GN1600', headers=user_agent)
                selector1 = 'a.ellipsis.album_name'
                selector2 = 'span.ellipsis.artist'
                selector3 = {"width":180}
            else:
                res = requests.get('https://www.melon.com/genre/song_list.htm?gnrCode='+code, headers=user_agent)
            soup = bs(res.text, 'html.parser')
            songs = soup.select(selector1)
            ls.append([x.text.strip() for x in songs[:3]])
            artists = soup.select(selector2)
            tt = [x.text.strip() for x in artists[:3]]
            ls.append([x[:len(x)//2] for x in tt])
            album_art = soup.find_all('img', selector3)
            ls.append([x['src'] for x in album_art[:3]])
            lst.append(ls)
        data = {"data": genres, "songs": lst}
        return Response(data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)