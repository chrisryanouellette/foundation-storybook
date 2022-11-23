const middleware = (router) => {
  /** This request can be used to disable image loading */
  router.get("/placeholder/*", (req, res, next) => {
    const url = new URL(
      req.path.replace("/placeholder", ""),
      "https://via.placeholder.com"
    );
    if (req.query.disable === "true") {
      return res.status(404).end();
    }
    return res.redirect(url.href);
  });
};

module.exports = middleware;
