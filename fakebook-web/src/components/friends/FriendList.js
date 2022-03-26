import FriendItem from './FriendItem';

function FriendList({
  friends,
  mode,
  requestFriend,
  acceptFriend,
  deleteFriend
}) {
  return (
    <div className="row g-3 mt-3">
      {friends.map(item => (
        <FriendItem
          key={item.id}
          friend={item}
          mode={mode}
          requestFriend={requestFriend}
          acceptFriend={acceptFriend}
          deleteFriend={deleteFriend}
        />
      ))}
    </div>
  );
}

export default FriendList;
