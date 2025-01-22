import React, { useEffect, useState } from 'react'
import colors from "../colors.json"

const NoteBody = () => {
    const defaultColor = colors.find((c) => c.id === 'color-yellow')
    const [noteColor, setNoteColor] = useState(defaultColor)

    useEffect(() => {
        window.api?.onColorUpdate((newColor) => {
            console.log("Received color update:", newColor);
            if (newColor) {
                setNoteColor(newColor);  // Updates state with new color
            } else {
                console.error("Received invalid color object:", newColor);
            }
        })
    }, [])

    return (
        <div
            className='w-full h-screen p-5'
            style={{
                backgroundColor: noteColor?.colorBody,
                color: noteColor?.colorText
            }}
        >
            <textarea
                className='w-full h-full outline-none resize-none'
                placeholder='Type your note here ...'
                style={{ background: noteColor?.colorBody, color: noteColor?.colorText }}
            ></textarea>
        </div>
    )
}

export default NoteBody