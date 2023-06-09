const { getLoginStatus } = require("@/redux/services/authService");
const { SET_LOGIN } = require("@/redux/slice/authSlice");
const { useRouter } = require("next/router");
const { useEffect } = require("react");
const { useDispatch } = require("react-redux")

export const useRedirect = (path) => { 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => { 
        const redirectUser = async () => { 
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))
            if (!isLoggedIn) { 
                router.push(path)
                return
            }
        }
        redirectUser()
    },[router,path,dispatch])
}