import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MainLayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default MainLayoutPage;
