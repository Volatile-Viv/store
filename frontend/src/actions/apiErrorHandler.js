const handleError = (error) => {
  if (error.response && error.response.data) {
    throw error.response.data;
  } else {
    throw error;
  }
};

export default handleError;
