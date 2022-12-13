
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


let handleAuth =  () => {
    

    try {
        const decoded = jwt_decode(Cookies.get("tokenAuth"));
        const expire = decoded.exp;
        const email = decoded.userEmail;
        const currentDate = new Date();
    
        if (expire * 1000 < currentDate.getTime()) {
            return {
                errCode: 1,
                errMessage: "Token expired",
                roleId: 'customer'
            }
        } else {
          // (async () => {
          //   let api = await getUserByIdApi(decoded.userId);
          //                 console.log("api: ", api.data);
          //   setUsers(api.data);
          // })();
           if(decoded.userRoleId == "R1") {
                  return {
                    errCode: 0,
                      errMessage: "Success",  
                      email: email,
                    roleId: "1",
                    id: decoded.userId
                  }
           } else if(decoded.userRoleId == "R2") {
                  return {
                    errCode: 0,
                      errMessage: "Success",
                    email: email,
                    roleId: "2",
                    id: decoded.userId
                  }
           } else if(decoded.userRoleId == "R3") {
                  return {
                    errCode: 0,
                      errMessage: "Success",
                    email: email,
                    roleId: "3",
                    id: decoded.userId
                  }
           }
        }
        return {
            errCode: 0,
            errMessage: "NoLogin",
            roleId: "customer"
        }
    } catch(e) {
        return {
            errCode: 0,
            errMessage: "NoLogin",
            roleId: "customer"
        }
    }
}
export { handleAuth };