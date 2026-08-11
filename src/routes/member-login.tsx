import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LoginPage from "@/components/ui/LoginPage";
import { readAuthSession, type AuthUser } from "@/lib/auth";

export const Route = createFileRoute("/member-login")({
  component: MemberLogin,
});

function MemberLogin() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(readAuthSession()?.user ?? null);
  }, []);

  return (
    <LoginPage
      heading="SBGBT सदस्य लॉगिन"
      subtitle="अपने सदस्य खाते और सेवाओं तक पहुंचने के लिए लॉगिन करें।"
      buttonText="सदस्य लॉगिन"
      loginType="member"
      emailPlaceholder="member@example.com"
      loggedInUser={user?.loginType === "member" ? user : null}
      dashboardLabel="Member Account"
      onSuccess={setUser}
      onLogout={() => setUser(null)}
    />
  );
}
