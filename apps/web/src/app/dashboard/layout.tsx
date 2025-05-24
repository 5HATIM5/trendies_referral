import Navbar from "../components/Global/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
