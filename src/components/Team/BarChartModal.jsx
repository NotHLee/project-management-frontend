import { Backdrop, Tooltip } from '@mui/material'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BsFileBarGraph } from 'react-icons/bs'
import { BarChart } from '@mui/x-charts'


export default function BarChartModal(props) {

    const {timeSpent, dates} = props;

    const [open, setOpen] = useState(false);

    return (
        <>
        <Tooltip title='Show time spent graph' arrow>
            <button className='flex rounded text-3xl hover:bg-rose-400 ease-in-out duration-300'
            onClick={() => setOpen(true)}>
                <BsFileBarGraph />
            </button>
        </Tooltip>

        {createPortal(
        <Backdrop
            open={open}
            onClick={() => setOpen(false)}
        >
            {/* Container */}
            <div className='bg-white p-4 gap-2 shadow-xl rounded-xl'>

                {/* Header */}
                <h1 className='text-2xl font-bold'>Time spent on project</h1>

                {/* Content */}
                <BarChart
                    xAxis={[{ scaleType: 'band', data: dates ? dates : [0], label: 'Dates' }]}
                    series={[{data: timeSpent ? timeSpent : [0]}]}
                    yAxis={[{label: 'Hours'}]}
                    height={500}
                    width={800}
                />

            </div>
        </Backdrop>
        ,document.getElementById('portal-root'))}
        </>
    )
}


