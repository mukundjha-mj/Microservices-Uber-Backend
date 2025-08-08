# 🚗 Uber-like Microservices Backend

A comprehensive microservices-based backend system for a ride-sharing application similar to Uber, built with Node.js, Express, MongoDB, and RabbitMQ.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)

## 📋 Table of Contents

- [🏗️ Architecture Overview](#️-architecture-overview)
- [🔧 Services](#-services)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔗 API Endpoints](#-api-endpoints)
- [🔒 Authentication](#-authentication)
- [📡 Inter-Service Communication](#-inter-service-communication)
- [🗄️ Database Schema](#️-database-schema)
- [🛠️ Technologies Used](#️-technologies-used)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🔄 Running the Services](#-running-the-services)
- [🧪 Testing](#-testing)
- [📖 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)

## 🏗️ Architecture Overview

This project follows a microservices architecture pattern with the following components:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Gateway   │    │    User     │    │   Captain   │    │    Ride     │
│  Service    │    │  Service    │    │  Service    │    │  Service    │
│             │    │             │    │             │    │             │
│ Port: 3000  │    │ Port: 3001  │    │ Port: 3002  │    │ Port: 3003  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                    │                    │                    │
       └────────────────────┼────────────────────┼────────────────────┘
                            │                    │
                   ┌─────────────┐    ┌─────────────┐
                   │   MongoDB   │    │  RabbitMQ   │
                   │  Database   │    │   Message   │
                   │             │    │   Broker    │
                   └─────────────┘    └─────────────┘
```

## 🔧 Services

### 🌐 Gateway Service (Port: 3000)
- **Purpose**: API Gateway and request routing
- **Responsibilities**: 
  - Routes requests to appropriate microservices
  - Central entry point for all client requests
  - Load balancing and request forwarding

### 👤 User Service (Port: 3001)
- **Purpose**: User management and authentication
- **Responsibilities**:
  - User registration and login
  - User profile management
  - Authentication and authorization
  - User ride history

### 🚗 Captain Service (Port: 3002)
- **Purpose**: Driver/Captain management
- **Responsibilities**:
  - Captain registration and login
  - Captain profile management
  - Availability status management
  - Ride assignment handling

### 🛣️ Ride Service (Port: 3003)
- **Purpose**: Ride management and coordination
- **Responsibilities**:
  - Ride creation and management
  - Matching users with captains
  - Ride status tracking
  - Real-time ride updates

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- RabbitMQ
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/mukundjha-mj/Microservices-Uber-Backend.git
   cd Microservices-Uber-Backend
   ```

2. **Install dependencies for all services**
   ```bash
   # Install gateway dependencies
   cd gateway && npm install

   # Install user service dependencies
   cd ../user && npm install

   # Install captain service dependencies
   cd ../captain && npm install

   # Install ride service dependencies
   cd ../ride && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env files in each service directory
   # See Configuration section for required variables
   ```

4. **Start all services**
   ```bash
   # Start services in separate terminals
   # Gateway Service
   cd gateway && npm start

   # User Service
   cd user && npm start

   # Captain Service
   cd captain && npm start

   # Ride Service
   cd ride && npm start
   ```

## 📁 Project Structure

```
microservices-uber-backend/
├── 📂 gateway/                  # API Gateway Service
│   ├── 📄 app.js               # Express app configuration
│   └── 📄 package.json         # Dependencies and scripts
│
├── 📂 user/                    # User Management Service
│   ├── 📄 app.js               # Express app configuration
│   ├── 📄 server.js            # Server startup
│   ├── 📂 controllers/         # Request handlers
│   │   └── 📄 user.controller.js
│   ├── 📂 db/                  # Database configuration
│   │   └── 📄 db.js
│   ├── 📂 middleware/          # Authentication middleware
│   │   └── 📄 authMiddleware.js
│   ├── 📂 models/              # Database models
│   │   ├── 📄 user.model.js
│   │   └── 📄 blacklisttoken.model.js
│   ├── 📂 routes/              # API routes
│   │   └── 📄 user.routes.js
│   ├── 📂 service/             # External services
│   │   └── 📄 rabbit.js
│   └── 📄 package.json
│
├── 📂 captain/                 # Captain Management Service
│   ├── 📄 app.js
│   ├── 📄 server.js
│   ├── 📂 controllers/
│   │   └── 📄 captain.controller.js
│   ├── 📂 db/
│   │   └── 📄 db.js
│   ├── 📂 middleware/
│   │   └── 📄 authMiddleware.js
│   ├── 📂 models/
│   │   ├── 📄 captain.model.js
│   │   └── 📄 blacklisttoken.model.js
│   ├── 📂 routes/
│   │   └── 📄 captain.routes.js
│   ├── 📂 service/
│   │   └── 📄 rabbit.js
│   └── 📄 package.json
│
├── 📂 ride/                    # Ride Management Service
│   ├── 📄 app.js
│   ├── 📄 server.js
│   ├── 📂 controller/
│   │   └── 📄 ride.controller.js
│   ├── 📂 db/
│   │   └── 📄 db.js
│   ├── 📂 middleware/
│   │   └── 📄 auth.middleware.js
│   ├── 📂 models/
│   │   └── 📄 ride.model.js
│   ├── 📂 routes/
│   │   └── 📄 ride.routes.js
│   ├── 📂 service/
│   │   └── 📄 rabbit.js
│   └── 📄 package.json
│
├── 📄 .gitignore              # Git ignore rules
└── 📄 README.md               # Project documentation
```

## 🔗 API Endpoints

### Gateway Service (http://localhost:3000)

All requests are routed through the gateway:

- `/user/*` → User Service (Port 3001)
- `/captain/*` → Captain Service (Port 3002)
- `/ride/*` → Ride Service (Port 3003)

### User Service Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/register` | Register new user | ❌ |
| POST | `/user/login` | User login | ❌ |
| GET | `/user/logout` | User logout | ❌ |
| GET | `/user/profile` | Get user profile | ✅ |
| GET | `/user/accepted-ride` | Get accepted rides | ✅ |

### Captain Service Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/captain/register` | Register new captain | ❌ |
| POST | `/captain/login` | Captain login | ❌ |
| GET | `/captain/logout` | Captain logout | ❌ |
| GET | `/captain/profile` | Get captain profile | ✅ |
| PATCH | `/captain/toggle-availability` | Toggle availability | ✅ |
| GET | `/captain/new-ride` | Wait for new ride | ✅ |

### Ride Service Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/ride/create-ride` | Create new ride | ✅ (User) |
| PUT | `/ride/accept-ride` | Accept ride | ✅ (Captain) |

## 🔒 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

- **User Authentication**: Required for user-specific operations
- **Captain Authentication**: Required for captain-specific operations
- **Token Blacklisting**: Implemented for secure logout functionality
- **Middleware Protection**: Routes are protected using custom authentication middleware

## 📡 Inter-Service Communication

### RabbitMQ Message Broker

Services communicate asynchronously using RabbitMQ:

- **Queue Management**: Each service can publish and subscribe to queues
- **Event-Driven Architecture**: Real-time updates between services
- **Decoupled Communication**: Services remain independent and scalable

### HTTP Communication

- **API Gateway Pattern**: All external requests go through the gateway
- **Service-to-Service**: Direct HTTP calls when synchronous communication is needed

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (required, hidden)
}
```

### Captain Model
```javascript
{
  // Similar to User with additional captain-specific fields
  name: String (required),
  email: String (unique, required),
  password: String (required, hidden),
  // Additional captain fields...
}
```

### Ride Model
```javascript
{
  captain: ObjectId (ref: Captain),
  user: ObjectId (ref: User, required),
  pickup: String (required),
  destination: String (required),
  status: String (enum: ['requested', 'accepted', 'started', 'completed']),
  timestamps: true
}
```

### Blacklist Token Model
```javascript
{
  token: String (required),
  createdAt: Date (with TTL)
}
```

## 🛠️ Technologies Used

### Backend Framework
- **Node.js**: Runtime environment
- **Express.js**: Web framework

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Message Broker
- **RabbitMQ**: Message queuing system
- **amqplib**: RabbitMQ client library

### Authentication & Security
- **JWT**: JSON Web Tokens
- **bcrypt**: Password hashing
- **Cookie Parser**: Cookie handling

### Development Tools
- **Morgan**: HTTP request logger
- **dotenv**: Environment variable management
- **Nodemon**: Development server

### HTTP & Networking
- **express-http-proxy**: API Gateway proxy
- **axios**: HTTP client (in ride service)

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mukundjha-mj/Microservices-Uber-Backend.git
cd Microservices-Uber-Backend
```

### 2. Install Dependencies for Each Service

```bash
# Gateway Service
cd gateway
npm install

# User Service
cd ../user
npm install

# Captain Service
cd ../captain
npm install

# Ride Service
cd ../ride
npm install
```

## ⚙️ Configuration

Create `.env` files in each service directory with the following variables:

### User, Captain, and Ride Services
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/uber-microservices

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# RabbitMQ Configuration
RABBIT_URL=amqp://localhost:5672

# Service Port (adjust per service)
PORT=3001  # 3001 for user, 3002 for captain, 3003 for ride
```

### Gateway Service
```env
# Gateway Port
PORT=3000

# Service URLs
USER_SERVICE_URL=http://localhost:3001
CAPTAIN_SERVICE_URL=http://localhost:3002
RIDE_SERVICE_URL=http://localhost:3003
```

## 🔄 Running the Services

### Development Mode

Run each service in a separate terminal:

```bash
# Terminal 1 - Gateway Service
cd gateway
npm start

# Terminal 2 - User Service
cd user
npx nodemon server.js

# Terminal 3 - Captain Service
cd captain
npx nodemon server.js

# Terminal 4 - Ride Service
cd ride
npx nodemon server.js
```

### Production Mode

```bash
# Start all services using PM2 or similar process manager
pm2 start ecosystem.config.js
```

## 🧪 Testing

### API Testing with Postman/Curl

#### Register a User
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create a Ride
```bash
curl -X POST http://localhost:3000/ride/create-ride \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "pickup": "Airport",
    "destination": "Downtown"
  }'
```

## 📖 API Documentation

### Response Format

All API responses follow a consistent format:

#### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    // Additional error details
  }
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and patterns
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all services start without errors

### Code Style

- Use consistent indentation (2 spaces)
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add comments for complex logic

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Mukund Jha**
- GitHub: [@mukundjha-mj](https://github.com/mukundjha-mj)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the robust database solution
- RabbitMQ team for the reliable message broker
- Node.js community for the amazing ecosystem

---

**Happy Coding! 🚀**

For any questions or issues, please open an issue on GitHub or contact the maintainers.
