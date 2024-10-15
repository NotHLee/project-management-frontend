import React from 'react'



export default function FAQs(props) {
    const { faq } = props;
  return (
    <div className=' p-2 bg-orange-100 rounded-lg flex flex-col w-3/4 items-center text-center'>

        
        <div>
            <p className='p-2'>Q: {faq.question}</p>
    
        </div>
        <video className='p-2 scale-105' width="320" height="240" controls>
            <source src={faq.video} type = "video/mp4"/>
            Your browser does not support the video tag.
        </video>
    </div>
  )
}
