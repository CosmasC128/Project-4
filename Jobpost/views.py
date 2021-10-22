from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly # IsAuthenticatedOrReadOnly specifies that a view is secure on all methods except get requests

from .models import Jobpost
from .serializers.common import JobpostSerializer
from .serializers.populated import PopulatedJobpostSerializer

# This is my FOURTH step after creating the serializer
# Here we are making a request to the db and saving it to the Jobpostss variable
# It's returned in an unusable format, which is where the serializer comes in...
# This converts the QuerySet that is returned to python datatypes
# If you are expecting multiple records from the initial request, which we are here, you need to make sure you specify many=True in the serializer
# The converted data is stored on the data attribute of the serializer response, this is what we pass into our Response, along with the status code

class JobpostListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, ) # sets the permission levels of the specific view by passing in the rest framework authentication class

    def get(self, _request):
        jobposts = Jobpost.objects.all() 
        print('jobposts', jobposts)
        serialized_jobposts = PopulatedJobpostSerializer(jobposts, many=True)
        print('SERIALIZER', serialized_jobposts.data)
        return Response(serialized_jobposts.data, status=status.HTTP_200_OK)

    # POST /jobpost/
    # Adds a new jobpost
    def post(self, request):
        request.data['owner'] = request.user.id
        jobposts_to_add = JobpostSerializer(data=request.data)
        if jobposts_to_add.is_valid():
            jobposts_to_add.save()
            return Response(jobposts_to_add.data, status=status.HTTP_201_CREATED)
        return Response(jobposts_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# single jobpost
class JobpostDetailView(APIView):

    def get_jobpost(self, pk):
        try:
            return Jobpost.objects.get(pk=pk)
        except Jobpost.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Jobpost!")

    # GET single jobpost
    # pk is the primary key of the jobpost
    def get(self, _request, pk):
        jobpost = self.get_jobpost(pk=pk)
        serialized_jobpost = PopulatedJobpostSerializer(jobpost)
        print(serialized_jobpost.data)
        return Response(serialized_jobpost.data, status=status.HTTP_200_OK)

    # DELETE single product
    # pk is passed through again
    def delete(self, _request, pk):
        jobpost_to_delete = self.get_jobpost(pk=pk)
        jobpost_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT single jobpost
    # pk is passed through
    def put(self, request, pk):
        jobpost_to_update = self.get_jobpost(pk=pk) # get our jobpost
        print('Request data', request.data)
        updated_jobpost = JobpostSerializer(jobpost_to_update, data=request.data)
        if updated_jobpost.is_valid(): # is_valid checks the validity of the newly created object
            updated_jobpost.save() # saves it if it's valid
            print('Updated data', updated_jobpost.data)
            return Response(updated_jobpost.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_jobpost.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)