import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Select from "react-select";

const serverUri = `http://localhost:80/`;

const UserSelection = ({
  currentUserId,
  setIntersectWith,
  intersectWith,
  setTracks,
}) => {
  const [options, setOptions] = useState();

  const requestIntersection = useCallback(async () => {
    try {
      const {
        data: { intersection },
      } = await axios.get(serverUri + "intersection", {
        params: {
          id1: currentUserId,
          id2: intersectWith,
        },
      });
      setTracks(intersection);
    } catch (e) {
      console.error(e);
    }
  }, [currentUserId, intersectWith, setTracks]);

  const IntersectionButton = () => {
    if (!intersectWith) {
      return null;
    }
    return (
      <button
        onClick={() => {
          requestIntersection();
        }}
      >
        Get Intersection
      </button>
    );
  };

  useEffect(() => {
    const requestUsers = async () => {
      try {
        let {
          data: { userIds },
        } = await axios.get(serverUri + "user_ids");
        userIds = userIds.filter(id => id !== currentUserId);
        setOptions(userIds.map(option => ({ value: option, label: option })));
      } catch (e) {
        console.error(e);
      }
    };
    requestUsers();
  }, [currentUserId]);

  if (!currentUserId) {
    return null;
  }

  return (
    <div>
      {options && (
        <>
          {options.length > 0
            ? "Compare liked songs with: "
            : "No users to compare with"}
          <Select
            options={options}
            isSearchable={true}
            onChange={selectedOption => {
              setIntersectWith(selectedOption.value);
            }}
          />
          <IntersectionButton />
        </>
      )}
    </div>
  );
};

export default UserSelection;
