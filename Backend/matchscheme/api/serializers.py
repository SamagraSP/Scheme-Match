from .models import Policy, UserProfile
from rest_framework import serializers

# Create serializers for the Policy and UserProfile models

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = '__all__'  

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'