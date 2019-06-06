const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("../API/server.js");

describe("User Functions", () => {
    
    describe("GET /users", () => {
        it("returns a status code 200, successful request", () => {
            return request(server)
            .get("/users")
            .expect(200)
        });

        it("Should return JSON", done => {
            return request(server)
            .get("/users")
            .then(res => {
                expect(res.type).toBe("application/json");
                done();
            });
        });
    });

    describe("GET /users/:id", () => {
        it("returns a status code 200, successful request", async () => {
            const expected = await request(server).get("/users/1")
            expect(expected.status).toBe(200)
        });

        it("returns a status code 404, invalid user does not exist", async () => {
            const expected = await request(server).get("/users/999")
            expect(expected.status).toBe(404)
        });

        it("should return JSON", done => {
            return request(server)
            .get("/users/1")
            .then(res => {
                expect(res.type).toBe("application/json")
                done()
            });
        });
    });

    describe("GET /users/:id/posts", () => {
        it("returns a status code 200, successful when user has posts", async () => {
            const expected = await request(server).get("/users/1/posts")
            expect(expected.status).toBe(200)
        });
      
        it("returns a status code 404, invalid when user has no posts", async () => {
            const expected = await request(server).get("/users/500/posts")
            expect(expected.status).toBe(404)
        });
      });

});
