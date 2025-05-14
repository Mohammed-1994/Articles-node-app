function sendResponse(
  res,
  statusCode,
  status,
  message,
  data = null,
  error = null,
  pagination
) {
  const response = {
    status,
    message,
    data,
    error,
    pagination
  };

  if (status === "success") delete res.error;

  if (status === "error") delete res.data;

  return res.status(statusCode).json(response);
}

module.exports = sendResponse;
