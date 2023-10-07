import React, { useMemo } from 'react'
// import data from './data/modis_mexico.json'
import data from '../data/litte_modis_mexico.json'

function CardData() {
  
  const memoizedData = useMemo(() => data, []);

  console.log(memoizedData);

  return (
    <div className='grid grid-cols-4 gap-4'>
      {memoizedData.map((item, index) => (
        <div className='p-4 mt-1 border-2 border-white' key={index}>
          <h1 className='text-xl bg-slate-500 text-center'>Dato: {index}</h1>
          <p>Latitud: {item.latitude}</p>
          <p>Longitud: {item.longitude}</p>
          <p>Confidence: {item.confidence}</p>
          <p className='font-bold'>Bright_T31: {item.bright_t31}</p>
          <p className='font-bold'>FRP: {item.frp}</p>
          <span className='bg-indigo-500 px-2 py-1 rounded-2xl'>#{item.acq_date}</span>
          <div className='flex py-1'>
            {
              item.daynight == "N" ? <span className='bg-white'>⚫</span> : <span className='bg-white'>🟡</span> 
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardData