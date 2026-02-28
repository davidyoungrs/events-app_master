import React from 'react';
import config from '../data/eventConfig.json';

export default function SpeakerProfile({ presenter }) {
    return (
        <div className="speaker-card flex-shrink-0 flex flex-col items-center text-center p-4 w-36">
            <img
                src={presenter.avatar}
                alt={presenter.name}
                className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-transparent"
            />
            <h4 className="text-sm text-white font-semibold leading-tight">{presenter.name}</h4>
            <p className="text-xs mt-1" style={{ color: config.branding.colors.primary }}>
                {presenter.role}
            </p>
        </div>
    );
}
