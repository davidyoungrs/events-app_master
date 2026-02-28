import React from 'react';
import { Play, MapPin } from 'lucide-react';
import config from '../data/eventConfig.json';

export default function EventCard({ item }) {
    return (
        <div className={`schedule-card flex gap-4 p-4 ${item.isBreak ? 'opacity-80 border-dashed border-surface-hover' : ''}`}>
            <div className={`time-pill flex flex-col items-center justify-center text-center ${item.active ? 'active' : ''}`}>
                <span className="font-medium text-xs leading-tight whitespace-pre-line">{item.time}</span>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        {item.tag && (
                            <span
                                className="live-tag mb-2 inline-block bg-opacity-20 px-2 py-0.5 rounded text-xs font-bold"
                                style={{
                                    color: config.branding.colors.primary,
                                    backgroundColor: `${config.branding.colors.primary}33`
                                }}
                            >
                                {item.tag}
                            </span>
                        )}
                        <h3 className="text-base text-white font-semibold leading-tight">{item.title}</h3>
                    </div>
                    {item.active && <Play size={20} color={config.branding.colors.primary} />}
                </div>

                <div className="flex items-center gap-3 mt-2 text-gray text-sm">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} style={{ color: config.branding.colors.primary }} />
                        <span>{item.location}</span>
                    </div>
                </div>

                {item.presenter && (
                    <div className="flex items-center gap-2 mt-3">
                        {item.avatar && (
                            <img src={item.avatar} alt={item.presenter} className="w-6 h-6 rounded-full object-cover" />
                        )}
                        <span className="text-sm font-medium" style={{ color: config.branding.colors.primary }}>
                            {item.presenter}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
