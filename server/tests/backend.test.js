import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import protect from "../middlewares/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import { getPublicResumeById } from "../controllers/resumeController.js";
import Resume from "../models/Resume.js";
import User from "../models/User.js";

const createMockResponse = () => ({
  statusCode: 200,
  jsonBody: null,
  textBody: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(body) {
    this.jsonBody = body;
    return this;
  },
  send(body) {
    this.textBody = body;
    return this;
  },
});

test("protect returns 401 when authorization header is missing", async () => {
  const req = { headers: {} };
  const res = createMockResponse();
  let nextCalled = false;

  await protect(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.jsonBody.message, "Not authorized");
});

test("protect accepts a valid bearer token and attaches userId", async () => {
  process.env.JWT_SECRET = "test-secret";
  const token = jwt.sign({ userId: "user-123" }, process.env.JWT_SECRET);
  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = createMockResponse();
  let nextCalled = false;

  await protect(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.userId, "user-123");
});

test("registerUser rejects weak passwords", async () => {
  const req = {
    body: {
      name: "Sahil",
      email: "sahil@example.com",
      password: "weakpass",
    },
  };
  const res = createMockResponse();

  await registerUser(req, res);

  assert.equal(res.statusCode, 400);
  assert.match(
    res.jsonBody.message,
    /Password must be at least 8 characters/i
  );
});

test("loginUser returns invalid credentials for unknown users", async () => {
  const originalFindOne = User.findOne;
  User.findOne = async () => null;

  try {
    const req = {
      body: {
        email: "missing@example.com",
        password: "Strong@123",
      },
    };
    const res = createMockResponse();

    await loginUser(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.jsonBody.message, "Invalid email or password");
  } finally {
    User.findOne = originalFindOne;
  }
});

test("getPublicResumeById returns 404 when the resume does not exist", async () => {
  const originalFindOne = Resume.findOne;
  Resume.findOne = async () => null;

  try {
    const req = {
      params: {
        resumeId: "resume-404",
      },
    };
    const res = createMockResponse();

    await getPublicResumeById(req, res);

    assert.equal(res.statusCode, 404);
    assert.equal(res.jsonBody.message, "Resume not found");
  } finally {
    Resume.findOne = originalFindOne;
  }
});

test("getPublicResumeById returns a public resume when found", async () => {
  const originalFindOne = Resume.findOne;
  Resume.findOne = async () => ({
    _id: "resume-123",
    title: "Public Resume",
    public: true,
  });

  try {
    const req = {
      params: {
        resumeId: "resume-123",
      },
    };
    const res = createMockResponse();

    await getPublicResumeById(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonBody.resume.title, "Public Resume");
    assert.equal(res.jsonBody.resume.public, true);
  } finally {
    Resume.findOne = originalFindOne;
  }
});
