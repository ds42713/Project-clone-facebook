import React from 'react'
import defaultImg from '../../assets/images/profileImg.png'
import timeSince from '../../services/timeSince'


function CommentItem({
    comment: {
        User: {profileImg, firstName, lastName} ,
        createdAt,
        title
    }
}) {
    return (
        <div className="d-flex flex-row mb-3">
            <img
                src={profileImg ?? defaultImg}
                width="30"
                height="30"
                className="rounded-circle"
                alt="user"
            />
            <div className="d-flex flex-column ms-2">
                <div>
                    <span className="fw-bold text-facebook">
                        {firstName} {lastName}
                    </span>
                    <span className="ms-2 text-muted fw-bolder">
                        &bull;
                    </span>
                    <span className="ms-2 text-muted fs-7">
                        {timeSince(createdAt)}
                    </span>
                </div>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default CommentItem