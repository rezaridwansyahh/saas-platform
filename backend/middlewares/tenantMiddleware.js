module.exports = function tenantMiddleware(req, res, next) {
  const host = req.headers['x-host']; 
  if (!host) {
    return res.status(400).json({ message: 'Missing X-Host header' });
  }

  const subdomain = host.split('.')[0];
  req.tenant = subdomain;
  next();
};
