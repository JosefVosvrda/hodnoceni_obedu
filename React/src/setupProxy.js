const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/login",
    createProxyMiddleware({
      target: "http://s-scrum-c4a-1.dev.spsejecna.net",
      changeOrigin: true,
    })
  );
};
