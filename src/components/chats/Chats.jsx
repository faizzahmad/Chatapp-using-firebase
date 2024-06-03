import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { get, set } from 'firebase/database';
import upload from '../../lib/upload';
import { ColorRing } from 'react-loader-spinner';

    import { getMinutesAgo } from '../../lib/converttime';
export default function Chats() {
    const[loader, setLoader] = useState(false);
    const[open,setOpen]=useState(false);
    const[text,setText]=useState('');
    const endRef = useRef(null);
   
    const {chatId,user,isCurrentUserBlocked, isReceiverBlocked} = useChatStore();
    const[chat,setChat]=useState([]);
    const {currentUser} = useUserStore();
    
    const [img, setImg] = useState({
        file : null,
        url : ''
    });


    const handelImg = (e) => {
        if(e.target.files[0]){
            setImg({
                file : e.target.files[0],
                url : URL.createObjectURL(e.target.files[0])
            })
            }
        }
    const handelemoji = (e) => {
        setText(prev => prev + e.emoji);
        setOpen(false);
    }
    useEffect(() => {
       endRef.current?.scrollIntoView({behavior:'smooth'})
      
    },[])
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
setChat(res.data())
        })

        return () => {
            unSub();
        }

    },[chatId])

    const handelsend = async() => {
        if(text === '') return;

        let imgurl = null;
        try{
            setLoader(true);
            if(img.file){
                imgurl = await upload(img.file)
            }
             await updateDoc(doc(db, "chats", chatId), {
                messages : arrayUnion({
                   senderId : currentUser.id,
                   text,
                   createdAt : new Date(),
                   ...(imgurl && {img : imgurl})
                })
             })

             const userIds  = [currentUser.id, user.id]
             


userIds.forEach(async (id) => {
    const userChatsRef = doc(db, "userschats", id); // Use doc instead of collection
    const userChatSnapshot  = await getDoc(userChatsRef);
    if(userChatSnapshot.exists()){
        const userChatsData = userChatSnapshot.data();
        const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId);
        userChatsData.chats[chatIndex].lastMessage = text;
        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
        userChatsData.chats[chatIndex].updatedAt = Date.now();
        await updateDoc(userChatsRef, {
            chats: userChatsData.chats
        });
    }
});

        setText('');     

        }catch(err){
            console.log(err);
        }finally{
            setLoader(false);
        }

        setImg({
            file : null,
            url : ''
        })
    }

    console.log(chat);
  return (
    <div className=' border-r border-l border-[#dddddd35] flex-1 h-[100%] flex flex-col'>
        <div className='p-4 flex items-center justify-between border-b border-[#dddddd35]'>
            <div className=' flex items-center gap-5'>
                <img src={user?.avatar || './avatar.png'} className='w-[60px] h-[60px] rounded-full object-cover' alt="" />
                <div className=' flex flex-col gap-1'>
                    <span className=' text-lg font-bold '>{user.username}</span>
                    <p className=' text-sm font-light text-[#a5a5a5]'>{user.email}</p>
                </div>
            </div>

            <div className=' flex gap-5 items-center'>
                <img src="./phone.png" className='w-[20px] h-[20px] cursor-pointer object-cover' alt="" />
                <img src="./video.png" className='w-[20px] h-[20px] cursor-pointer  object-cover'  alt="" />
                <img src="./info.png" className='w-[20px] h-[20px] cursor-pointer  object-cover'  alt="" />
            </div>
            
        </div>

        
        <div className='p-5 flex-1 overflow-scroll flex flex-col gap-5'>
            {/* <div className='messages max-w-[70%] flex gap-5'>
                <img src="./avatar.png" className='w-[30px] h-[30px] rounded-full object-cover' alt="" />
               <div className=' flex flex-1 flex-col gap-1'>
               <p className='p-5 pchat rounded-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus placeat dolores dolor et fugiat dolorum.</p>
                <span className=' text-xs'>1 min ago</span>
               </div>
            </div> */}

           {
            chat?.messages?.map((items,index) => (
                <div className={` max-w-[70%] flex gap-5  ${items.senderId == currentUser.id ? ' ms-auto messages' : ''}`} key={index}>
               {
                items.senderId !== currentUser.id  &&   <img src={user.avatar || './avatar.png'} className='w-[30px] h-[30px] rounded-full object-cover' alt="" />
               }
               <div>
              {
                items.img &&  <img src={items.img} className='w-[100%] h-[300px] object-cover rounded-[10px] mb-2' alt="" />
              }
               <p className= {`p-5 rounded-[10px] ${items.senderId == currentUser.id ? 'bg-[#5183fe]' : 
               'pchat' } `}>{items.text}</p>
                <span className=' text-xs'>{getMinutesAgo(items.createdAt)}</span>
               </div>
            </div>
            ))
           }

          {
            img.url && <div className='w-[70%]'><img className='w-[100%] h-[300px] object-cover rounded-[10px] mb-2' src={img.url}></img></div>
          }
            <div ref={endRef}></div>
        </div>


        <div className='p-5 flex items-center mt-auto justify-between border-t border-[#dddddd35] gap-5'>
            <div className=' flex gap-5'>
               <label htmlFor="fileimg"> <img src="./img.png" className='w-[20px] h-[20px] cursor-pointer' alt="" /></label>
                <input type="file" id='fileimg' className=' hidden'  onChange={handelImg} 
                    accept='image/*'
                />
                <img src="./camera.png" className='w-[20px] h-[20px] cursor-pointer' alt="" />
                <img src="./mic.png" className='w-[20px] h-[20px] cursor-pointer' alt="" />
            </div>
            <input type="text" value={text} className=' flex-1  darkblue border-none outline-none focus:outline-none p-4 border rounded-[10px]' placeholder='Type a message...'
            onChange={
                (e) => setText(e.target.value)
            
            } />
            <div className=' relative'>
                <img src="./emoji.png" className='w-[20px] h-[20px] cursor-pointer' alt="" onClick={() => setOpen(!open)} />
                <div className=' absolute left-0 bottom-[50px]'>
                <EmojiPicker open={open} onEmojiClick={handelemoji}/>
                </div>
            </div>
            <button  className={` bg-indigo-600 text-white py-[10px] px-5 flex items-center justify-center w-[100px]  rounded-[5px] ${ loader  && ' bg-opacity-[60%]'}`} onClick={handelsend}>Send {loader && <ColorRing
  visible={true}
  height="20"
  width="20"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />}</button>
        </div>
    </div>
  )
}
