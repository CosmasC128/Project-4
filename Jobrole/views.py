from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# import models
from .models import Jobrole

# import serializers
from .serializers.common import JobroleSerializer

class JobroleListView(APIView):

    def get(self, _request):
        jobroles = Jobrole.objects.all() 
        print('jobroles', jobroles)
        serialized_jobroles = JobroleSerializer(jobroles, many=True)
        print('SERIALIZER', serialized_jobroles.data)
        return Response(serialized_jobroles.data, status=status.HTTP_200_OK)
        
    # POST /Jobroles/
    # Adds a new Jobrole
    def post(self, request):
        request.data['owner'] = request.user.id
        jobrole_to_add = JobroleSerializer(data=request.data)
        if jobrole_to_add.is_valid():
            jobrole_to_add.save()
            return Response(jobrole_to_add.data, status=status.HTTP_201_CREATED)
        return Response(jobrole_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Define views
class JobroleDetailView(APIView):

    def get_jobrole(self, pk):
        try:
            return Jobrole.objects.get(pk=pk)
        except Jobrole.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Jobrole!")

    # GET single product
    # pk is the primary key of the product
    def get(self, _request, pk):
        jobrole = self.get_jobrole(pk=pk)
        serialized_jobrole = JobroleSerializer(jobrole)
        print(serialized_jobrole.data)
        return Response(serialized_jobrole.data, status=status.HTTP_200_OK)
