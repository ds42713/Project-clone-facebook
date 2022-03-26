const { Op } = require('sequelize')
const { Comment, Post,  Friend, User } = require('../models')

const createComment = async (req,res,next) => {
    try{
        const { title, postId } = req.body
        
        const post = await Post.findOne({where:{ id: postId}})
        if(!post){
            return res.status(404).json({message: 'post not found'})
        }
        let canComment = req.user.id === post.userId // เชค user ว่าเป็นคนโพสไหม

        if (!canComment) {
        // WHERE status = 'ACCEPTED' AND (requestToId = req.user.id AND requestFromId = post.userId OR requestToId = post.userId AND requestFromId = req.user.id )
            const friend = await Friend.findOne({
                where:  {
                    status: 'ACCEPTED',
                    [Op.or]: [
                        {
                            requestToId: req.user.id,
                            requestFromId: post.userId
                        },{
                            requestToId: post.userId,
                            requestFromId: req.user.id
                        }
                    ] 
                }
            })
            if (!friend) { 
                return res.status(403).json({message: 'can not comment this post'})
            }
        }

        
        const newComment = await Comment.create({
            title: title,
            postId: postId,
            userId: req.user.id
        })

        const comment = await Comment.findOne({
            where: { id : newComment.id } ,
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'profileImg']
            }
        })

        res.status(201).json({ comment })

    } catch(err){
        next(err)
    }
}

const deleteComment = async (req,res,next) => {
    try{
        const { id } = req.params
        const comment = await Comment.findOne( {where: { id: id }})

        if(!comment) {
            return res.status(400).json({message: 'comment not found'})
        }

        if(req.user.id !== comment.userId){
            return res.status(403).json({message: 'can not delete this comment'})
        }

        await comment.destory()
        res.status(204).json()


    } catch(err){
        next(err)
    }
}


module.exports = {
    createComment,
    deleteComment
}