import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/components/ui/LoginPage";

export const Route = createFileRoute("/admin-login")({
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <LoginPage
      heading="SBGBP प्रबंधक लॉगिन"
      subtitle="केवल अधिकृत प्रशासकों के लिए सुरक्षित प्रवेश।"
      buttonText="लॉगिन करें"
    />
  );
}