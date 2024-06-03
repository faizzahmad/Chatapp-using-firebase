import { arrayUnion, collection,doc,getDocs,query,serverTimestamp,setDoc,updateDoc,where } from 'firebase/firestore';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../lib/firebase';
import { set } from 'firebase/database';
import { ColorRing } from 'react-loader-spinner';
import { useUserStore } from '../../lib/userStore';
import { FaXmark } from "react-icons/fa6";

export default function AddUser({closeadduser}) {
  const [users, setUsers] = useState(null);
  const[loader, setLoader] = useState(false);
  const {currentUser} = useUserStore();
  const[loaderadd,setloaderadd] = useState(false);
  
  const handelsearch = async (e) => {
    e.preventDefault()
    setLoader(true);
const formData = new FormData(e.target);
const username  = formData.get('username');
try{
  const userRef = collection(db, "users");

  const q = query(userRef, where("username", "==", username));
  const  querySnapshot = await getDocs(q);
  if(!querySnapshot.empty){
    setUsers(querySnapshot.docs[0].data());
  }else{
    toast.error('User not found')
    setUsers(null);
  }
}catch(err){
    console.log(err);
    toast.error(err.message)
  }finally{
    setLoader(false);
  }
}
const handeladd = async() => {
  setloaderadd(true);
  const chatRef = collection(db, "chats");
  const userChatsRef = collection(db, "userschats");
  try{
    const newChatRef = doc(chatRef)
await setDoc(newChatRef,{
      createdAt : serverTimestamp(),
      messages : []
    })
    await updateDoc(doc(userChatsRef, users.id), {
      chats : arrayUnion({
        chatId : newChatRef.id,
       lastMessage : '',
       receiverId : currentUser.id,
        updatedAt : Date.now()
      
      })
    })
    await updateDoc(doc(userChatsRef, currentUser.id), {
      chats : arrayUnion({
        chatId : newChatRef.id,
       lastMessage : '',
       receiverId : users.id,
        updatedAt : Date.now()
      
      })
    })
  }catch(err){
    console.log(err);
    toast.error(err.message)
  }finally{
    setloaderadd(false);
  }
}
  console.log(users);
  return (
    <div className='p-7 darkblue2 rounded-[10px] absolute left-0  top-0 bottom-0 right-0 m-auto modaldiv'>
        <button className='absolute top-2 right-2 p-2 rounded-full bg-[#1a73e8]' onClick={() => closeadduser(false)}><FaXmark/></button>
        <form  className=' flex gap-5 mt-7' onSubmit={handelsearch}>
            <input type="text" required className='bg-white p-5 rounded-[10px] outline-none text-black' placeholder='Username' name='username' />
            <button className={`py-5 w-[100px] rounded-[10px] bg-[#1a73e8] flex items-center justify-center text-white ${loader && ' bg-opacity-[50%]'}`}>Search {loader && <ColorRing
  visible={true}
  height="25"
  width="25"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> }</button>
        </form>
      {
        users &&   <div className='user mt-8 flex items-center justify-between'>
            <div className='details flex items-center gap-5'>
                <img src={users.avatar || './avatar.png'} className='w-[50px] h-[50px] rounded-full object-cover' alt="" />
            <span>{users.username}</span>
            </div>
            <button className={`p-3 rounded-[10px] flex items-center justify-center bg-[#1a73e8] text-white ${loaderadd && ' bg-opacity-[50%]'}`} onClick={handeladd}>Add User {loaderadd && <ColorRing
  visible={true}
  height="25"
  width="25"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />}</button>
        </div>
      }
    </div>
  )
}
