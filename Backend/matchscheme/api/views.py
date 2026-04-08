from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .models import Policy, UserProfile
from rest_framework.response import Response
from .serializers import PolicySerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError


# Create your views here.

class PolicyViewSet(viewsets.ModelViewSet):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        email = str(request.data.get('email', '')).strip().lower()
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=400)

        user = User.objects.filter(email__iexact=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            profile = UserProfile.objects.filter(user=user).first()
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': profile.name if profile else user.username,
                },
            })
        return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
def register(request):
    data = request.data
    try:
        email = data.get('email', '').strip().lower()
        password = data.get('password')
        name = data.get('name', '').strip()

        required_fields = ['age', 'gender', 'location', 'category', 'occupation', 'income']
        missing_fields = [field for field in ['email', 'password', 'name', *required_fields] if not data.get(field)]
        if missing_fields:
            return Response(
                {'error': f"Missing required fields: {', '.join(missing_fields)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'An account with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(username=email, email=email, password=password)
        UserProfile.objects.create(
            user=user,
            name=name,
            age=data.get('age'),
            gender=str(data.get('gender')).lower(),
            location=str(data.get('location')).strip(),
            category=str(data.get('category')).lower(),
            occupation=str(data.get('occupation')).strip(),
            income=data.get('income')
        )
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                'message': 'User created',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': name,
                },
            },
            status=status.HTTP_201_CREATED,
        )
    except IntegrityError:
        return Response({'error': 'An account with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
