from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta # allows us to get current datetime stamp and add more time to create an expiry
from django.contrib.auth import get_user_model
from django.conf import settings # import settings so we have access to our secret
import jwt

from .serializers.common import UserSerializer
User = get_user_model() # returns user model

# REGISTER
class RegisterView(APIView):

    # POST /auth/register/
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# LOGIN
class LoginView(APIView):

    # POST /auth/login/
    # check the user exists
    # check the passwords match
    # create an expiry date to add the the token
    # generate token to send to user
    # return token to the user
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Check to see if user exists
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

        # check to ensure the password is correct for that user
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")

        # add current datetimestamp to a 7 day timestamp string to have an expiry of 7 days
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            { 'sub': user_to_login.id, 'exp': int(dt.strftime('%s')) },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        print('TOKEN', token)

        # return token to the user as a response
        return Response({ 'token': token, 'message': f"Welcome back, {user_to_login.username}"})