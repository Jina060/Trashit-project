import React from "react";

 const Navbar = () => {
    return (
        <div className=""> 
        <nav className=" px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white to-green-200 shadow-md
">
            {/* LOGO */}
            <div className="flex justify-between items-center ">
                 <img src="/trashlogo.png" alt="Logo" className="w-20"/>
                 <div></div>
            </div>

           { /*Navigation Links*/}
           <div className="space-x-8 hidden md:flex text-trashBlue font-medium">
            <a href="#home" className="hover:text-trashGreen">Home</a>
            <a href="#AboutUs" className="hover:text-trashGreen">About Us</a>
            <a href="#ContactUs" className="hover:text-trashGreen">Contact</a>
           </div>

           {/*Auth*/}
           <div className="space-x-4">
            <button className="text-trashBlue font-medium hover:underline">Login</button>
            <button className="bg-trashBlue text-trashGreen px-4 py-2 hover:bg-green-700 rounded-xl text-center">Sign Up</button>
           </div>
        </nav>
        </div>
    );
 };

 export default Navbar;