const request = require("supertest"); //import supertest
const { expect } = require('chai'); //import chai
const urlBase = require('../globalVariable/baseUrl.js'); //get the url

const url = `${urlBase}`
const accessToken = process.env.GO_REST_ACCESS_TOKEN; //get access token

describe('API Test Negative from GraphQL', function () {

    //Create user
    it('POST - Create User with Invalid Data', async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
        .post("/public/v2/users")
        .set('Authorization', `Bearer ${accessToken}`)
            .send({
                // Invalid data: missing required fields
            });
        expect(response.status).to.equal(422);
        console.log(response.body);
    });

    //User detail
    it("GET - Not existence id", async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .get(`/public/v2/users/9i99999`) //invalid id: not exist
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).to.equal(404);
        console.log(response.body);
    });

    //Update user detail
    it("PUT - Invalid field update", async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .put(`/public/v2/users/6901360`) 
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                "color":"Salma Hanifah edit" //invalid data: "color" is not exist
            });
        expect(response.status).to.equal(200);
        console.log(response);
    });

    //Delete user
    it("DELETE - Not existence id", async function () {
        if (!accessToken) {
            console.error("Access token is not provided.");
            throw new Error("Access token is not provided.");
        }

        const response = await request(url)
            .delete(`/public/v2/users/9i99999`) //invalid id: not exist
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).to.equal(404);
        console.log(response.body);
    });
});
