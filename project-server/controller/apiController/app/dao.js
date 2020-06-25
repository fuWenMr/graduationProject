const { App, User, User_app, Alarm } = require("../../../model");
const { sequelize } = require("../../../db/orm");
const { CountGroup } = require("../../../model");
const { Op } = require("sequelize");

const dao = {
  async createApp(owner, appName = "默认服务器", appInfo = "") {
    const app = await App.create({
      appName,
      appInfo,
      owner,
    });

    return app;
  },

  async findUsersOfApp(appId) {
    const users = await User_app.findAll({
      where: {
        appId,
      },
      include: [User]
    });
    return users;
  },

  async deleteAppUsers(appId, users) {
   
      await User_app.destroy({
        where: {
          appId,
          userName: users,
        },
      });

    return true;
  },

  async changeBoss(appId, owner, newOwner) {
    // 删除
    await User_app.destroy({
      where: {
        appId,
        userName: newOwner,
      },
    });
    // 新增
    await User_app.create({
      appId,
      userName: owner,
    });
    // 更换
    let app = await App.findByPk(appId);
    app.owner = newOwner;
    await app.save();
    return;
  },

  async findAppsByUserName(userName) {
    const apps = await App.findAll({
      where: {
        owner: userName,
      },
    });

    let joinApps = await User_app.findAll({
      where: {
        userName,
        active: [0],
      },
      include: [App],
    });

    joinApps = joinApps.map((t) => t.App);

    return apps.concat(joinApps);
  },

  async findAppsByOwner(owner) {
    const apps = await App.findAll({
      where: {
        owner,
      },
    });
    return apps;
  },

  async findAppById(appId) {
    const app = await App.findByPk(appId);
    return app;
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
  async isOwner(user, appId) {
    const app = await App.findByPk(appId);
    return app.owner === userName;
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

  async findMessage(userName) {
    const apps = await dao.findAppsByOwner(userName);
    let appIds = [];
    for (let i = 0; i < apps.length; i++) {
      appIds.push(apps[i].id);
    }
    const messages1 = await User_app.findAll({
      where: {
        appId: {
          [Op.in]: appIds,
        },
      },
      include: [App],
    });
    const messages2 = await dao.findUser_app(userName);
    return messages1.concat(messages2);
  },

  async findUser_app(userName, appId) {
    let where = { userName };
    if (appId) {
      where.appId = appId;
      return await User_app.findOne({ where });
    }
    return await User_app.findAll({
      where,
      include: [App],
    });
  },
  // 0 正常 1 等待申请 2 已同意 3 已拒绝 4已经退出
  async joinApp(userName, appId) {
    const user_app = await User_app.create({
      userName,
      appId,
    });

    return user_app;
  },
  async allowUserJoinApp(appId, userName) {
    await User_app.update(
      {
        active: 0,
      },
      {
        where: {
          appId,
          userName,
        },
      }
    );
  },
  async rejectUserJoinApp(userName, appId) {},
  async outApp(userName, appId) {},

  async getAlarm(appId) {
    const alarm = Alarm.findOrCreate({
      where: {
        appId
      }
    });
    return alarm;
  },

  async setAlarm(appId, values) {
    const alarm = await Alarm.findByPk(appId);
    console.log('==========================');
    alarm.values = values;
    await Alarm.update({
      values,
    },{
      where: {
        appId,
      }
    });
    return true;
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
