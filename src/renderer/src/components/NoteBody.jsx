import React, { useEffect, useState } from 'react'
import colors from "../colors.json"
import Reminder from './Reminder'

const NoteBody = () => {
    const defaultColor = colors.find((c) => c.id === 'color-yellow')
    const [noteColor, setNoteColor] = useState(defaultColor)
    const [reminderTime, setReminderTime] = useState(null)

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

    useEffect(() => {
        if(reminderTime) {
            const now = new Date();
            const timeUntilReminder = reminderTime - now;

            const timeout = setTimeout(() => {
                new Notification('Reminder!', {
                    body: "Attention! Your reminder is due now, check out your note!"
                })
            }, timeUntilReminder)
            
            return () => clearTimeout(timeout);
        }
    }, [reminderTime])

    const handleSetReminder = (dateTime) => {
        setReminderTime(dateTime)
    }

    return (
        <div
            className='w-full h-screen p-2 flex flex-col'
            style={{
                backgroundColor: noteColor?.colorBody,
                color: noteColor?.colorText
            }}
        >
            <textarea
                className='w-full flex-grow outline-none resize-none p-2'
                placeholder='Type your note here ...'
                style={{ background: noteColor?.colorBody, color: noteColor?.colorText }}
            ></textarea>
            
            <div className='p-1'>
                <Reminder onSetReminder={handleSetReminder}  />
            </div>
        </div>
    )
}

export default NoteBody