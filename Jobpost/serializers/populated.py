from jwt_auth.serializers.common import UserSerializer
from Jobrole.serializers.common import JobroleSerializer
from .common import JobpostSerializer

class PopulatedJobpostSerializer(JobpostSerializer):
    owner = UserSerializer()
    jobrole = JobroleSerializer()