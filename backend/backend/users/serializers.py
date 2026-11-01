from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'phone']

    def validate_role(self, value):
        # Nobody can register themselves as admin
        if value == 'admin':
            raise serializers.ValidationError("You cannot register as admin.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)