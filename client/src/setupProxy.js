const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(proxy(`/auth/*`, { target: "http://localhost:8080" }));
};
/*
Proxy: 
    - Easily req. backend to check if logged in
*/
