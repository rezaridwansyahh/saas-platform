async function tenantMiddleware(req, res, next) {
  const tenant = req.headers['x-tenant'];

  try {
    if (!tenant) {
      return res.status(400).json({ message: 'Tenant not specified in request.' });
    }

    req.tenant = tenant;

    next();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = tenantMiddleware;