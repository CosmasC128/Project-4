from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# import models
from .models import Empreview

# import serializers
from .serializers.common import EmpreviewSerializer
from .serializers.populated import PopulatedEmpreviewSerializer

class EmpreviewListView(APIView):
    permission_classes = (IsAuthenticated, )

    # POST Empreview
    # This adds a Empreview to the Empreviews table
    def post(self, request):
        request.data['owner'] = request.user.id
        empreview_to_add = EmpreviewSerializer(data=request.data)
        if empreview_to_add.is_valid():
            empreview_to_add.save()
            return Response(empreview_to_add.data, status=status.HTTP_201_CREATED)
        return Response(empreview_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, _request):
        empreview = Empreview.objects.all()
        serialized_empreview = PopulatedEmpreviewSerializer(empreview, many=True)
        return Response(serialized_empreview.data, status=status.HTTP_200_OK)