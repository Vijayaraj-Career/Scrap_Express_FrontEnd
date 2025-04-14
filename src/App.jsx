import {store} from "./store/store"
import Index from "./Layouts/Index"
import { Provider } from "react-redux"
//import { useEffect } from "react";
//import { setupInterceptors } from "./AuthContext/AuthCard";
function App() {
 
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const token = storedToken ? JSON.parse(storedToken).token : null;
  //   console.log("token",token);
  //   setupInterceptors(token); // ✅ Set up interceptors before app logic starts
  // }, []);
  return (
    <>
     <Provider
       store={store}>
     <Index />
    </Provider>
    </>
  )
}

export default App
