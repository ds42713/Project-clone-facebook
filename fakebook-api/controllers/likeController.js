const { Like, Post } = require('../models')

const createLike = async (req,res,next) => {
    
    try{
        const { postId } = req.body
        
        const post = await Post.findOne({where:{ id: postId}})
        if(!post){
            return res.status(404).json({message: 'post not found'})
        }

        const like = await Like.fineOne({ where: {
            postId: postId, 
            userId: req.user.id
        }})

        if(like) {
            return res.status(404).json({message: 'you have already liked this post'})
        }
        
        await Like.create({
            postId: postId,
            userId: req.user.id
        })

        res.status(201).json({message: 'liked'})

    } catch(err){
        next(err)
    }
}

const deleteLike = async (req,res,next) => {
    try{
        const { id } = req.params
        const like = await Like.findOne( {where: { id: id }})

        if(!like) {
            return res.status(400).json({message: 'like not found'})
        }

        if(req.user.id !== like.userId){
            return res.status(403).json({message: 'can not delete this like'})
        }

        await like.destory()
        res.status(204).json()

    } catch(err){
        next(err)
    }
}
module.exports = {
    createLike,
    deleteLike
}