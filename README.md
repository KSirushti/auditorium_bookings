
# Auditorium Booking System

A full-stack Auditorium Booking System for college campuses where faculty and departments can request auditorium slots for events, and a PRO (Public Relations Officer) can approve or reject these requests. The system features color-coded calendar views, user login, and dynamic slot availability.

---

## Tech Stack

###  Frontend
- React.js
- Axios
- React Router
- React DatePicker

### Backend
- Django
- Django REST Framework
- MySQL

---

## Project Setup

### Backend (Django)
bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python manage.py runserver


> Ensure MySQL is running and the database is configured in settings.py.

---

### Frontend (React)
bash
cd frontend
npm install
npm start


---

## User Roles

- Faculty / Department Users:
  - User IDs: 1 to 5
  - Password: 1234*
  - Can submit, update, and delete booking requests

- PRO (Admin):
  - Username: admin
  - Password: admin
  - Can view, approve, and reject pending requests

---

## Features

###  Authentication
- Welcome page → Login
- Role-based login (PRO and regular user)
- Only PRO can access the dashboard

### Booking System
- Add Booking:
  - Select Department, Event Type, Date, and Slot
  - Automatically disables fully booked dates
  - Dynamically filters available slots (FD, FN, AN, ES)

- View Calendar:
  - Displays a monthly calendar
  - Color-coded slots:
    - Full Day → Green
    - FN, AN, ES → Unique colors
    - Pending → Orange
  - Only approved bookings shown

- Update Booking:
  - Select Month and Year → Show existing bookings
  - Choose booking ID to update
  - Sends new booking request to PRO

- Delete Booking:
  - Available only for PRO
  - View and delete approved bookings

### PRO Panel
- View pending requests
- Approve or Reject bookings
- Calendar updates instantly upon approval

---

## Backend Models

- Department
- User
- Booking

### Booking Status Flow

New Booking (Pending) → PRO Approval → Status: APPROVED


---

## Booking Rules

- Slots:
  - FN = Forenoon
  - AN = Afternoon
  - FD = Full Day (blocks FN + AN)
  - ES = Evening (can still be booked even if FD exists)

- Prevents:
  - Duplicate bookings on same date and slot
  - Booking FD if FN or AN already booked
  - Booking FN or AN if FD already booked

- Allows:
  - Evening slot booking even if FD is used

---

##  UI Highlights

- Responsive and clean design
- Custom CSS used (no Tailwind or Bootstrap)
- Role-based conditional rendering
- Consistent layout and flow

---


## Optional Enhancements

- Slot conflict prevention
- Color-coded calendar
- Department ID auto-fill
- Slot blocking based on current booking
- Email notifications (future)
- User-based booking history (future)

## Author
- Sirushti K

