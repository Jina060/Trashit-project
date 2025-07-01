// Footer.tsx
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#86efac] text-trashBlue py-10 px-4 md:px-20">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo and Mission */}
        <div className="">
          <h2 className="text-2xl font-bold mb-3">TrashIt</h2>
          <p className="text-sm leading-relaxed">
            Making waste management easy, efficient, and eco-friendly. Join us in building a cleaner tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div className="ml-12">
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#services" className="hover:underline">Our Services</a></li>
            <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@trashit.com" className="hover:underline">support@trashit.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:underline">+237 679-693-831</a></li>
            <li>Location: Buea, Cameroon</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm border-t-2 border-white/40 pt-4">
        &copy; {new Date().getFullYear()} TrashIt. All rights reserved.
      </div>
    </footer>
  );
}
