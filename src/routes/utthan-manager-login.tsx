import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/components/ui/LoginPage";

export const Route = createFileRoute("/utthan-manager-login")({
  component: UtthanManagerLogin,
});

function UtthanManagerLogin() {
  return (
    <LoginPage
      heading="उत्थान कोचिंग प्रबंधक लॉगिन"
      subtitle="कोचिंग प्रबंधन, छात्रों, बैचों और उपस्थिति के संचालन हेतु सुरक्षित प्रवेश।"
      buttonText="प्रबंधक लॉगिन"
    />
  );
}