from .common import UserprofileSerializer
from Busrating.serializers.populated import PopulatedBusratingSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedUserprofileSerializer(UserprofileSerializer):
    owner = UserSerializer()
    businessratings = PopulatedBusratingSerializer(many=True)
