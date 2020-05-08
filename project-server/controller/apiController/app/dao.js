const { App } = require("../../../model");
const { sequelize } = require("../../../db/orm");
const { CountGroup } = require("../../../model");

const dao = {
  async createApp(owner, appName = "默认服务器", appInfo = "") {
    const app = await App.create({
      appName,
      appInfo,
      owner,
    });

    return app;
  },

  async findAppsByUserName(owner) {
    const apps = await App.findAll({
      where: {
        owner,
      },
    });

    return apps;
  },

  async bindUrlOfApp(appid, userName, bindUrl) {
    const updateNum = await App.update(
      { bindUrl },
      {
        where: {
          id: appid,
          owner: userName,
        },
      }
    );

    return updateNum > 0 ? true : false;
  },

  async delApp(userName, appid) {
    const delNum = await App.destroy({
      where: {
        owner: userName,
        id: appid,
      },
    });
    return delNum > 0 ? true : false;
  },

  async getCountGroups(appId) {
    const countGroups = await CountGroup.findAll({
      where: {
        appId,
      },
    });
    // console.log('不可能没挖到吧',countGroups);
    return countGroups;
  },

  changeCountGroups: async (appId, changes) => {
    // const { type, groupKey, items } = changes[0];
    // await CountGroup.create({
    //             items,
    //             appId,
    //             groupKey,
    //           });

    try {
      await sequelize.transaction(async (transaction) => {
        for (let change of changes) {
          const { type, groupKey, items } = change;
          if (type === "del") {
            await CountGroup.destroy({
              where: {
                appId,
                groupKey,
              },
              transaction,
            });
          } else if (type === "add") {
            await CountGroup.create(
              {
                items,
                appId,
                groupKey,
              },
              {
                transaction,
              }
            );
          } else if (type === "change") {
            await CountGroup.update(
              { items },
              {
                where: {
                  appId,
                  groupKey,
                },
                transaction,
              }
            );
          }
        }
      });

      const countGroups = await this.getCountGroups(appId);

      return countGroups;
    } catch (error) {
      return false;
    }
  },
};

module.exports = dao;
