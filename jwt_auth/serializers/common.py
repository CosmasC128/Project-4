from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation # password_validation is the same method being used to check our password is valid when creating a superuser
from django.contrib.auth.hashers import make_password # hashes our password for us
from django.core.exceptions import ValidationError

User = get_user_model() # this is our user model

class UserSerializer(serializers.ModelSerializer):
    # when User is being converted back to JSON to return data to user, password & confirmation are not going to be returned
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # validate function is going to:
    # check our passwords match
    # hash our passwords
    # update password on data object that is passed through from the request in the views
    def validate(self, data):
        # remove the fields from the request aand save to vars
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # check if the passwords match
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'Does not match password field'})

        # We're going to first make sure the password is valid
        try:
            password_validation.validate_password(password=password)
        except ValidationError as err:
            raise ValidationError({'password': err.messages})

        # reassign the value of data.password as the hashed password we create
        data['password'] = make_password(password) # make_password hashes a plain text string and returns it

        return data # returns updated data dictionary

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'password_confirmation')