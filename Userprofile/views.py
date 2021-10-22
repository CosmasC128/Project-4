from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly # IsAuthenticatedOrReadOnly specifies that a view is secure on all methods except get requests

from .models import Userprofile
from .serializers.common import UserprofileSerializer
from .serializers.populated import PopulatedUserprofileSerializer

# This is my FOURTH step after creating the serializer
# Here we are making a request to the db and saving it to the products variable
# It's returned in an unusable format, which is where the serializer comes in...
# This converts the QuerySet that is returned to python datatypes
# If you are expecting multiple records from the initial request, which we are here, you need to make sure you specify many=True in the serializer
# The converted data is stored on the data attribute of the serializer response, this is what we pass into our Response, along with the status code

class UserprofileListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, ) # sets the permission levels of the specific view by passing in the rest framework authentication class

    def get(self, _request):
        userprofiles = Userprofile.objects.all() 
        print('Userprofiles', userprofiles)
        serialized_userprofiles = PopulatedUserprofileSerializer(userprofiles, many=True)
        print('SERIALIZER', serialized_userprofiles.data)
        return Response(serialized_userprofiles.data, status=status.HTTP_200_OK)

    # POST /userprofiles/
    # Adds a new userprofile
    def post(self, request):
        request.data['owner'] = request.user.id
        userprofile_to_add = UserprofileSerializer(data=request.data)
        if userprofile_to_add.is_valid():
            userprofile_to_add.save()
            return Response(userprofile_to_add.data, status=status.HTTP_201_CREATED)
        return Response(userprofile_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# single Userprofile
class UserprofileDetailView(APIView):

    def get_userprofile(self, pk):
        try:
            return Userprofile.objects.get(pk=pk)
        except Userprofile.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Userprofile!")

    # GET single product
    # pk is the primary key of the product
    def get(self, _request, pk):
        userprofile = self.get_userprofile(pk=pk)
        serialized_userprofile = PopulatedUserprofileSerializer(userprofile)
        print(serialized_userprofile.data)
        return Response(serialized_userprofile.data, status=status.HTTP_200_OK)

    # DELETE single userprofile
    # pk is passed through again
    def delete(self, _request, pk):
        userprofile_to_delete = self.get_userprofile(pk=pk)
        userprofile_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT single userprofile
    # pk is passed through
    def put(self, request, pk):
        userprofile_to_update = self.get_userprofile(pk=pk) # get our userprofile
        print('Request data', request.data)
        updated_userprofile = UserprofileSerializer(userprofile_to_update, data=request.data)
        if updated_userprofile.is_valid(): # is_valid checks the validity of the newly created object
            updated_userprofile.save() # saves it if it's valid
            print('Updated data', updated_userprofile.data)
            return Response(updated_userprofile.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_userprofile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)