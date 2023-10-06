// Middleware auth------
function CheckAuth(req, res, next) {
  const { token } = req.headers;
  if (token == null || token == undefined || !token) {
    return res.status(404).send({
      message: " Auth token is required, Please provide token to proceed",
    });
  }
  if (token == process.env.auth_key) {
    next(); //Token is valid, proceed to the CRUD APIs
  } else {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
}
module.exports = CheckAuth;
