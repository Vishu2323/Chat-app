import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest , baseURL} from "../utils/services";

const AuthContext = createContext()

export const AuthContextProvider=({children})=>{

     const[user,setuser]= useState(null)
    const[registerError,setregisterError]=useState(null)
    const[isregisterLoading,setisregisterLoading]=useState(false)
    const[registerInfo, setregisterInfo]=useState({
        name:"",
        email:" ",
        password:" "
    })

    const[loginError,setloginError]=useState(null)
    const[isloginLoading,setisloginLoading]=useState(false)
    const[loginInfo, setloginInfo]=useState({
        email:" ",
        password:" "
    })
    // console.log(user)
    // console.log(loginInfo)
    useEffect(()=>{
        const user= localStorage.getItem("User")
        setuser(JSON.parse(user))
    },[])
    const updateregisterInfo = useCallback((info)=>{
        setregisterInfo(info);
    },[])
    const updateLoginInfo = useCallback((info)=>{
        setloginInfo(info);
    },[])
    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setisregisterLoading(true)
        setregisterError(null)
       const response =  await postRequest(`${baseURL}/users/register`,JSON.stringify(registerInfo))
       setisregisterLoading(false)
       if(response.error){return setregisterError(response)}
       localStorage.setItem("User",JSON.stringify(response))
       setuser(response)
    },[registerInfo])

    const loginUser = useCallback(async(e)=>{
        e.preventDefault()
        setisloginLoading(true)
        setloginError(null)
        const response =  await postRequest(`${baseURL}/users/login`,JSON.stringify(loginInfo))
        setisloginLoading(false)
        if(response.error){return setloginError(response)}
        localStorage.setItem("User",JSON.stringify(response))
        setuser(response)
    },[loginInfo])


    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setuser(null)    
    },[])
    return <AuthContext.Provider value={{user,registerInfo,updateregisterInfo,registerUser,isregisterLoading,registerError,logoutUser,loginUser,loginError,loginInfo,updateLoginInfo,isloginLoading}}>{children}</AuthContext.Provider>
}
export default AuthContext 