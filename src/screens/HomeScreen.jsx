import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import config from '../data/eventConfig.json';

export default function HomeScreen() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // Event start date from config
        const eventDate = new Date(config.meta.startDate).getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ days, hours, minutes });
            } else {
                setTimeLeft(null);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Check every minute

        return () => clearInterval(timer);
    }, []);

    // Helper to safely split the event Name into Title / Subtitle if it contains spaces
    const words = config.meta.eventName.split(' ');
    const titleFirstHalf = words.slice(0, words.length > 2 ? words.length - 2 : 1).join(' ');
    const titleSecondHalf = words.slice(words.length > 2 ? words.length - 2 : 1).join(' ');

    return (
        <div className="home-screen">
            {/* Hero Section with Background Image */}
            <div
                className="hero-section flex flex-col items-center justify-center text-white"
                style={config.branding.heroBackground ? { backgroundImage: `url(${config.branding.heroBackground})` } : {}}
            >
                <div className="hero-overlay"></div>

                <div className="hero-content flex flex-col items-center text-center">
                    {config.branding.heroImage && (
                        <img
                            src={config.branding.heroImage}
                            alt="Event Hero"
                            className="hero-logo drop-shadow-lg mb-6"
                            style={{ height: '40px', width: 'auto' }}
                        />
                    )}
                    <h1 className="hero-title drop-shadow-xl text-shadow">
                        {titleFirstHalf} <br />
                        <span className="text-blue drop-shadow-md" style={{ color: config.branding.colors.primary }}>{titleSecondHalf}</span>
                    </h1>

                    <div className="event-meta flex flex-col gap-2 mt-4 drop-shadow-xl text-white font-bold text-shadow-strong">
                        <div className="meta-item flex items-center justify-center gap-2">
                            <Calendar size={18} color={config.branding.colors.primary} />
                            <span>{config.meta.dates}</span>
                        </div>
                        <div className="meta-item flex items-center justify-center gap-2">
                            <MapPin size={18} color={config.branding.colors.primary} />
                            <span>{config.meta.location}</span>
                        </div>
                    </div>

                    <p className="hero-desc mt-6 font-bold drop-shadow-xl text-light-fixed text-shadow-strong whitespace-pre-line">
                        {config.meta.eventSubtitle}
                    </p>

                    <div className="hero-actions flex flex-col w-full gap-4 mt-8">
                        <button className="btn-primary" onClick={() => navigate('/schedule')} style={{ backgroundColor: config.branding.colors.primary, borderColor: config.branding.colors.primary }}>
                            Event Schedule &rarr;
                        </button>
                    </div>

                    {/* Countdown Timer */}
                    {timeLeft && (
                        <div className="mt-10 flex gap-4 drop-shadow-2xl text-light-fixed animate-fade-in">
                            <div className="flex flex-col items-center bg-black-60 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white border-opacity-30 shadow-2xl">
                                <span className="text-sm font-bold uppercase tracking-widest mb-1 opacity-90" style={{ color: config.branding.colors.primary }}>Days</span>
                                <span className="text-5xl font-black tracking-tight">{timeLeft.days}</span>
                            </div>
                            <div className="flex flex-col items-center bg-black-60 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white border-opacity-30 shadow-2xl">
                                <span className="text-sm font-bold uppercase tracking-widest mb-1 opacity-90" style={{ color: config.branding.colors.primary }}>Hours</span>
                                <span className="text-5xl font-black tracking-tight">{timeLeft.hours}</span>
                            </div>
                            <div className="flex flex-col items-center bg-black-60 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white border-opacity-30 shadow-2xl">
                                <span className="text-sm font-bold uppercase tracking-widest mb-1 opacity-90" style={{ color: config.branding.colors.primary }}>Mins</span>
                                <span className="text-5xl font-black tracking-tight">{timeLeft.minutes}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Section */}
            {config.meta.stats && config.meta.stats.length > 0 && (
                <div className="stats-section grid-2x2 gap-6 mt-8">
                    {config.meta.stats.map((stat, index) => (
                        <div key={index} className="stat-card flex flex-col items-center" style={stat.span ? { gridColumn: `span ${stat.span}` } : {}}>
                            <span className="stat-number">{stat.number}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Venue Section (Celeros Westplain) */}
            {config.contact.venue && (
                <div className="venue-section mt-8 mb-4">
                    <h3 className="section-title">Event Venue</h3>
                    <a
                        href={config.contact.venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-card-hero mt-4 block"
                        style={config.contact.venue.image ? { backgroundImage: `url(${config.contact.venue.image})` } : {}}
                    >
                        <div className="venue-hero-overlay flex flex-col justify-end p-5">
                            <h4 className="text-white font-bold text-xl mb-1 drop-shadow-md">{config.contact.venue.name}</h4>
                            <p className="text-white text-opacity-100 text-sm drop-shadow-md font-medium">{config.contact.venue.address}</p>
                        </div>
                    </a>
                </div>
            )}

            {/* Accommodation Section (Hyatt) */}
            {config.contact.accommodation && (
                <div className="venue-section mt-8 mb-6">
                    <h3 className="section-title">Hotel / Accommodation</h3>
                    <a
                        href={config.contact.accommodation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-card-hero mt-4 block"
                        style={config.contact.accommodation.image ? { backgroundImage: `url(${config.contact.accommodation.image})` } : {}}
                    >
                        <div className="venue-hero-overlay flex flex-col justify-end p-5">
                            <h4 className="text-white font-bold text-xl mb-1 drop-shadow-md">{config.contact.accommodation.name}</h4>
                            <p className="text-white text-opacity-100 text-sm drop-shadow-md font-medium">{config.contact.accommodation.address}</p>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
}
