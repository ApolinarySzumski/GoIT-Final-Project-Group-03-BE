// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";

// my modules
import subscribeNewsletter from "../controller/others.js";

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});


/**
 * @openapi
 * '/subscribe':
 *  post:
 *   tags:
 *   - User
 *   summary: Subscribe
 *   responses:
 *      200:
 *        description: Success, Email sent successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubscribeInput'
 *      400:
 *        description: Wrong email or you already subscribe to our newsletter
 *      500:
 *        description: Could not send email
 */
route.post("/subscribe", authorization, subscribeNewsletter);

export default route;
