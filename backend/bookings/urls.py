# bookings/urls.py
from django.urls import path
from .views import BookingListCreateView, BookingDetailView, approved_bookings

urlpatterns = [
    path('bookings/', BookingListCreateView.as_view()),
    path('bookings/<int:booking_id>/', BookingDetailView.as_view()),  # This enables PATCH
path('api/approved-bookings/', approved_bookings, name='approved-bookings'),
]
