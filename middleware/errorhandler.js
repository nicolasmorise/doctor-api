exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  res.status(500).json({
    status: 500,
    message: err.message || 'Internal Server Error'
  });
};
