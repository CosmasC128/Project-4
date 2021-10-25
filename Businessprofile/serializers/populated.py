from .common import BusinessprofileSerializer
from Jobpost.serializers.populated import PopulatedJobpostSerializer
from Userprofile.serializers.populated import PopulatedUserprofileSerializer
from Empreview.serializers.populated import PopulatedEmpreviewSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedBusinessprofileSerializer(BusinessprofileSerializer):
    owner = UserSerializer()
    employeereviews = PopulatedEmpreviewSerializer(many=True)
    jobposts = PopulatedJobpostSerializer(many=True)