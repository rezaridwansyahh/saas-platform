function tenantMiddleware(req, res, next) {
  const tenant = req.headers['x-tenant'];

  if (!tenant) {
    return res.status(400).json({ message: 'Tenant not specified in request.' });
  }

  req.tenant = tenant;
  next();
}
  
module.exports = tenantMiddleware;
