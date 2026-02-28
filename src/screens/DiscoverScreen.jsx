import { useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import discoverData from '../data/discoverData.json';
import config from '../data/eventConfig.json';

export default function DiscoverScreen() {
    const tabs = ['All', 'Eat', 'Things to Do', 'Shopping', 'Nightlife'];
    const [activeTab, setActiveTab] = useState('All');
    const [viewAllEat, setViewAllEat] = useState(false);

    const { placesToEat, thingsToDo, nightlife, shopping, mustSee, disclaimer } = discoverData;

    const shouldShowFullEatList = activeTab === 'Eat' || viewAllEat;
    const displayEatList = shouldShowFullEatList ? placesToEat : placesToEat.slice(0, 7);

    const primaryColor = config.branding.colors.primary;

    return (
        <div className="discover-screen pt-header">
            {/* Disclaimer */}
            <div className="px-4 pt-4 pb-2 text-center text-[10px] text-gray uppercase tracking-widest border-b border-white border-opacity-10">
                {disclaimer || "THIS INFORMATION HERE IS NOT A RECOMMENDATION"}
            </div>

            {/* Scrollable Tabs */}
            <div className="flex overflow-x-auto gap-6 px-4 py-3 border-b border-white border-opacity-10 sticky top-[60px] bg-bg-color z-10">
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setActiveTab(tab);
                            if (tab !== 'All') setViewAllEat(false);
                            window.scrollTo(0, 0);
                            const contentArea = document.querySelector('.content-area');
                            if (contentArea) contentArea.scrollTo(0, 0);
                        }}
                        className={`flex-shrink-0 text-sm font-medium pb-2 transition-colors`}
                        style={{
                            color: activeTab === tab ? primaryColor : undefined,
                            borderBottom: activeTab === tab ? `2px solid ${primaryColor}` : 'none'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="p-4">
                {/* Top Places to Eat */}
                {(activeTab === 'All' || activeTab === 'Eat') && (
                    <>
                        <SectionHeader title="Top Places to Eat" className="mt-2">
                            {!shouldShowFullEatList && (
                                <button
                                    className="text-sm font-medium"
                                    style={{ color: primaryColor }}
                                    onClick={() => setViewAllEat(true)}
                                >
                                    View All
                                </button>
                            )}
                        </SectionHeader>

                        {shouldShowFullEatList ? (
                            <div className="grid grid-cols-2 gap-4 pb-4">
                                {displayEatList.map((place, idx) => (
                                    <div key={idx} className="place-card rounded-2xl bg-white shadow-sm p-2">
                                        <div className="relative h-32 w-full overflow-hidden rounded-xl mb-2 group">
                                            <a href={place.url || `https://www.google.com/search?q=${encodeURIComponent(place.title + " restaurant")}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                                                <img src={place.image} alt={place.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                            </a>
                                        </div>
                                        <div className="px-1 pb-1">
                                            <h3 className="text-sm text-slate-900 font-semibold leading-tight line-clamp-1 mb-1">{place.title}</h3>
                                            <div className="flex gap-2 mb-1">
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded inline-block" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>{place.price}</span>
                                                {place.halal && <span className="bg-[#2ecc71] bg-opacity-20 text-[#2ecc71] text-[10px] font-bold px-1.5 py-0.5 rounded inline-block">HALAL</span>}
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-2">{place.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="places-horizontal-list flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sticky-scroll">
                                {displayEatList.map((place, idx) => (
                                    <div key={idx} className="place-card flex-shrink-0 w-64 rounded-2xl bg-white shadow-sm p-2">
                                        <div className="relative h-36 w-full overflow-hidden rounded-xl mb-3 group">
                                            <a href={place.url || `https://www.google.com/search?q=${encodeURIComponent(place.title + " restaurant")}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                                                <img src={place.image} alt={place.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                            </a>
                                        </div>
                                        <div className="px-2 pb-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-base text-slate-900 font-semibold line-clamp-1">{place.title}</h3>
                                                <div className="flex gap-2">
                                                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>{place.price}</span>
                                                    {place.halal && <span className="bg-[#2ecc71] bg-opacity-20 text-[#2ecc71] text-xs font-bold px-2 py-1 rounded">HALAL</span>}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{place.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Must-See Experience & Things to Do */}
                {(activeTab === 'All' || activeTab === 'Things to Do') && (
                    <>
                        <div className="mt-8">
                            <SectionHeader title="Must-See Experience" />
                        </div>

                        <a href={mustSee.url} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                            <div className="must-see-card relative h-40 rounded-2xl overflow-hidden mb-8 group bg-black">
                                <img src={mustSee.image} alt={mustSee.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-full opacity-60"></div>
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider text-white" style={{ backgroundColor: primaryColor }}>{mustSee.price}</span>
                                </div>
                                <div className="absolute inset-0 p-4 pt-10 flex flex-col justify-end pb-4">
                                    <h3 className="text-2xl text-white font-bold mb-1">{mustSee.title}</h3>
                                    <p className="text-sm text-gray">{mustSee.desc}</p>
                                </div>
                            </div>
                        </a>

                        <div className="mt-8">
                            <SectionHeader title="Things to Do" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {thingsToDo.map((thing, idx) => (
                                <a key={idx} href={thing.url} target="_blank" rel="noopener noreferrer" className="thing-card block group rounded-2xl bg-white shadow-sm p-2">
                                    <div className="h-32 w-full overflow-hidden rounded-xl mb-2">
                                        <img src={thing.image} alt={thing.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="px-1 pb-1">
                                        <h4 className="text-sm text-slate-900 font-semibold leading-tight mb-1">{thing.title}</h4>
                                        <p className="text-xs text-slate-500">{thing.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                )}

                {/* Shopping */}
                {(activeTab === 'All' || activeTab === 'Shopping') && (
                    <>
                        <div className="mt-8">
                            <SectionHeader title="Top Shopping Locations" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pb-4">
                            {shopping.map((shop, idx) => (
                                <a key={idx} href={shop.url} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                                    <div className="place-card rounded-2xl bg-white shadow-sm p-2">
                                        <div className="relative h-32 w-full overflow-hidden rounded-xl mb-2 group">
                                            <img src={shop.image} alt={shop.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        </div>
                                        <div className="px-1 pb-1">
                                            <h3 className="text-sm text-slate-900 font-semibold leading-tight line-clamp-1 mb-1">{shop.title}</h3>
                                            <p className="text-xs text-slate-500 line-clamp-2">{shop.desc}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                )}

                {/* Nightlife */}
                {(activeTab === 'All' || activeTab === 'Nightlife') && (
                    <>
                        <div className="mt-8">
                            <SectionHeader title="Nightlife Spots" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {nightlife.map((spot, idx) => (
                                <a key={idx} href={spot.url} target="_blank" rel="noopener noreferrer" className="thing-card block group rounded-2xl bg-white shadow-sm p-2">
                                    <div className="h-32 w-full overflow-hidden rounded-xl mb-2 relative">
                                        <img src={spot.image} alt={spot.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ color: primaryColor }}>
                                            {spot.price}
                                        </div>
                                    </div>
                                    <div className="px-1 pb-1">
                                        <h4 className="text-sm text-slate-900 font-semibold leading-tight mb-1">{spot.title}</h4>
                                        <p className="text-xs text-slate-500">{spot.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                )}

                {/* Nearby Attractions */}
                {activeTab === 'All' && (
                    <>
                        <div className="mt-8">
                            <SectionHeader title="Nearby Attractions" />
                        </div>

                        <div className="map-card relative h-48 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map Placeholder" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
                            <button
                                className="absolute flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                                style={{ backgroundColor: primaryColor, color: '#FFFFFF' }}
                            >
                                <MapIcon size={18} color="white" />
                                Open Interactive Map
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
