from jwt_auth.serializers.common import UserSerializer
from .common import EmpreviewSerializer

class PopulatedEmpreviewSerializer(EmpreviewSerializer):
    owner = UserSerializer()