import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LoginPage from "@/components/ui/LoginPage";
import { readAuthSession, redirectToAdminDashboard, type AuthUser } from "@/lib/auth";

export const Route = createFileRoute("/utthan-manager-login")({
  component: UtthanManagerLogin,
});

function UtthanManagerLogin() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(readAuthSession()?.user ?? null);
  }, []);

  return (
    <LoginPage
      heading="उत्थान कोचिंग प्रबंधक लॉगिन"
      subtitle="कोचिंग प्रबंधन, छात्रों और संचालन के लिए सुरक्षित प्रवेश।"
      buttonText="प्रबंधक लॉगिन"
      loginType="utthan_manager"
      emailPlaceholder="manager@example.com"
      loggedInUser={user?.loginType === "utthan_manager" ? user : null}
      dashboardLabel="Utthan Coaching Manager"
      onSuccess={(nextUser) => {
        setUser(nextUser);
        const session = readAuthSession();
        if (session) {
          redirectToAdminDashboard(session);
        }
      }}
    />
  );
}
