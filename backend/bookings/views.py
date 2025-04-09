# views.py
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer

@api_view(['GET'])
def approved_bookings(request):
    bookings = Booking.objects.filter(status="APPROVED")
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'booking_id'  # or 'id' if you use id
