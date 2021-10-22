from jwt_auth.serializers.common import UserSerializer
from .common import BusratingSerializer

class PopulatedBusratingSerializer(BusratingSerializer):
    owner = UserSerializer()