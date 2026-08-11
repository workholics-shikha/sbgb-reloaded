import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LoginPage from "@/components/ui/LoginPage";
import { readAuthSession, type AuthUser } from "@/lib/auth";

export const Route = createFileRoute("/sbgbp-manager-login")({
  component: SbgbpManagerLogin,
});

function SbgbpManagerLogin() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(readAuthSession()?.user ?? null);
  }, []);

  return (
    <LoginPage
      heading="SBGBP प्रबंधक लॉगिन"
      subtitle="SBGBP registration और management access के लिए सुरक्षित प्रवेश।"
      buttonText="प्रबंधक लॉगिन"
      loginType="sbgbp_manager"
      emailPlaceholder="spgbpmanager@gmail.com"
      loggedInUser={user?.loginType === "sbgbp_manager" ? user : null}
      dashboardLabel="SBGBP Manager"
      onSuccess={setUser}
      onLogout={() => setUser(null)}
    />
  );
}
