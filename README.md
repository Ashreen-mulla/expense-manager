# Expense Manager API

A RESTful Expense Manager backend built with Spring Boot that enables users to securely manage expenses, categories, budgets, and spending analytics using JWT authentication.

---

## Features

- User Registration
- User Login with JWT Authentication
- Expense Management (CRUD)
- Category Management (CRUD)
- Budget Management (CRUD)
- Dashboard Analytics
- Monthly Spending Analytics
- Category-wise Spending Analytics
- Recent Expenses
- Biggest Expense
- Flyway Database Migrations
- Swagger API Documentation

---

## Tech Stack

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway
- Docker Compose
- Maven
- Lombok
- Swagger / OpenAPI

---

## Project Structure

```
src/main/java/com/expensemanager

├── analytics
├── auth
├── budget
├── category
├── common
├── config
├── expense
└── security
```

---

## API Modules

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |

---

### User

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/me |

---

### Expenses

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/expenses |
| POST | /api/v1/expenses |
| PUT | /api/v1/expenses/{id} |
| DELETE | /api/v1/expenses/{id} |

---

### Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/categories |
| POST | /api/v1/categories |
| PUT | /api/v1/categories/{id} |
| DELETE | /api/v1/categories/{id} |

---

### Budgets

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/budgets |
| POST | /api/v1/budgets |
| PUT | /api/v1/budgets/{id} |
| DELETE | /api/v1/budgets/{id} |

---

### Analytics

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/analytics/dashboard |
| GET | /api/v1/analytics/category-spending |
| GET | /api/v1/analytics/monthly-spending |
| GET | /api/v1/analytics/recent-expenses |
| GET | /api/v1/analytics/biggest-expense |

---

## Database

- PostgreSQL
- Managed using Flyway migrations
- Runs through Docker Compose

---

## Authentication

The API uses JWT authentication.

After login:

```
Authorization: Bearer <jwt-token>
```

must be included in all protected requests.

---

## Running the Project

### Clone

```bash
git clone https://github.com/Ashreen-mulla/expense-manager.git
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Run Application

```bash
./mvnw spring-boot:run
```

---

## Swagger Documentation

```
http://localhost:8080/swagger-ui/index.html
```

---

## Build

```bash
./mvnw clean package
```

---

## Author

Ashreen Mulla