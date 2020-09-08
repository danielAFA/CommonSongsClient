import React, { useState } from "react"

const UserSelection = ({ availableUsers, setIntersectionWith }) => {
  const [selectStates, updateSelectStates] = useState(
    availableUsers.map(user => ({ name: user, selected: false }))
  )

  const handleSelection = e => {
    const newStates = selectStates.map(user =>
      user.name === e.target.value
        ? { ...user, selected: true }
        : { ...user, selected: false }
    )
    updateSelectStates(newStates)
    setIntersectionWith(e.target.value)
    console.log(newStates)
  }

  return (
    <>
      <div>
        {selectStates.map((option, i) => (
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
        ))}
      </div>
    </>
  )
}

export default UserSelection
