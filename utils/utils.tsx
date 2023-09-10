const getError = (err: {
  response: { data: { message: any } };
  message: any;
}) => {
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;
};
export { getError };
