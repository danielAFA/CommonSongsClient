import React, { useState, useCallback, useMemo } from "react";

const UserSelection = ({ availableUsers, setIntersectionWith }) => {
  const [selectStates, updateSelectStates] = useState(
    availableUsers.map(user => ({ name: user, selected: false }))
  );

  const handleSelection = useCallback(
    e => {
      const newStates = selectStates.map(user =>
        user.name === e.target.value
          ? { ...user, selected: true }
          : { ...user, selected: false }
      );
      updateSelectStates(newStates);
      setIntersectionWith(e.target.value);
    },
    [selectStates, setIntersectionWith]
  );

  const Options = useMemo(
    () =>
      selectStates.map((option, i) => (
        <label key={i}>
          <input
            type="radio"
            name="user"
            value={option.name}
            checked={option.selected}
            onChange={handleSelection}
          />
          {option.name}
        </label>
      )),
    [selectStates, handleSelection]
  );

  return (
    <>
      <div>
        <div>
          {availableUsers.length > 0
            ? "Compare liked songs with: "
            : "No users to compare with yet"}
        </div>
        {Options}
      </div>
    </>
  );
};

export default UserSelection;
