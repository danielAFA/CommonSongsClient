import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const UserSelection = ({ currentUserId, setIntersectWith }) => {
  const [users, setUsers] = useState();
  const [selectStates, setSelectStates] = useState([]);

  useEffect(() => {
    const serverUri = `http://localhost:80/`;
    const requestUsers = async () => {
      try {
        let {
          data: { userIds },
        } = await axios.get(serverUri + "user_ids");
        userIds = userIds.filter(id => id !== currentUserId);
        setUsers(userIds);
        setSelectStates(userIds.map(user => ({ name: user, selected: false })));
      } catch (e) {
        console.error(e);
      }
    };
    requestUsers();
  }, [currentUserId]);

  const handleSelection = useCallback(
    e => {
      const newStates = selectStates.map(user =>
        user.name === e.target.value
          ? { ...user, selected: true }
          : { ...user, selected: false }
      );
      setSelectStates(newStates);
      setIntersectWith(e.target.value);
    },
    [selectStates, setIntersectWith]
  );

  const Options = useMemo(
    () => (
      <ul>
        {selectStates.map((option, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name="user"
                value={option.name}
                checked={option.selected}
                onChange={handleSelection}
              />
              {option.name}
            </label>
          </li>
        ))}
      </ul>
    ),
    [selectStates, handleSelection]
  );

  return (
    <div>
      {users && (
        <>
          {users.length > 0
            ? "Compare liked songs with: "
            : "No users to compare with yet"}
          {Options}
        </>
      )}
    </div>
  );
};

export default UserSelection;
