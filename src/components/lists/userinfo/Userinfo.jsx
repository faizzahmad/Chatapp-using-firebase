import React from 'react'
import { useUserStore } from '../../../lib/userStore'

export default function Userinfo() {
  const {currentUser} = useUserStore()
  return (
    <div className='p-5 flex items-center gap-5'>
        <div className='flex items-center gap-5'>
            <img src={currentUser.avatar || './avatar.png'} className='w-[50px] h-[50px] rounded-full object-cover' alt="" />
            <h2 className=' text-xl font-semibold'>{currentUser.username}</h2>
        </div>
        <div className=' flex gap-5 ms-auto'>
            <img src="./more.png" className='w-[20px] h-[20px]' alt="" />
            <img src="./video.png" className='w-[20px] h-[20px]' alt="" />
            <img src="./edit.png" className='w-[20px] h-[20px]' alt="" />
        </div>
    </div>
  )
}
