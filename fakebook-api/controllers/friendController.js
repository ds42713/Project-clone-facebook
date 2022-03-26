const { Op } = require('sequelize')
const { Friend, User } = require('../models')

const getUnknown = async (req, res, next) => {
    try {
        const friends = await Friend.findAll({
            where: {
                [Op.or]: [{ requestToId: req.user.id }, { requestFromId: req.user.id }]
            }
        });

        const friendIds = friends.reduce(
            (acc, item) => {
                if (req.user.id === item.requestFromId) {
                    acc.push(item.requestToId);
                } else {
                    acc.push(item.requestFromId);
                }
                return acc;
            },
            [req.user.id] // ไม่เอาตัวเอง
        );

        const users = await User.findAll({
            where: {
                id: {
                    [Op.notIn]: friendIds
                }
            }
        });
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
}

const requestFriend = async (req, res, next) => {
    try {
        const { requestToId } = req.body
        // WHERE (`requestFromId` = req.user.id AND `requestToId` = requestToId ) OR (`requestFromId` = requestToId AND `requestToId` = req.user.id ) เชคว่า ไม่แอดเพื่อนซ้ำ
        const existFriend = await Friend.findOne({
            where: {
                [Op.or]: [
                    {
                        requestFromId: req.user.id,
                        requestToId: requestToId
                    }, {
                        requestFromId: requestToId,
                        requestToId: req.user.id
                    }
                ]
            }
        })

        if (existFriend) {
            return res.status(400).json({ message: ' this friend has already been requested' })
        }
        await Friend.create({
            requestToId: requestToId,
            status: "REQUESTED",
            requestFromId: req.user.id,

        })
        res.status(200).json({ message: 'request has been sent' })

    } catch (err) {
        next(err)
    }
}

const updateFriend = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const friend = await Friend.findOne({
          where: {
            requestToId: req.user.id,
            requestFromId: friendId,
            status: 'REQUESTED'
          }
        });
    
        if (!friend) {
          return res.status(400).json({ message: 'this friend request not found' });
        }
    
        friend.status = 'ACCEPTED';
        await friend.save();
        res.status(200).json({ message: 'friend request accepted' });
    } catch (err) {
        next(err)
    }
}

const getAllFriends = async (req, res, next) => {
    try {
      const { status, searchName } = req.query;
      let where = {
        [Op.or]: [{ requestToId: req.user.id }, { requestFromId: req.user.id }]
      };
      if (status === 'ACCEPTED') {
        where = {
            status: status,
            [Op.or]: [{ requestToId: req.user.id }, { requestFromId: req.user.id }]
        };
      } else if (status === 'REQUESTED') {
        where = { status: status, requestToId: req.user.id };
      }
  
      // WHERE (`requestToId` = req.user.id OR `requestFromId` = req.user.id) AND `status` = 'ACCEPTED'
      const friends = await Friend.findAll({ where });
  
      const friendIds = friends.reduce((acc, item) => {
        if (req.user.id === item.requestFromId) {
          acc.push(item.requestToId);
        } else {
          acc.push(item.requestFromId);
        }
        return acc;
      }, []);
  
      let userWhere = {};
      if (searchName) {
        userWhere = {
          [Op.or]: [
            {
              firstName: {
                [Op.substring]: searchName
              }
            },
            {
              lastName: {
                [Op.substring]: searchName
              }
            }
          ]
        };
      }
      // SELECT * FROM user WHERE id IN (friendIds) AND (firstName LIKE '%searchName%' OR lastName LIKE '%searchName%')
      const users = await User.findAll({
        where: {
          id: friendIds,
          ...userWhere
        },
        attributes: {
          exclude: ['password']
        }
      });
      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
}
  

const deleteFriend = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const friend = await Friend.findOne({
          where: {
            [Op.or]: [
              { requestToId: req.user.id, requestFromId: friendId },
              { requestToId: friendId, requestFromId: req.user.id }
            ]
          }
        });
    
        if (!friend) {
          return res.status(400).json({ message: 'this friend request not found' });
        }
    
        await friend.destroy();
        res.status(204).json();

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getUnknown,
    requestFriend,
    updateFriend,
    getAllFriends,
    deleteFriend
}