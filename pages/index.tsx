import { useSession, signIn, signOut} from "next-auth/react"
import SignInGoogle from "@/components/navbar/SignInGoogle"
import Calendar from "@/components/Home/Calendar"

export default function Home() {
  
  const { data: session } = useSession()
  
  if (session && session.user) {
    return (
      <>
      
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    {/* <NavBar /> */}
    <div>
      <Calendar></Calendar>
    </div>
    
  
    </>
  )
  
}