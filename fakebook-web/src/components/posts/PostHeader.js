import React from 'react'
import defaultImg from '../../assets/images/profileImg.png'
import timeSince from '../../services/timeSince'

function PostHeader({post : {
  
  User : { firstName, lastName, profileImg},
  createdAt

}}) {

  return (
    <>
            <div className="d-flex justify-content-between py-2 px-3">
              <div className="d-flex flex-row align-items-center">
                <img
                  src={profileImg ?? defaultImg}
                  width="50" hight="50"
                  className="rounded-circle"
                  alt="user"
                  role="button"
                />
                <div className="d-flex flex-column ms-2">
                  <span className="fw-bold text-facebook" role="button">
                    {firstName} {lastName}
                  </span>
                  <small className="text-muted fs-7">{timeSince(createdAt)}</small>
                </div>
              </div>
              <div className="mt-1 text-muted">
                <div className="dropdown">
                  <button
                    className="btn text-muted"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/">
                        Edit
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
    </>
  )
}

export default PostHeader