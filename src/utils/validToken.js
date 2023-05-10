import jwt_decode from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const decodedToken = jwt_decode(token); 
  if (decodedToken?.exp * 1000 < Date.now()) {
    return false;
  }
  else{
    localStorage.setItem("email",decodedToken.sub)
    return true;
  }
  
};
