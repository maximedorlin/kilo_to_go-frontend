"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../services/AuthContext';
import { 
  FaEnvelope, 
  FaUser, 
  FaGlobe, 
  FaShoppingBag, 
  FaPlusCircle, 
  FaHome, 
  FaShieldAlt, 
  FaInfoCircle, 
  FaPhoneAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

function NavigationBar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [unreadMessages] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Accueil', icon: <FaHome className="inline mr-2" /> },
    { path: '/web/annonce', label: 'Kilos', sublabel: 'en Vente', icon: <FaShoppingBag className="inline mr-2" /> },
    { path: '/web/annonce/add', label: 'Vendre', sublabel: 'mes Kilos', icon: <FaPlusCircle className="inline mr-2" /> },
    { path: '/web/conformite', label: 'Conformité', icon: <FaShieldAlt className="inline mr-2" /> },
    { path: '/web/a-propos', label: 'À propos', icon: <FaInfoCircle className="inline mr-2" /> },
    { path: '/web/contact', label: 'Contact', icon: <FaPhoneAlt className="inline mr-2" /> }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4">
        {/* Barre principale */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">KiloToGo</span>
            <span className="hidden md:inline text-sm text-gray-500">Transportez plus, dépensez moins</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex flex-col items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.path 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>
                  {link.icon}
                  {link.label}
                </span>
                {link.sublabel && (
                  <span className="text-xs text-gray-500">{link.sublabel}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Boutons droite */}
          <div className="flex items-center space-x-4">
            {/* Messages */}
            <Link 
              href="/web/messages" 
              className="relative p-2 text-gray-700 hover:text-blue-600"
            >
              <FaEnvelope className="text-lg" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Link>

            {/* Langue */}
            <div className="hidden md:block relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FaGlobe className="mr-1" />
                <span>FR</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Français</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">English</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Español</a>
              </div>
            </div>

            {/* Utilisateur */}
            {user ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaUser />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                    {user.email.split('@')[0]}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link 
                    href="/web/mon-profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Mon profil
                  </Link>
                  <Link 
                    href="/web/mes-annonces" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Mes annonces
                  </Link>
                  <Link 
                    href="/web/parametres" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Paramètres
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link 
                  href="/web/login" 
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  Connexion
                </Link>
                <Link 
                  href="/web/inscription" 
                  className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* Bouton mobile */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.path 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span>
                    {link.icon}
                    {link.label} {link.sublabel && ` ${link.sublabel}`}
                  </span>
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href="/web/mon-profil"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="pt-4 pb-2 border-t border-gray-200">
                  <Link
                    href="/web/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-md mb-2"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/web/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavigationBar;