# Student Team Members Management System

A full-stack web application for managing team members with features like adding, viewing, and updating team member information.

## Features

- Add new team members with profile images
- View all team members in a grid layout
- View detailed information of individual members
- Delete team members
- Modern and responsive UI
- File upload support for profile images
- Email validation and duplicate checking

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express
- Database: MongoDB
- Styling: CSS
- File Upload: Multer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bit_happens.git
cd bit_happens
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory:
```
MONGO_URI=mongodb://127.0.0.1:27017/bit_happens
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- GET `/api/members` - Get all members
- GET `/api/members/:id` - Get a specific member
- POST `/api/members` - Add a new member
- PATCH `/api/members/:id` - Update a member
- DELETE `/api/members/:id` - Delete a member

## Project Structure

```
bit_happens/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   ├── .gitignore
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details