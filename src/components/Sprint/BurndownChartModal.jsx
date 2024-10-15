import { Backdrop } from '@mui/material'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BsGraphDown } from 'react-icons/bs'
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import BASE_URL from '../../config';
import { Tooltip } from '@mui/material';

export default function BurndownChartModal({_id}) {

    const [open, setOpen] = useState(false);
    const [dates, setDates] = useState([]);
    const [storyPoints, setStoryPoints] = useState([]);
    const [alert, setAlert] = useState(false);

    const getBurndownData = () => {
        axios.get(`${BASE_URL}/api/sprints/burndown_chart?sprintID=${_id}`)
        .then(res => {

            if (res.data.dates === undefined) {
                setAlert(true);
                setTimeout(() => {
                    setOpen(false)
                    setAlert(false)
                }, 3000);
                return;
            }

            setDates(res.data.dates);
            setStoryPoints(res.data.storyPoints);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
        <Tooltip title='Show burndown chart' arrow>
            <button
            className='text-2xl p-1 rounded hover:ring-2 hover:ring-rose-500 ease-in-out duration-500'
            onClick={() => {
                setOpen(true)
                getBurndownData()
            }}>
                    <BsGraphDown/>
            </button>
        </Tooltip>

        {createPortal(
        <Backdrop
            open={open}
            onClick={() => setOpen(false)}
        >

        {alert ? (
                <div className='bg-red-500 text-white p-2 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    Not enough data to generate burndown chart
                </div>
            ) : (

            <div className='bg-white p-4 gap-2 shadow-xl rounded-xl'>

                <h1 className='text-2xl font-bold'>Burndown Chart</h1>

                    <LineChart
                        xAxis={[
                            {
                                scaleType: 'time',
                                data: Array.from({ length: dates.length }, (_, i) => i + 1),
                                valueFormatter: (value) => dates[value - 1],
                            }
                        ]}
                        series={[
                            {
                                data: storyPoints,
                                label: 'Actual',
                            },
                            {
                                data: Array.from({ length: dates.length }, (_, i) => storyPoints[0] - (storyPoints[0] / (dates.length - 1)) * (i)),
                                label: 'Ideal',
                            }
                        ]}
                        height={500}
                        width={800}
                    />
            </div>
            )}
        </Backdrop>
        ,document.getElementById('portal-root'))}
        </>
    )
}


