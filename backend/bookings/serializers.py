from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

    def validate(self, data):
        # Only validate duplicate bookings if both 'date' and 'slot' are present (i.e., during creation)
        if self.instance is None and 'date' in data and 'slot' in data:
            if Booking.objects.filter(date=data['date'], slot=data['slot'], status='APPROVED').exists():
                raise serializers.ValidationError("Slot already booked for this date.")
        return data
