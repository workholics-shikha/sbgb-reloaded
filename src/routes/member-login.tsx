import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/components/ui/LoginPage";

export const Route = createFileRoute("/member-login")({
  component: MemberLogin,
});

function MemberLogin() {
  return (
    <LoginPage
      heading="अपने सदस्य खाते में लॉगिन करें"
      subtitle="अपने प्रोफ़ाइल, गतिविधियों और सदस्य सेवाओं तक पहुँचने हेतु लॉगिन करें।"
      buttonText="सदस्य लॉगिन"
    />
  );
}