import React, { useState } from 'react'
import colors from '../colors.json'
import Plus from './Plus'

const AddNote = () => {
  const defaultColor = colors.find((c) => c.id === 'color-yellow')
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleAddNote = () => {
    console.log("Selected color for new note:", selectedColor);
    window.api.addNote(selectedColor)
  }

  return (
    <div className="fixed bottom-0 right-2 p-5 flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2 bg-white p-2 rounded-xl">
        {colors.map((color) => (
          <button
          key={color.id}
          className="w-8 h-8 rounded-full border-2 border-transparent cursor-pointer"
          style={{
            backgroundColor: color.colorBody,
          }}
          onClick={() => setSelectedColor(color)}
          ></button>
        ))}
      </div>
        <Plus color={selectedColor} onClick={handleAddNote} />
    </div>
  )
}

export default AddNote