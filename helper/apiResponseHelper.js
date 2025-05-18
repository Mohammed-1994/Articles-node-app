const sendSuccessResponse = (res, message, data = null) => {
  return res.status(res.statusCode).json({
    success: true,
    message,
    data,
    error: null,
  });
};
const sendNotFoundResponse = (res) => {
  return res.status(404).json({
    success: false,
    message: "Item Not Found",
    data: null,
    error: res.error,
  });
};

const sendServerError = (res) => {
  return res.status(500).json({
    success: false,
    message: "Server Error",
    data: null,
    error: res.error,
  });
};

const sendErrorResponse = (res, message, statusCode, error) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
    error: error,
  });
};

export default {
  sendErrorResponse,
  sendNotFoundResponse,
  sendServerError,
  sendSuccessResponse,
};
