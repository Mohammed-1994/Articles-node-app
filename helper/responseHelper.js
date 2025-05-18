// helpers/responseHelper.js

const sendJsonResponse = (
  res,
  statusCode,
  message,
  data = null,
  error = null
) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    error,
  });
};

const sendSuccessResponse = (res, message, data = null, view = "") => {
  return res.status(200).render(view, {
    success: true,
    message,
    data,
    error: null,
  });
};
const sendServerError = (res, err) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).render("error", {
    success: false,
    message,
    error: err.stack || null,
  });
};

const sendNotFoundError = (res) => {
  return res.status(statusCode).render("error", {
    success: false,
    message: "Item Not Found",
    error: "Item Not Found",
  });
};
export default {
  sendSuccessResponse,
  sendNotFoundError,
  sendJsonResponse,
 sendServerError,
};
