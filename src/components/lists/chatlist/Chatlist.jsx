import React, { useEffect, useState } from 'react'
import AddUser from '../../adduser/AddUser'
import { useUserStore } from '../../../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { set } from 'firebase/database';
import { useChatStore } from '../../../lib/chatStore';

export default function Chatlist() {
    const [addmode, setAddmode] = useState(false);
    const[input,setInput]=useState('');
    const[chats,setChats] = useState([]);
    const {currentUser} = useUserStore();
    const {chatId, changeChat} = useChatStore();
    

    console.log(chatId);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userschats", currentUser.id), async (res) => {
          const items = res.data().chats;

          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return {...item, user}
          } )
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unsub();
        }
    },[currentUser.id])

    const handelselect = async(chat) => {
        const userchats = chats.map((item) =>  {
            const {user, ...rest} = item;
            return rest;
        });
        const chatIndex = userchats.findIndex((item) => item.chatId === chat.chatId);
        userchats[chatIndex].isSeen = true;
        const userChatsRef = doc(db, "userschats", currentUser.id);
        try{
            await updateDoc(userChatsRef, {
                chats : userchats
            })
            changeChat(chat.chatId, chat.user)

        }catch(err){
            console.log(err);
        }

    }

    const fiterChats = chats.filter((item) => item.user.username.toLowerCase().includes(input.toLowerCase()));
    
  return (
    <div className=' flex-1 overflow-auto'>
        <div className=' flex items-center gap-5 p-5'>
            <div className='w-[80%] darkblue flex items-center gap-5 rounded-[10px] p-2'>
                <img src="./search.png" alt=""  className='w-[20px] h-[20px]'/>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value) } className='bg-transparent outline-none text-white focus:outline-none'  placeholder='Search'/>
            </div>

            <img src={addmode ? './minus.png' : './plus.png' } className='w-[36px] h-[36px] darkblue cursor-pointer rounded-[10px] p-[10px]' alt="" onClick={() => setAddmode(!addmode)}/>
        </div>

       {
        fiterChats.map((items,index) => (
            <div className={`flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd35] ${items.isSeen ? ' bg-transparent' : 'bg-[#5183fE]'}`} key={index} onClick={() => handelselect(items)}>
            <img src={items.user.avatar || "./avatar.png" }className='w-[50px] h-[50px] object-cover rounded-full' alt="" />
            <div className=' flex flex-col gap-1 '>
                <span className='font-[500]'>{items.user.username}</span>
                <p className='text-sm font-[300]'>{items.lastMessage}</p>
            </div>
        </div>
        ))
       }

        

        

      


      

      
{
    addmode && <AddUser closeadduser={setAddmode}/>
}
    </div>
  )
}
