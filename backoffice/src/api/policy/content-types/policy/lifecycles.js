const {generateCustomUuid} = require('custom-uuid');
module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if(!data.Number){
      data.Number = "POL-" + generateCustomUuid("1234567890", 8);
    }

  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if(!data.Number){
      data.Number = "POL-" + generateCustomUuid("1234567890", 8);
    }

  },
};
