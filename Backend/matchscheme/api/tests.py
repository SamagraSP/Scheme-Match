from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import UserProfile


class AuthFlowTests(APITestCase):
    def test_register_creates_user_and_profile(self):
        payload = {
            'name': 'Ramesh Kumar',
            'email': 'ramesh@example.com',
            'password': 'StrongPass123',
            'age': 28,
            'gender': 'male',
            'location': 'Delhi',
            'category': 'obc',
            'occupation': 'Farmer',
            'income': 150000,
        }

        response = self.client.post('/api/auth/register/', payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='ramesh@example.com').exists())
        self.assertTrue(UserProfile.objects.filter(user__email='ramesh@example.com').exists())
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_returns_tokens_for_valid_user(self):
        user = User.objects.create_user(
            username='sita@example.com',
            email='sita@example.com',
            password='StrongPass123',
        )
        UserProfile.objects.create(
            user=user,
            name='Sita Devi',
            age=32,
            gender='female',
            location='Jaipur',
            category='gen',
            occupation='Teacher',
            income=220000,
        )

        response = self.client.post(
            '/api/auth/login/',
            {'email': 'sita@example.com', 'password': 'StrongPass123'},
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['name'], 'Sita Devi')
