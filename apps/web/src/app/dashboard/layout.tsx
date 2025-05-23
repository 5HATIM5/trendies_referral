import Navbar from "../components/Global/Navbar";
// import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const token = (await cookies()).get('token')?.value;

  // if (!token) {
  //   redirect('/');
  // }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
