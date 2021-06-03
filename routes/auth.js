const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const router = express.Router();

////////////////////////////////////
//             Routes             //
////////////////////////////////////
/*
Login Route:
    - Redirect user to Spotify's authorization page
    - Pass in client_id, redirect_uri, and response_type as query params
*/
router.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    })}`
  );
});
/*
Callback Route (for access & refresh tokens):
    - Access token: helps us get data back from API(search for tracks & use recommendations endpoint); we will put this into our session-cookie
    - Authorization header: Basic Auth using clientId & secret
    - Content-Type: Comes from Spotify Docs
*/
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const grant_type = "authorization_code";

  const basicHeader = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type,
      code,
      redirect_uri,
    }),
    {
      headers: {
        Authorization: `Basic ${basicHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  // data:
  console.log("data: ", { data });

  const sessionJWTObject = {
    token: data.access_token,
  };

  req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY);
  return res.redirect("/");
});
// Verification Route: verify jwt in session obj; if valid, send contents to client in req, otherwise send back 'false'
router.get("/current-session", (req, res) => {
  jwt.verify(
    req.session.jwt,
    process.env.JWT_SECRET_KEY,
    (err, decodedToken) => {
      if (err || !decodedToken) {
        res.send(false);
      } else {
        res.send(decodedToken);
      }
    }
  );
});
// Logout Route: destroy current jwt(end session)
router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect(`/`);
});

module.exports = router;
