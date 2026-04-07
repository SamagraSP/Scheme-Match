from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Policy(models.Model):
    categoryoptions=[
        ('agriculture', 'Agriculture'),
        ('education', 'Education'), 
        ('health', 'Health'),
        ('employment', 'Employment'),
        ('housing', 'Housing'),
        ('social welfare', 'Social Welfare'),
        ('technology', 'Technology'),
        ('environment', 'Environment'),
        ('transportation', 'Transportation'),
        ('energy', 'Energy'),
        ('finance', 'Finance'),
        ('other', 'Other')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=categoryoptions)
    region =models.CharField(max_length=100)
    annual_income_limit = models.IntegerField(default=0)
    tags = models.JSONField()
    last_date = models.DateTimeField()
    documents = models.JSONField(  
        blank=  False,  
        null = False,
    )
    link = models.URLField(max_length=200, default='')

    def __str__(self):
        return self.title
    
class UserProfile(models.Model):
    genderoptions=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ]
    categoryoptions=[
        ('gen','General'),
        ('obc','OBC'), 
        ('sc','SC'),
        ('st','ST')
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField() 
    gender = models.CharField(max_length=10, choices=genderoptions)
    occupation = models.CharField(max_length=100)
    income = models.IntegerField()
    location = models.CharField(max_length=100) 
    category = models.CharField(max_length=10, choices=categoryoptions)

    def __str__(self):
        return self.name
