# Will Management System

## Overview
The Will Management System is designed to manage wills, payments, and user accounts efficiently. It provides a user-friendly interface for both users and administrators, ensuring a seamless experience in submitting and processing wills.

## Key Features

### User Features
- **Will Submission**: Users can submit their wills for processing.
- **Payments**: Users must make payments for their wills to be processed.
- **Profile Management**: Users can manage their profiles and view their submitted wills.

### Admin Features
- **Dashboard Overview**: Admins can view key metrics, such as activated users, wills submitted, and pending accounts.
- **Manage Pending Accounts**: Admins can approve or activate user accounts.
- **View Recent Wills**: Admins can view recently submitted wills.
- **Payment Management**: Admins can view payments, verify them, and send wills via email.
- **Download Wills**: Admins can download wills in Word format.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Project Structure
```
will-management-system
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   ├── app.js
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   └── package.json
├── README.md
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Future Enhancements
- **Payment Gateway Integration**: Integrate with a real payment gateway (e.g., Stripe, PayPal).
- **User Notifications**: Notify users via email or SMS when their will is processed.
- **Advanced Analytics**: Add charts and graphs to the admin dashboard for better insights.

## License
This project is licensed under the MIT License.