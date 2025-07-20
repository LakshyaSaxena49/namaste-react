import { useEffect } from "react";
import { useState } from "react";

const useOnlineStatus = () => {

  const [isOnline, setIsOnline] = useState(true);

  //check is online 
  useEffect(() => {
    window.addEventListener("offline", () => {
      setIsOnline(false);
    });

    window.addEventListener("online", () => {
      setIsOnline(true);
    });
  }, []);

  //boolean value for Online status
  return useOnlineStatus;
}

export default useOnlineStatus;