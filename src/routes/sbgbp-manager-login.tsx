import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/components/ui/LoginPage";

export const Route = createFileRoute("/sbgbp-manager-login")({
  component: SBGBTManagerLogin,
});

function SBGBTManagerLogin() {
  return (
    <LoginPage
      heading="SBGBP प्रबंधक लॉगिन"
      subtitle="संस्था के प्रबंधन, सदस्यों और कार्यक्रमों के संचालन हेतु सुरक्षित प्रवेश।"
      buttonText="प्रबंधक लॉगिन"
    />
  );
}