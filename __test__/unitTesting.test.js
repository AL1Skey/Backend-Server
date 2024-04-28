const request = require("supertest");
const app = require("../app");
const { User } = require("../models/index");
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "adam1",
      password: "adam1",
      email: "adam1@mail.com",
      role: "user",
    });

    const token = signToken(user.id);
  } catch (error) {
    console.log(error);
  }
});

describe("POST /register", () => {
  // Success Register
  test("Register on Success", async () => {
    const dummy = {
      username: "adam2",
      password: "adam2",
      email: "adam2@mail.com",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "User created");

    expect(response.body.message).not.toHaveProperty(
      "password",
      dummy.password
    );
    expect(response.body.message).not.toHaveProperty(
      "username",
      dummy.username
    );
    expect(response.body.message).not.toHaveProperty("email", dummy.email);
  });

  test("Throw Error Email is Not on Right Format", async () => {
    const dummy = {
      username: "adam2",
      password: "adam2",
      email: "adam29mail.com",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email format");
  });

  test("Throw Error Email Null", async () => {
    const dummy = {
      username: "adam2",
      password: "adam2",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email can't be empty");
  });

  test("Throw Error Password Null", async () => {
    const dummy = {
      username: "adam2",
      email: "adam2@mail.com",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password can't be empty");
  });

  test("Throw Error Username Null", async () => {
    const dummy = {
      password: "adam2",
      email: "adam2@mail.com",
      role: "user",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Username can't be empty");
  });

  test("Throw Error Username Email Null", async () => {
    const dummy = {
      password: "adam2",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Username Email can't be empty"
    );
  });

  test("Throw Error Email Password Null", async () => {
    const dummy = {
      username: "adam2",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email Password can't be empty"
    );
  });

  test("Throw Error Username Password Null", async () => {
    const dummy = {
      email: "adam2@mail.com",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Username Password can't be empty"
    );
  });

  describe("POST /login", () => {
    test("Login on Success", async () => {
      const dummy = {
        email: "adam2@mail.com",
        password: "adam2",
      };

      response = await request(app).post("/login").send(dummy);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "access_token",
        response.body.access_token
      );
    });

    test("Throw Error Email Null", async () => {
      const dummy = {
        password: "adam2",
      };

      response = await request(app).post("/login").send(dummy);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Email can't be empty");
    });

    test("Throw Error Password Null", async () => {
      const dummy = {
        email: "adam2@mail.com",
      };

      response = await request(app).post("/login").send(dummy);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Password can't be empty"
      );
    });

    test("Throw Error Email Not Found", async () => {
      const dummy = {
        email: "trailer@mail.com",
        password: "adam2",
      };

      response = await request(app).post("/login").send(dummy);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Email or Password is either wrong or not existed"
      );
    });

    test("Throw Error Password is Wrong", async () => {
      const dummy = {
        email: "adam2@mail.com",
        password: "adam2@mail.com",
      };

      response = await request(app).post("/login").send(dummy);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Email or Password is either wrong or not existed"
      );
    });

    test("Throw Error Email are not on Right Format", async () => {
      const dummy = {
        email: "adam2.lol.mail.com",
        password: "adam2",
      };

      response = await request(app).post("/login").send(dummy);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email format");
    });
  });

  afterAll(async () => {
    try {
      await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    } catch (error) {
      console.log(error);
    }
  });
});