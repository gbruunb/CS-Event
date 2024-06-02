import NavBar from "./navbar/NavBar"

export default function Layout({children}: {children: React.ReactNode}){
    return(
        <div>
            <NavBar/>
            {children}
        </div>
    )
}