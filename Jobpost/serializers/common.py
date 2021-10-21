from rest_framework import serializers
from ..models import Jobpost

# This is my THIRD step
# make sure you've installed djangorestframework before trying to use it's properties
# We inherit the ModelSerializer from our serializers import which allows us to specify the Meta class
# The Meta class allows us to specify what data is going to be converted back into json format on it's data attribute

class JobpostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobpost # specifies the model we're looking in
        fields = '__all__' # __all__ specifies all fields will be returned from the object