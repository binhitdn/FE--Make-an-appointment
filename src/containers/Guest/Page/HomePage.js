import Footer from "../ContainerPage/Footer";
import HandBookss from "./Sections/HandBookss";
import Service from "./Sections/Service";
import Specialty from "./Sections/Specialty";
import TopDoctor from "./Sections/TopDoctor";
import TopHospital from "./Sections/TopHospital";
import Reviewer from "./Slider/Reviewer";
import Slider from "./Slider/Slider";

function HomePage() {
    return (
        <>
        
            <Slider />
            <Service />
            <Specialty />
            <TopDoctor />
            <TopHospital />
            <HandBookss />
            <Reviewer />
            {/* style={{height: "500px", width: "100%"}}
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15342.933584393664!2d108.252355!3d15.9752931!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology.!5e0!3m2!1sen!2s!4v1667755335185!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            <Footer />
            
            
            
        </>
    );
}
export default HomePage;