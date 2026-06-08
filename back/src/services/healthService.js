function getHealth() {
  return {
    service: 'AmigoPet API',
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}

module.exports = { getHealth };
