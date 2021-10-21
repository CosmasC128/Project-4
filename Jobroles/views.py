from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# import models
from .models import Jobrole

# import serializers
from .serializers.populated import PopulatedJobroleSerializer

# Define views
class JobroleListView(APIView):

    # GET genres
    # This will return all genres
    def get(self, _request):
        jobroles = Jobrole.objects.all()
        serialized_Jobroles = PopulatedJobroleSerializer(jobroles, many=True)
        return Response(serialized_Jobroles.data, status=status.HTTP_200_OK)