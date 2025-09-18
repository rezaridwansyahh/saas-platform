const sectorRoleAccess = require('../controllers/SectorRoleAccessController.js')

function checkSectorAccess(sectorName, requiredAccess) {
  return async (req, res, next) => {
    try {
      // Ensure user is authenticated (set by authToken middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Get data from JWT payload
      const { roleId, companyId } = req.user;
      
      if (!roleId || !companyId) {
        return res.status(403).json({
          success: false,
          message: 'Incomplete user data - missing roleId or companyId'
        });
      }
      next();

    } catch (error) {
      console.error('Sector access check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Access control error',
        error: error.message
      });
    }
  };
}

const sectorAccess = {
  //give sectorRoleAccess and validate the access
}

module.exports = {
  checkSectorAccess,
  sectorAccess
};