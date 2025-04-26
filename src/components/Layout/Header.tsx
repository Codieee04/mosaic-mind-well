
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Menu } from 'lucide-react';
import { AuthContext } from '../../App';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const Header = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setAuthenticated(false);
    toast.success('You have been logged out');
    navigate('/auth');
  };

  return (
    <header className="bg-harmony py-4 px-6 shadow-md sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/chat" className="flex items-center">
          <span className="text-white font-semibold text-xl">Mind<span className="text-freshstart font-bold">Mosaic</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink to="/chat" label="Chat" />
          <NavLink to="/journal" label="Journal" />
          <NavLink to="/goals" label="Goals" />
          <NavLink to="/tracker" label="Mood Tracker" />
          <NavLink to="/community" label="Community" />
          <NavLink to="/forum" label="Forum" />
          <NavLink to="/resources" label="Resources" />
          
          <Button 
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-white hover:text-harmony"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </nav>
        
        {/* Mobile Navigation Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-white p-2">
              <Menu size={24} />
              <span className="sr-only">Open Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <MobileNavLink to="/chat" label="Chat" />
              <MobileNavLink to="/journal" label="Journal" />
              <MobileNavLink to="/goals" label="Goals" />
              <MobileNavLink to="/tracker" label="Mood Tracker" />
              <MobileNavLink to="/community" label="Community" />
              <MobileNavLink to="/forum" label="Forum" />
              <MobileNavLink to="/resources" label="Resources" />
              
              <Button 
                variant="outline"
                className="justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="text-white hover:text-freshstart transition-colors duration-300"
  >
    {label}
  </Link>
);

// Mobile Nav Link
const MobileNavLink = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="flex w-full py-2 text-deepblue hover:text-rustred transition-colors duration-300"
  >
    {label}
  </Link>
);

export default Header;
