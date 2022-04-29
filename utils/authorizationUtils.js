
exports.extractApiKey = (req) => {
  const apiKey = req.headers['x-api-key'];
  return apiKey;
};
