import React from 'react'

export default function Details() {
  return (
    <div className=' flex-1 h-[100%] overflow-y-auto'>
        <div className='px-7 py-5 flex flex-col items-center gap-2 border-b border-[#dddddd35]'>
        <img src="./avatar.png" className='w-[70px] h-[70px] object-cover rounded-full' alt="" />
            <h2>Faiz Ahmad</h2>
            <p>Lorem ipsum dolor sit.</p>
        </div>
        
        <div className=' p-5 flex flex-col gap-7 '>
          <div className='option'>
          <div className=' flex items-center justify-between'>
          <span>Chat settigs</span>
          <img src="./arrowUp.png" className='w-[30px] h-[30px] p-2 pchat cursor-pointer rounded-full ' alt="" />
          </div>
          </div>

          <div className='option'>
          <div className='flex items-center justify-between'>
          <span>Privarcy & help</span>
          <img src="./arrowUp.png"  className='w-[30px] h-[30px] p-2 pchat cursor-pointer rounded-full ' alt="" />
          </div>
          </div>


          <div className='option'>
          <div className='flex items-center justify-between'>
          <span>Shared Photos</span>
          <img src="./arrowDown.png"  className='w-[30px] h-[30px] p-2 pchat cursor-pointer rounded-full ' alt="" />
          </div>
          <div className="photos flex flex-col gap-5 mt-4 ">
            <div className='photoitem flex items-center justify-between'>
             <div className='photodetails flex items-center gap-5'>
             <img src="https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=800" alt=""  className='w-[40px] h-[40px] rounded-[5px] object-cover'/>
             <span className=' text-sm text-gray-300 font-light'>Photo_2024.png</span>
             </div>
            
              <img src="./download.png" className='w-[30px] h-[30px] object-cover pchat cursor-pointer p-2 rounded-full' alt="" />
            </div>

            <div className='photoitem flex items-center justify-between'>
             <div className='photodetails flex items-center gap-5'>
             <img src="https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=800" alt=""  className='w-[40px] h-[40px] rounded-[5px] object-cover'/>
             <span className=' text-sm text-gray-300 font-light'>Photo_2024.png</span>
             </div>
            
              <img src="./download.png" className='w-[30px] h-[30px] object-cover pchat cursor-pointer p-2 rounded-full' alt="" />
            </div>

            <div className='photoitem flex items-center justify-between'>
             <div className='photodetails flex items-center gap-5'>
             <img src="https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=800" alt=""  className='w-[40px] h-[40px] rounded-[5px] object-cover'/>
             <span className=' text-sm text-gray-300 font-light'>Photo_2024.png</span>
             </div>
            
              <img src="./download.png" className='w-[30px] h-[30px] object-cover pchat cursor-pointer p-2 rounded-full' alt="" />
            </div>
          
          </div>
          </div>




          <div className='option'>
          <div className='flex items-center justify-between'>
          <span>Shared files</span>
          <img src="./arrowUp.png" className='w-[30px] h-[30px] p-2 pchat cursor-pointer rounded-full ' alt="" />
          </div>
          </div>

         <div className=' flex flex-col gap-4'>
         <button className='py-[10px] px-[20px] buttoncolor text-white border-none rounded-[5px] cursor-pointer'>Block user</button>
          <button className='py-[8px] px-[20px] bg-[#1a73eb] text-white border-none rounded-[5px] cursor-pointer'>Logout</button>
         </div>
        </div>
    </div>
  )
}
