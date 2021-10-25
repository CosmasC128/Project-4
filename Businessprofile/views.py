from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly # IsAuthenticatedOrReadOnly specifies that a view is secure on all methods except get requests

from .models import Businessprofile
from .serializers.common import BusinessprofileSerializer
from .serializers.populated import PopulatedBusinessprofileSerializer

# This is my FOURTH step after creating the serializer
# Here we are making a request to the db and saving it to the products variable
# It's returned in an unusable format, which is where the serializer comes in...
# This converts the QuerySet that is returned to python datatypes
# If you are expecting multiple records from the initial request, which we are here, you need to make sure you specify many=True in the serializer
# The converted data is stored on the data attribute of the serializer response, this is what we pass into our Response, along with the status code

class BusinessprofileListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, ) # sets the permission levels of the specific view by passing in the rest framework authentication class

    def get(self, _request):
        businessprofiles = Businessprofile.objects.all() 
        print('businessprofiles', businessprofiles)
        serialized_businessprofiles = PopulatedBusinessprofileSerializer(businessprofiles, many=True)
        print('SERIALIZER', serialized_businessprofiles.data)
        return Response(serialized_businessprofiles.data, status=status.HTTP_200_OK)

    # POST /products/
    # Adds a new product
    def post(self, request):
        request.data['owner'] = request.user.id
        businessprofile_to_add = BusinessprofileSerializer(data=request.data)
        if businessprofile_to_add.is_valid():
            businessprofile_to_add.save()
            return Response(businessprofile_to_add.data, status=status.HTTP_201_CREATED)
        return Response(businessprofile_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# single businessprofile
class BusinessprofileDetailView(APIView):

    def get_businessprofile(self, pk):
        try:
            return Businessprofile.objects.get(pk=pk)
        except Businessprofile.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Businessprofile!")

    # GET single businessprofile
    # pk is the primary key of the businessprofile
    def get(self, _request, pk):
        businessprofile = self.get_businessprofile(pk=pk)
        serialized_businessprofile = PopulatedBusinessprofileSerializer(businessprofile)
        print(serialized_businessprofile.data)
        return Response(serialized_businessprofile.data, status=status.HTTP_200_OK)

    # DELETE single businessprofile
    # pk is passed through again
    def delete(self, _request, pk):
        businessprofile_to_delete = self.get_businessprofile(pk=pk)
        businessprofile_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT single businessprofile
    # pk is passed through
    def put(self, request, pk):
        businessprofile_to_update = self.get_businessprofile(pk=pk) # get our businessprofile
        print('Request data', request.data)
        updated_businessprofile = BusinessprofileSerializer(businessprofile_to_update, data=request.data)
        if updated_businessprofile.is_valid(): # is_valid checks the validity of the newly created object
            updated_businessprofile.save() # saves it if it's valid
            print('Updated data', updated_businessprofile.data)
            return Response(updated_businessprofile.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_businessprofile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)