const request = require("supertest"); //import supertest
const { expect } = require('chai'); //import chai
const urlBase = require('../globalVariable/baseUrl.js'); //get the url

const url = `${urlBase}`
const accessToken = process.env.GO_REST_ACCESS_TOKEN; //get access token

describe('API Test Positive from GraphQL', function () {

    let userId; //Define id that being made to be used in other method

    //Create user
    it('POST - Create user', async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .post("/public/v2/users")
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                "name":"Salma Hanifah",
                "email":"salmahanifah@yahoo.com",
                "gender":"female",
                "status":"active"
            });
        expect(response.status).to.equal(201);
        userId = response.body.id;
        console.log(response.body);
    });

    //User detail
    it("GET - User detail", async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .get(`/public/v2/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).to.equal(200);
        console.log(response.body);
    });

    //Update user detail
    it("PUT - Update user detail", async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .put(`/public/v2/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                "name":"Salma Hanifah edit"
            });
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal("Salma Hanifah edit");
        console.log(response.body);
    });

    //Delete user
    it("DELETE - Remove user", async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .delete(`/public/v2/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).to.equal(204);
        console.log(response.body);
    });
});
