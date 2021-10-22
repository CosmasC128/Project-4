from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# import models
from .models import Busrating

# import serializers
from .serializers.common import BusratingSerializer
from .serializers.populated import PopulatedBusratingSerializer

class BusratingListView(APIView):
    permission_classes = (IsAuthenticated, )

    # POST Busrating
    # This adds a Busrating to the Busratings table
    def post(self, request):
        request.data['owner'] = request.user.id
        busrating_to_add = BusratingSerializer(data=request.data)
        if busrating_to_add.is_valid():
            busrating_to_add.save()
            return Response(busrating_to_add.data, status=status.HTTP_201_CREATED)
        return Response(busrating_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, _request):
        busrating = Busrating.objects.all()
        serialized_busrating = PopulatedBusratingSerializer(busrating, many=True)
        return Response(serialized_busrating.data, status=status.HTTP_200_OK)