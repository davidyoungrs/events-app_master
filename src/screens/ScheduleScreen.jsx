import React, { useState, useEffect } from 'react';
import { Play, Calendar, MapPin } from 'lucide-react';
import { loadScheduleData, loadPresentersData } from '../utils/dataLoader';
import config from '../data/eventConfig.json';

import EventCard from '../components/EventCard';
import SpeakerProfile from '../components/SpeakerProfile';
import SectionHeader from '../components/SectionHeader';

export default function ScheduleScreen() {
    const [activeTab, setActiveTab] = useState(1);
    const [scheduleData, setScheduleData] = useState(null);
    const [presentersData, setPresentersData] = useState([]);

    useEffect(() => {
        loadScheduleData().then(data => {
            setScheduleData(data);
            const days = Object.keys(data).map(Number).sort((a, b) => a - b);
            if (days.length > 0 && !days.includes(activeTab)) {
                setActiveTab(days[0]);
            }
        }).catch(err => {
            console.error("Failed to load schedule:", err);
        });

        loadPresentersData().then(data => {
            setPresentersData(data);
        }).catch(err => {
            console.error("Failed to load presenters:", err);
        });
    }, []);

    const finalPresenters = presentersData.filter(p => !p.isSpotlight);
    const spotlightPresenter = presentersData.find(p => p.isSpotlight);

    // If data isn't loaded yet, we render a skeleton or the static parts to keep it "invisible"
    const currentDaySchedule = scheduleData ? scheduleData[activeTab] || [] : [];
    const availableDays = scheduleData ? Object.keys(scheduleData).map(Number).sort((a, b) => a - b) : [1];
    const startDate = new Date(config.meta.startDate);

    return (
        <div className="schedule-screen pt-header">
            {/* Day Tabs */}
            <div className="day-tabs flex w-full">
                {availableDays.map((day) => {
                    const dayDate = new Date(startDate);
                    dayDate.setDate(startDate.getDate() + (day - 1));
                    const dateString = dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

                    return (
                        <button
                            key={day}
                            onClick={() => {
                                setActiveTab(day);
                                window.scrollTo(0, 0);
                                const contentArea = document.querySelector('.content-area');
                                if (contentArea) contentArea.scrollTo(0, 0);
                            }}
                            className={`day-tab flex-1 py-3 text-center transition-all ${activeTab === day ? 'active bg-surface-hover' : ''}`}
                            style={{ borderBottom: activeTab === day ? `2px solid ${config.branding.colors.primary}` : 'none' }}
                        >
                            <span className={`block font-medium ${activeTab === day ? 'text-white' : 'text-gray'}`}>Day {day}</span>
                            <span className={`block text-xs uppercase mt-1 ${activeTab === day ? 'text-blue' : 'text-gray'}`}
                                style={{ color: activeTab === day ? config.branding.colors.primary : undefined }}>
                                {dateString}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="p-4">
                <SectionHeader title="Schedule" />

                <div className="schedule-list flex flex-col gap-4">
                    {currentDaySchedule.map((item, idx) => (
                        <EventCard key={idx} item={item} />
                    ))}
                </div>

                {/* Presenters */}
                {config.features.showSpeakers && (
                    <>
                        <div className="mt-8">
                            <SectionHeader title="Presenters" />
                        </div>

                        <div className="speakers-horizontal-list flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {finalPresenters.map((presenter) => (
                                <SpeakerProfile key={presenter.id} presenter={presenter} />
                            ))}
                        </div>

                        {/* Featured Presenter Spotlight */}
                        {spotlightPresenter && (
                            <div className="spotlight-card flex gap-4 p-5 mt-4 mb-4">
                                <img src={spotlightPresenter.avatar} alt={spotlightPresenter.name} className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <h3 className="text-lg text-white font-semibold">{spotlightPresenter.name}</h3>
                                    <p className="text-xs font-semibold tracking-wider uppercase mt-1" style={{ color: config.branding.colors.primary }}>{spotlightPresenter.role}</p>
                                    <p className="text-sm text-gray mt-2 leading-relaxed">
                                        {spotlightPresenter.bio}
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
