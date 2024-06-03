import { useEffect } from "react"
import Chats from "./components/chats/Chats"
import Details from "./components/details/Details"
import Lists from "./components/lists/Lists"
import Logins from "./components/login/Logins"
import Notifications from "./components/notifications/Notifications"
import { useUserStore } from "./lib/userStore"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import { useChatStore } from "./lib/chatStore"


const App = () => {
  const {currentUser,isLoading,fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore();

  useEffect(() => {
const unSub = onAuthStateChanged(auth, (user) => {
fetchUserInfo(user?.uid)
})
return () => {
  unSub();
}
  },[fetchUserInfo]);


  if(isLoading) return <div className="p-[50px] text-4xl rounded-[10px] bgloader">Loading...</div>
  console.log(currentUser);
  return (
    <div className='w-[90vw] h-[90vh]  container flex'>
    
    {
      currentUser ? <>
      <div className="w-[30%] flex">
      <Lists/>
    </div>
   {
    chatId &&  <div className="w-[45%] flex">
   <Chats/>
    </div>
   }
    {
      chatId && <div className="w-[25%]">
    <Details/>
    </div>
    }
      </> : <Logins/>
    }

    <Notifications/>
    </div>
  )
}

export default App