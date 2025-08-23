import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { BsShieldCheck } from 'react-icons/bs';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <h5 className="text-xl font-bold text-blue-400 mb-2">KiloToGo</h5>
              <p className="text-gray-300">La marketplace des kilos entre particuliers</p>
            </div>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-400" /> Paris, France
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-400" /> contact@kilotogo.com
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-2 text-blue-400" /> +33 1 23 45 67 89
              </p>
            </div>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h6 className="text-lg font-semibold text-white mb-4 border-b border-blue-400 pb-2">Navigation</h6>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Accueil</a></li>
              <li><a href="/annonces" className="text-gray-300 hover:text-blue-400 transition-colors">Kilos en Vente</a></li>
              <li><a href="/creerannonce" className="text-gray-300 hover:text-blue-400 transition-colors">Vendre des Kilos</a></li>
              <li><a href="/conformite" className="text-gray-300 hover:text-blue-400 transition-colors">Conformité</a></li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h6 className="text-lg font-semibold text-white mb-4 border-b border-blue-400 pb-2">Légal</h6>
            <ul className="space-y-2">
              <li>
                <a href="/mentions-legales" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <MdOutlinePrivacyTip className="mr-2 text-blue-400" /> Mentions légales
                </a>
              </li>
              <li>
                <a href="/confidentialite" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <BsShieldCheck className="mr-2 text-blue-400" /> Politique de confidentialité
                </a>
              </li>
              <li><a href="/cgv" className="text-gray-300 hover:text-blue-400 transition-colors">CGV</a></li>
              <li><a href="/cgu" className="text-gray-300 hover:text-blue-400 transition-colors">CGU</a></li>
            </ul>
          </div>
          
          {/* Social & Newsletter Column */}
          <div>
            <h6 className="text-lg font-semibold text-white mb-4 border-b border-blue-400 pb-2">Nous suivre</h6>
            <div className="flex space-x-4 mb-6">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Email" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <FaEnvelope />
              </a>
            </div>
            
            <div className="newsletter">
              <p className="text-sm text-gray-300 mb-2">Abonnez-vous à notre newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  className="flex-grow px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                  placeholder="Votre email" 
                  aria-label="Votre email"
                />
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
                  type="button"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} KiloToGo - Tous droits réservés.{" "}
            <span className="block sm:inline">Plateforme de mise en relation entre particuliers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;