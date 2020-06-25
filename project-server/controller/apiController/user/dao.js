const { User } = require("../../../model");

const dao = {
  async findUserByAccount(userName, password) {
    const user = await User.findOne({
      where: { userName, password },
    });
    return user;
  },

  async activeUser(activeKey) {
    const count = await User.update(
      { activeKey: 0 },
      {
        where: {
          activeKey,
        },
      }
    );

    return count > 0 ? true : false;
  },

  async resetUser(userName, password) {
    const count = await User.update(
      { activeKey: 0, password },
      {
        where: {
          userName,
        },
      }
    );
    return count > 0 ? true : false;
  },

  async hasUserRegisted(userName) {
    const user = await User.findByPk(userName);
    return user;
  },

  async registerNewUser(userName, password, ali) {
    const user = await User.create({
      userName,
      password,
      ali,
    });

    return user;
  },
};

module.exports = dao;
