import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc,setDoc } from 'firebase/firestore'
import upload from '../../lib/upload'
import { ColorRing } from 'react-loader-spinner'
import { set } from 'firebase/database'

export default function Logins() {
    const [avatar, setAvatar] = useState({
        file : null,
        url : ''
    })
    const[loading, setLoading] = useState(false);
    const[loadinlogin, setLoadinlogin] = useState(false)

    const handelAvatar = (e) => {
if(e.target.files[0]){
    setAvatar({
        file : e.target.files[0],
        url : URL.createObjectURL(e.target.files[0])
    })
    }
}

const handellogin = async(e) => {
    e.preventDefault()
    setLoadinlogin(true)
    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);
try{
    const response = await signInWithEmailAndPassword(auth, email, password);
    toast.success('Logged in successfully')

}catch(err){
    console.log(err);
    toast.error(err.message)
 
}finally{
    setLoadinlogin(false)
    
}
}

const handelRegister = async(e) => {
    e.preventDefault();
   if(avatar.url === ''){
       toast.error('Please upload an image')
   }else{
    setLoading(true)
    const formData = new FormData(e.target);
const {username, email, password} = Object.fromEntries(formData);
try{
    const response  =  await createUserWithEmailAndPassword(auth, email, password)
    const imgUrl = await upload(avatar.file)
    

    await setDoc(doc(db, "users", response.user.uid), {
       username : username,
       email : email,
       avatar : imgUrl,
       id : response.user.uid,
       blocked : [],

      });
      await setDoc(doc(db, "userschats", response.user.uid), {
       chats : [],
 
       });
      toast.success('Account Created! You can now login')
      setAvatar({
        file : null,
        url : ''
      })
        e.target.reset()

}catch(err){
    console.log(err);
    toast.error(err.message)

}finally{
    setLoading(false) 
}
   }
}
  return (
    <div className='w-[100%] h-[100%] flex  items-center gap-24'>
        <div className='w-[50%] flex flex-col items-center gap-5'>
            <h2 className=' text-3xl font-bold'>Welcome back</h2>
            <form onSubmit={handellogin} className=' flex flex-col items-center justify-center gap-5'>
                <input required type="email " className='p-5 border-none outline-none focus:outline-none text-white darkblue rounded-[5px]  ' placeholder='info@example.in' name='email' />
                <input required type="password" className='p-5 border-none outline-none focus:outline-none text-white darkblue rounded-[5px] ' placeholder='Password' name='password' />
                <button className={`w-[100%] p-4 bg-[#1f8ef1] text-white rounded-[5px] transition-all duration-300  flex items-center justify-center gap-4 font-semibold ${loadinlogin && ' bg-opacity-[50%]'}`} disabled={loadinlogin}>Log In {
                    loadinlogin && <ColorRing color='#fff' width={25} height={25} />
                } </button>
            </form>
        </div>
        <div className='h-[80%] w-[2px] bg-[#dddddd35]'></div>
        <div className='w-[50%] flex flex-col gap-5 items-center '>
        <h2 className=' text-3xl font-bold'>Create an Account</h2>
            <form className='flex flex-col items-center justify-center gap-5 ' onSubmit={handelRegister}>
            <label htmlFor="file" className=' cursor-pointer w-[100%] flex items-center gap-5  underline'>
            <img src={avatar.url || './avatar.png'} className='w-[50px] opacity-[60%] h-[50px] rounded-[10px] object-cover' alt="" />
            Upload an Image
            </label>
            <input type="file" id='file' className=' hidden' onChange={handelAvatar} />
            <input type="text " className='p-5 border-none outline-none focus:outline-none text-white darkblue rounded-[5px] ' placeholder='name' name='username' required />
                <input type="email " className='p-5 border-none outline-none focus:outline-none text-white darkblue rounded-[5px] ' placeholder='email' name='email' required />
                <input type="password" className='p-5 border-none outline-none focus:outline-none text-white darkblue rounded-[5px] ' placeholder='Password' name='password' required />
                <button className={`w-[100%] p-4 bg-[#1f8ef1] text-white rounded-[5px] transition-all duration-300 flex items-center justify-center gap-4 font-semibold ${loading && ' bg-opacity-[50%]'}`} disabled={loading}>{loading ? 'Loading...' : 'Sign Up '}{
                    loading && <ColorRing color='#fff' width={25} height={25} />
                } </button>
            </form>
        </div>
    </div>
  )
}
