import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Map, Info } from 'lucide-react';
import config from '../data/eventConfig.json';

export default function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/home', show: true },
        { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/schedule', show: true },
        { id: 'discover', label: 'Discover', icon: Map, path: '/discover', show: config.features.showDiscover },
        { id: 'info', label: 'Info', icon: Info, path: '/info', show: config.features.showInfo }
    ].filter(item => item.show);

    return (
        <nav className="bottom-nav flex justify-between items-center w-full">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.id}
                        className={`nav-item flex flex-col items-center justify-center ${isActive ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <item.icon size={24} className="nav-icon" color={isActive ? config.branding.colors.primary : undefined} />
                        <span className="nav-label" style={isActive ? { color: config.branding.colors.primary } : {}}>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
