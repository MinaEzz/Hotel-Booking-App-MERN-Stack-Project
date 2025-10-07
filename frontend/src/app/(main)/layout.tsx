import Footer from "@/components/common/footer/Footer.component";
import Header from "@/components/common/header/Header.component";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
