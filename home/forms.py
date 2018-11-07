from django.contrib.auth.models import User
from django import forms

class UserForm(forms.ModelForm):
  email = forms.EmailField(max_length=200, help_text='Required')
  password = forms.CharField(widget=forms.PasswordInput)
  confirm_password = forms.CharField(widget=forms.PasswordInput())

  class Meta:
    model = User
    fields = ['username', 'email', 'password']