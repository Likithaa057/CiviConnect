from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Complaint
from .serializers import ComplaintSerializer


class ComplaintListCreateView(generics.ListCreateAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Admin, NGO and workers see all complaints; citizens see only their own
        if user.role in ('admin', 'ngo', 'worker'):
            return Complaint.objects.all().order_by('-created_at')
        return Complaint.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ComplaintDetailView(generics.RetrieveAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]


class ComplaintStatusUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        # Only admin, worker and NGO can change status
        if request.user.role not in ('admin', 'worker', 'ngo'):
            return Response(
                {'error': 'You do not have permission to update status.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        complaint = get_object_or_404(Complaint, pk=pk)
        new_status = request.data.get('status')

        if new_status not in dict(Complaint.STATUS_CHOICES):
            return Response(
                {
                    'error': 'Invalid status.',
                    'allowed': list(dict(Complaint.STATUS_CHOICES).keys()),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        complaint.status = new_status
        complaint.save()
        return Response(ComplaintSerializer(complaint).data)