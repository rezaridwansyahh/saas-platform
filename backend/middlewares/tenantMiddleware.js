<<<<<<< HEAD
function tenantMiddleware(req, res, next) {
  const tenant = req.headers['x-tenant'];

  if (!tenant) {
    return res.status(400).json({ message: 'Tenant not specified in request.' });
  }

  req.tenant = tenant;
  next();
}
  
module.exports = tenantMiddleware;
=======
module.exports = function tenantMiddleware(req, res, next) {
  const host = req.headers['x-host']; 
  if (!host) {
    return res.status(400).json({ message: 'Missing X-Host header' });
  }

  const subdomain = host.split('.')[0];
  req.tenant = subdomain;
  next();
};
>>>>>>> 8cc8ba99f0ef209a62339534b09e4df54728ba11
