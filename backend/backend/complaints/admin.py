from django.contrib import admin
from .models import Complaint


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'user', 'created_at')
    list_filter = ('status', 'category')