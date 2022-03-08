import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  // Successful Cases
  test("should respond with a 200 status code for correct city name", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "utrecht" });
    expect(response.statusCode).toBe(200);
  });
  test("should specify json in the content type header", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "utrecht" });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("with a valid city name it should respond result", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "leiden" });
    expect(response.body.weatherText).toBeDefined();
  });

  // Error Cases
  test("should respond with a 400 status code if empty object send", async () => {
    const response = await request.post("/weather").send({});
    expect(response.statusCode).toBe(400);
  });
  test("should respond with a 400 status code for not found city name", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "xyxyxy" });
    expect(response.statusCode).toBe(400);
  });
});
