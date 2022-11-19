import react from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout({ children }: { children: react.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
