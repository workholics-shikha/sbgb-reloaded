import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LoginPage from "@/components/ui/LoginPage";
import { readAuthSession, redirectToAdminDashboard, type AuthUser } from "@/lib/auth";

export const Route = createFileRoute("/admin-login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const session = readAuthSession();
    const currentUser = session?.user ?? null;

    setUser(currentUser);

    if (session?.user.loginType === "admin") {
      redirectToAdminDashboard(session);
    }
  }, []);

  return (
    <LoginPage
      heading="SBGBT प्रबंधक लॉगिन"
      subtitle="केवल अधिकृत प्रशासकों के लिए सुरक्षित प्रवेश।"
      buttonText="लॉगिन करें"
      loginType="admin"
      emailPlaceholder="sbgbtadmin@gmail.com"
      loggedInUser={user?.loginType === "admin" ? user : null}
      dashboardLabel="SBGBT Admin"
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
