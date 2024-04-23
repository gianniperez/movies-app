import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export const Rating = () => {

  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [msg, setMsg] = useState('Rate this movie')

  return (
    <div className='flex flex-col'>
        <div className='flex flex-row justify-center'>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1
                return (
                <label  key={index}>
                    <input
                        className='hidden'
                        type='radio'
                        onClick={() => setRating(currentRating)}
                    />
                    <FaStar
                        className='size-5'
                        color={currentRating <= (hover || rating) ? '#eab308' : '#e5e7eb'}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(rating)}
                        onClick={() => setMsg('Rated')}
                    />
                </label>
                )
            })}
        </div>
        <div className='flex justify-center max-sm:hidden text-gray-600'>
            {msg}
        </div>
    </div>
  )
}