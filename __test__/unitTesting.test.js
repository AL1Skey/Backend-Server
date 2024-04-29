const request = require("supertest");
const app = require("../app");
const { User,Product } = require("../models/index");
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
  try {
    const user = await User.bulkCreate([{
      username: "adam1",
      password: "adam1",
      email: "adam1@mail.com",
      role: "user",
    },
    {
      username: "admin_user",
      password: "admin_password",
      email: "admin@example.com",
      role: "admin"
    }]);

    const product = await Product.bulkCreate([{
      "brand": "Xiaomi",
      "model": "Redmi Note 10 Pro",
      "storage": "128 GB",
      "ram": "6 GB",
      "screen_size": "6.67",
      "camera": "64 + 8 + 5 + 2",
      "battery": 5020,
      "price": 279
    },
    {
      "brand": "Google",
      "model": "Pixel 6",
      "storage": "128 GB",
      "ram": "8 GB",
      "screen_size": "6.4",
      "camera": "50 + 12.2",
      "battery": 4614,
      "price": 799
    }])

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
    expect(response.body).toHaveProperty("message", "Email Fields can't be empty");
  });

  test("Throw Error Password Null", async () => {
    const dummy = {
      username: "adam2",
      email: "adam2@mail.com",
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password Fields can't be empty");
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
    expect(response.body).toHaveProperty("message", "Username Fields can't be empty");
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
      "Username Email Fields can't be empty"
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
      "Email Password Fields can't be empty"
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
      "Username Password Fields can't be empty"
    );
  });

  test("Throw Error Fields Null", async () => {
    const dummy = {
    };

    const response = await request(app).post("/register").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Fields can't be empty"
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
      expect(response.body).toHaveProperty("message", "Email Fields can't be empty");
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
        "Password Fields can't be empty"
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
});

describe("POST /product",()=>{
  test('Create Product Success',async ()=>{
    const dummy = {
      brand: "Oppo",
      model: "Reno3",
      storage: "128",
      ram: "8",
      screen_size: "6.4",
      camera: "48+13+8+2",
      battery: 4025,
      price: 429
    }
    const response =  await request(app)
    .post('/products')
    .send(dummy);
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message","Product Created")
  })
  
})

afterAll(async () => {
  try {
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});
