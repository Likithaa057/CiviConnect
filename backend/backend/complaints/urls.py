from django.urls import path
from .views import (
    ComplaintListCreateView,
    ComplaintDetailView,
    ComplaintStatusUpdateView,
)

urlpatterns = [
    path('', ComplaintListCreateView.as_view()),
    path('<int:pk>/', ComplaintDetailView.as_view()),
    path('<int:pk>/status/', ComplaintStatusUpdateView.as_view()),
]