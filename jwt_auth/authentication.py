from rest_framework.authentication import BasicAuthentication # Class to inherit that has pre-defined validations
from rest_framework.exceptions import PermissionDenied # throws an exception
from django.contrib.auth import get_user_model # method that returns the current auth model
from django.conf import settings # import settings so we can get secret key
import jwt # import jwt so we can decode the token in the auth header

User = get_user_model() # saving auth model to a variable

class JWTAuthentication(BasicAuthentication):

    # This will act as the middleware that authenticates our secure routes
    def authenticate(self, request):
        # Making sure authorization header exists, saving it to variable if it does
        header = request.headers.get('Authorization')

        # Check if header has a value, if it doesn't return None
        if not header:
            return None

        # Ensure the header is in the right format
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail="Invalid Auth Token Format")

        # remove Bearer from beginning of Authorization header
        token = header.replace('Bearer ', '')

        # Get payload, take the sub (the user id) and make sure that user exists
        try:
            # 1st arg is the token itself
            # 2nd arg is the secret
            # 3rd argument is kwarg that takes the algorithm used
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

            # find user
            user = User.objects.get(pk=payload.get('sub'))

        # if jwt.decode errors, this except will catch it
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Token')

        # If no user is found in the db matching the sub, the below will catch it
        except User.DoesNotExist:
            raise PermissionDenied(detail='User Not Found')

        # If all good, return the user and the token
        return (user, token)