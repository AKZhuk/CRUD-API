import http, { Server } from "http";
import { HTTPMethod, Messages, StatusCode, users } from "../src/constants";
import { requestListener } from "../src/requestListener";
import { getBody } from "../src/end-points/helpers";
import { User } from "types";
import { AddressInfo } from "net";

describe("User API Tests", () => {
  let server: Server;
  let baseUrl: string;
  let address: any;
  let userId: String;
  const requestOptions: http.RequestOptions = {
    hostname: "localhost",
    headers: {
      "Content-Type": "application/json",
    },
  };

  beforeAll((done) => {
    server = http.createServer(requestListener);
    server.listen(0, () => {
      address = server.address() as AddressInfo;
      baseUrl = `http://localhost:${address.port}`;
      requestOptions.port = address.port;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });
  describe("Example scenario", () => {
    const newUser = {
      username: "John Doe",
      age: 30,
      hobbies: ["Reading", "Running"],
    };

    it("should return an empty array when getting all records", (done) => {
      http.get(`${baseUrl}/users`, async (res) => {
        expect(res.statusCode).toBe(StatusCode.SuccessOK);

        const responseBody = await getBody(res);
        expect(responseBody).toEqual(users);
        done();
      });
    });

    it("should create a new record with a POST request", (done) => {
      const req = http.request(
        {
          ...requestOptions,
          path: "/users",
          method: HTTPMethod.POST,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.SuccessCreated);
          const responseBody = await getBody(res);
          expect(responseBody).toHaveProperty("id");
          userId = (responseBody as User).id;
          done();
        }
      );

      req.write(JSON.stringify(newUser));
      req.end();
    });

    it("should return user if it exist", (done) => {
      http.get(`${baseUrl}/users/${userId}`, async (res) => {
        expect(res.statusCode).toBe(StatusCode.SuccessOK);

        const responseBody = await getBody(res);
        expect(responseBody).toHaveProperty("id");
        const { id, ...user } = responseBody as User;
        expect(user).toEqual(newUser);
        done();
      });
    });

    it("should update an existing record with a PUT request", (done) => {
      const updatedUser = JSON.stringify({
        username: "Updated Name",
        age: 35,
        hobbies: ["Swimming", "Cooking"],
      });

      const req = http.request(
        {
          ...requestOptions,
          path: `/users/${userId}`,
          method: HTTPMethod.PUT,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.SuccessOK);

          const responseBody = (await getBody(res)) as User;
          expect(responseBody).toHaveProperty("id");
          expect(responseBody.username).toBe("Updated Name");
          expect(responseBody.age).toBe(35);
          expect(responseBody.hobbies).toEqual(["Swimming", "Cooking"]);
          done();
        }
      );

      req.write(updatedUser);
      req.end();
    });

    it("should delete an existing record with a DELETE request", (done) => {
      const req = http.request(
        {
          ...requestOptions,
          path: `/users/${userId}`,
          method: HTTPMethod.DELETE,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.NoContent);
          done();
        }
      );

      req.write("");
      req.end();
    });
  });

  describe("Server should answer with status code 400 and corresponding message if userId is invalid for", () => {
    let invalidUserId = "123";
    it("PUT request", (done) => {
      const updatedUser = JSON.stringify({
        username: "Updated Name",
        age: 35,
        hobbies: ["Swimming", "Cooking"],
      });

      const req = http.request(
        {
          ...requestOptions,
          path: `/users/${invalidUserId}`,
          method: HTTPMethod.PUT,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.BadRequest);

          const responseBody = (await getBody(res)) as User;
          expect(responseBody).toBe(Messages.InvalidId);
          done();
        }
      );

      req.write(updatedUser);
      req.end();
    });

    it("DELETE request", (done) => {
      const req = http.request(
        {
          ...requestOptions,
          path: `/users/${invalidUserId}`,
          method: HTTPMethod.DELETE,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.BadRequest);
          const responseBody = (await getBody(res)) as User;
          expect(responseBody).toBe(Messages.InvalidId);
          done();
        }
      );

      req.write("");
      req.end();
    });

    it("GET single user request", (done) => {
      http.get(`${baseUrl}/users/${invalidUserId}`, async (res) => {
        expect(res.statusCode).toBe(StatusCode.BadRequest);

        const responseBody = await getBody(res);
        expect(responseBody).toBe(Messages.InvalidId);
        done();
      });
    });
  });

  describe("Server should answer with status code 404 and corresponding message if userId does not exist", () => {
    let validUserId = "b8d32d98-f671-4aaf-b93e-78604643ae29";

    it("GET single user request", (done) => {
      http.get(`${baseUrl}/users/${validUserId}`, async (res) => {
        expect(res.statusCode).toBe(StatusCode.ClientErrorNotFound);

        const responseBody = await getBody(res);
        expect(responseBody).toBe(Messages.UserNotExist);
        done();
      });
    });

    it("PUT request", (done) => {
      const updatedUser = JSON.stringify({
        username: "Updated Name",
        age: 35,
        hobbies: ["Swimming", "Cooking"],
      });

      const req = http.request(
        {
          ...requestOptions,
          path: `/users/${validUserId}`,
          method: HTTPMethod.PUT,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.ClientErrorNotFound);

          const responseBody = (await getBody(res)) as User;
          expect(responseBody).toBe(Messages.UserNotExist);
          done();
        }
      );

      req.write(updatedUser);
      req.end();
    });

    it("DELETE request", (done) => {
      const req = http.request(
        {
          ...requestOptions,
          path: `/users/${validUserId}`,
          method: HTTPMethod.DELETE,
        },
        async (res) => {
          expect(res.statusCode).toBe(StatusCode.ClientErrorNotFound);
          const responseBody = (await getBody(res)) as User;
          expect(responseBody).toBe(Messages.UserNotExist);
          done();
        }
      );

      req.write("");
      req.end();
    });
  });
});
