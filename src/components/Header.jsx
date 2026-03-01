import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, ArrowLeft, Search } from 'lucide-react';
import config from '../data/eventConfig.json';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    if (path === '/home') {
        return (
            <header className="app-header home-header flex justify-between items-center w-full">
                <div className="logo flex items-center gap-2">
                    <img src={config.branding.logo} alt={config.meta.eventName} style={{ height: '24px' }} />
                </div>
                <div className="actions flex items-center gap-4">
                    {/* Icons removed as requested */}
                </div>
            </header>
        );
    }

    if (path === '/schedule') {
        return (
            <header className="app-header schedule-header flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <img src={config.branding.logo} alt={config.meta.eventName} style={{ height: '24px' }} />
                </div>
                {/* Bell icon removed as requested */}
            </header>
        );
    }

    if (path === '/discover') {
        return (
            <header className="app-header discover-header flex justify-between items-center w-full">
                <div style={{ width: '40px' }}></div> {/* Placeholder for centering */}
                <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Discover {config.meta.location.split(',')[0]}</h1>
                <button className="search-btn">
                    <Search size={24} color={config.branding.colors.text} />
                </button>
            </header>
        );
    }

    // Fallback
    return (
        <header className="app-header">
            <h1>{config.meta.eventName}</h1>
        </header>
    );
}
