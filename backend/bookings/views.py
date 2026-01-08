# views.py
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer
from django.http import JsonResponse
import os

def health(request):
    return JsonResponse({
        "DB_NAME": os.environ.get("DB_NAME"),
        "DB_USER": os.environ.get("DB_USER"),
        "DB_HOST": os.environ.get("DB_HOST"),
        "SECRET_KEY_SET": bool(os.environ.get("SECRET_KEY")),
    })


@api_view(['GET'])
def approved_bookings(request):
    bookings = Booking.objects.filter(status="APPROVED")
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)
from django.http import JsonResponse
import os

def health(request):
    return JsonResponse({
        "DB_NAME": os.environ.get("DB_NAME"),
        "DB_USER": os.environ.get("DB_USER"),
        "DB_HOST": os.environ.get("DB_HOST"),
        "SECRET_KEY_SET": bool(os.environ.get("SECRET_KEY")),
    })

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'booking_id'  # or 'id' if you use id
