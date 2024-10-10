import BottomNavBar from "@/components/BottomNavBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-12 items-center">
      {children}
      {/* <BottomNavBar /> */}
    </div>
  );
}
