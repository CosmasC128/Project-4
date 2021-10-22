from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# import models
from .models import Jobroles

# import serializers
from .serializers.populated import PopulatedJobrolesSerializer

# Define views
class JobrolesListView(APIView):

    # GET Jobroless
    # This will return all Jobroless
    def get(self, _request):
        jobroles = Jobroles.objects.all()
        serialized_jobroles = PopulatedJobrolesSerializer(jobroles, many=True)
        return Response(serialized_jobroles.data, status=status.HTTP_200_OK)