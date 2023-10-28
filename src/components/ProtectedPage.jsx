import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const ProtectedPage = ({ children }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") void signIn("google");
  }, [status]);

  return <div>{status === "authenticated" && children}</div>;
};

export default ProtectedPage;
