import router from "./routers";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContextProvider from "./Context";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
