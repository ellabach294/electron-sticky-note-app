import React, { useState } from 'react'

function Reminder({ onSetReminder }) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    console.log('Rendering Reminder Component');

    const handleSetReminder = () => {
        if (date && time) {
            const reminderDateTime = new Date(`${date}T${time}`);
            if (reminderDateTime > new Date()) {
                onSetReminder(reminderDateTime);
                alert('Reminder set');
            } else {
                alert('Please select a future date and time')
            }
        } else {
            alert('Please fill in both date and time')
        }
    }
    return (
        <div className='mt-2 w-[80%]'>
            <label className='block text-sm font-medium mb-1'>Set Reminder</label>
            <div className='flex gap-2'>    
                <input
                    type="date"
                    className='border rounded p-1 w-full text-xs'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type='time'
                    className='border rounded p-1 w-full text-sm'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button
                    onClick={handleSetReminder}
                    className="bg-orange-400 w-[90%] text-sm text-stone-700 font-semibold p-1 rounded hover:bg-orange-600"
                >Set Reminder</button>
            </div>
        </div>
    )
}

export default Reminder