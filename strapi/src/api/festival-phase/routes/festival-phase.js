'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/festival-phase',
      handler: 'festival-phase.getPhase',
      config: {
        auth: false,
      },
    },
  ],
};

