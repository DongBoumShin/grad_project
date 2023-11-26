import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

class AI_api(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = {'age':'defaultA', 'gender':'defaultG', 'emotion':'default.E'}
        return Response(data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)