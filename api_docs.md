# API Documentation

## Endpoints
__Users__

- **POST /login**
- **POST /register**

__Products__

- **POST /products**
- **GET /products**
- **GET /products/:id**
- **PUT /products/:id**
- **DELETE /products/:id**

__Admins__

- **POST /users**
- **GET /users**
- **PUT /users/:id**
- **DELETE /users/:id**

## Schema
__Users__
```json
{
    "username": "string",
    "password": "string",
    "email": "string",
    "role": "string"
}
```
__Products__
```json
{
    "brand": "string",
    "model": "string",
    "storage": "string",
    "ram": "string",
    "screen_size": "string",
    "camera": "string",
    "battery": "Integer",
    "price": "Integer"
  }
```

# POST /register

_Information_

This endpoint is used to register a new user.

> ### **Request**

- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response: (201 - Created)

```json
{
  "message": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Username Fields can't be empty"
}
```

```json
{
  "message": "Email Fields can't be empty"
}
"OR"
{
  "message": "Invalid email format"
}
"OR"
{
  "message": "email already exists"
}
```

```json
{
  "message": "Password Fields cannot be empty"
}
```

---

# POST /login

__Information__

This endpoint is used for user authentication, providing an access token upon successful login.

> ### **Request**

- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "token": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Email Fields can't be empty"
}
"OR"
{
  "message": "Password Fields can't be empty"
}
"OR"
{
  "message": "Invalid Email/Password"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Email or Password is either wrong or not existed",
}
"OR"
{
 "message":"Email or Password is either wrong or not existed"
}
```

