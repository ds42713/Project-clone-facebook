import { ALL_FRIEND, REQUEST_FRIEND, FIND_FRIEND } from '../../config/data';

function FriendMenu({ changeMode }) {
  return (
    <div className="d-flex align-items-center mb-4">
      <h4 className="mb-0">Friends</h4>
      <ul className="nav flex-grow-1 justify-content-end align-items-center">
        <li className="nav-item active">
          <button
            className="btn nav-link"
            onClick={() => changeMode(ALL_FRIEND)}
          >
            All Friends
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn nav-link"
            onClick={() => changeMode(REQUEST_FRIEND)}
          >
            Friend Requests
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn nav-link"
            onClick={() => changeMode(FIND_FRIEND)}
          >
            Find Friend
          </button>
        </li>
      </ul>
    </div>
  );
}

export default FriendMenu;

