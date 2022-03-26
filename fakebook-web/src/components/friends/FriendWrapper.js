import { useEffect, useState } from 'react';
import FriendList from './FriendList';
import FriendMenu from './FriendMenu';
import { ALL_FRIEND, REQUEST_FRIEND, FIND_FRIEND } from '../../config/data';
import axios from '../../config/axios';

function FriendWrapper() {
  const [mode, setMode] = useState(FIND_FRIEND);
  const [friends, setFriends] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(true);

  useEffect(() => {
    const fetchFriend = async () => {
      let res;
      if (mode === ALL_FRIEND) {
        res = await axios.get('/friends?status=ACCEPTED');
      } else if (mode === REQUEST_FRIEND) {
        res = await axios.get('/friends?status=REQUESTED');
      } else {
        res = await axios.get('/friends/unknown');
      }
      setFriends(res.data.users);
    };
    fetchFriend();
  }, [mode, toggleFetch]);

  const changeMode = (value) => {
    setMode(value);
  };

  const requestFriend = async (requestToId) => {
    await axios.post('/friends', { requestToId });
    setToggleFetch(prev => !prev);
  };

  const acceptFriend = async (friendId) => {
    await axios.patch('/friends/' + friendId);
    setToggleFetch(prev => !prev);
  };

  const deleteFriend = async (friendId) => {
    await axios.delete('/friends/' + friendId);
    setToggleFetch(prev => !prev);
  };

  return (
    <>
      <FriendMenu changeMode={changeMode} />
      <input
        className="form-control rounded-pill"
        type="search"
        placeholder="Search"
      />
      <FriendList
        friends={friends}
        mode={mode}
        requestFriend={requestFriend}
        acceptFriend={acceptFriend}
        deleteFriend={deleteFriend}
      />
    </>
  );
}

export default FriendWrapper;
