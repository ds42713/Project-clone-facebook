import defaultImg from '../../assets/images/profileImg.png';
import { ALL_FRIEND, REQUEST_FRIEND, FIND_FRIEND } from '../../config/data';

function FriendItem({
  mode,
  friend: { profileImg, firstName, lastName, id },
  requestFriend,
  acceptFriend,
  deleteFriend
}) {
  return (
    <div className="col-lg-6">
      <div className="card p-3 align-items-center justify-content-between flex-row">
        <div className="d-flex align-items-center">
          <img
            src={profileImg ?? defaultImg}
            width="80"
            height="80"
            className="rounded-3"
            alt="user"
          />
          <div className="d-flex flex-column ms-3">
            <span className="fw-bold">
              {firstName} {lastName}
            </span>
            <span className="fs-7 text-muted">44 mutual friends</span>
          </div>
        </div>
        <div>
          {mode === ALL_FRIEND && (
            <button
              className="btn text-danger"
              onClick={() => deleteFriend(id)}
            >
              <i className="fas fa-user-minus fs-6" />
            </button>
          )}
          {mode === REQUEST_FRIEND && (
            <>
              <button
                className="btn text-success"
                onClick={() => acceptFriend(id)}
              >
                <i className="fas fa-user-check fs-6" />
              </button>
              <button
                className="btn text-danger"
                onClick={() => deleteFriend(id)}
              >
                <i className="fas fa-user-times fs-6" />
              </button>
            </>
          )}
          {mode === FIND_FRIEND && (
            <button
              className="btn text-primary"
              onClick={() => requestFriend(id)}
            >
              <i className="fas fa-user-plus fs-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendItem;
