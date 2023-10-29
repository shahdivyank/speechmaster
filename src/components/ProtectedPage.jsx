import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const ProtectedPage = ({ children }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") void signIn("google");
    else axios.post("/api/socket");
  }, [status]);

  return (
    <div className="h-full w-full">
      {status === "authenticated" && children}
    </div>
  );
};

export default ProtectedPage;
