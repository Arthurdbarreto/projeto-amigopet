const healthService = require('../services/healthService');

async function getHealth(req, res, next) {
  try {
    const data = healthService.getHealth();

    return res.status(200).json({
      success: true,
      data,
      message: 'API AmigoPet operacional',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getHealth };
