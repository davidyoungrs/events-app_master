import React from 'react';
import { ExternalLink, Shield, Camera } from 'lucide-react';
import config from '../data/eventConfig.json';
import SectionHeader from '../components/SectionHeader';

export default function InfoScreen() {
    const primaryColor = config.branding.colors.primary;

    return (
        <div className="info-screen pt-header pb-24 min-h-screen bg-bg-color text-white p-6">
            <section className="mb-10">
                <SectionHeader title="Open Source Licenses">
                    <Shield size={20} style={{ color: primaryColor }} />
                </SectionHeader>
                <div className="space-y-4">
                    <LicenseItem
                        name="React"
                        license="MIT License"
                        url="https://github.com/facebook/react/blob/main/LICENSE"
                        primaryColor={primaryColor}
                    />
                    <LicenseItem
                        name="Lucide React"
                        license="ISC License"
                        url="https://github.com/lucide-react/lucide/blob/main/LICENSE"
                        primaryColor={primaryColor}
                    />
                    <LicenseItem
                        name="Tailwind CSS"
                        license="MIT License"
                        url="https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE"
                        primaryColor={primaryColor}
                    />
                    <LicenseItem
                        name="Framer Motion"
                        license="MIT License"
                        url="https://github.com/framer/motion/blob/main/LICENSE"
                        primaryColor={primaryColor}
                    />
                    <LicenseItem
                        name="Vite"
                        license="MIT License"
                        url="https://github.com/vitejs/vite/blob/main/LICENSE"
                        primaryColor={primaryColor}
                    />
                </div>
            </section>

            <section className="mb-10">
                <SectionHeader title="Photo Attributions">
                    <Camera size={20} style={{ color: primaryColor }} />
                </SectionHeader>
                <div className="space-y-6">
                    <AttributionItem
                        source="Unsplash"
                        description="High-quality photography used throughout the Discover and Home screens."
                        url="https://unsplash.com"
                        primaryColor={primaryColor}
                    />
                    <AttributionItem
                        source="Wikipedia / Wikimedia Commons"
                        description="Historical and educational imagery for Houston landmarks."
                        url="https://commons.wikimedia.org"
                        primaryColor={primaryColor}
                    />
                    <AttributionItem
                        source="Pexels"
                        description="Additional architectural and lifestyle photography."
                        url="https://pexels.com"
                        primaryColor={primaryColor}
                    />
                </div>
            </section>
        </div>
    );
}

function LicenseItem({ name, license, url, primaryColor }) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center p-4 bg-surface rounded-xl hover:bg-surface-hover transition-colors group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                <h3 className="font-semibold text-white transition-colors" style={{ color: isHovered ? primaryColor : 'white' }}>{name}</h3>
                <p className="text-xs text-gray">{license}</p>
            </div>
            <ExternalLink size={16} className="text-gray transition-colors" style={{ color: isHovered ? primaryColor : undefined }} />
        </a>
    );
}

function AttributionItem({ source, description, url, primaryColor }) {
    return (
        <div className="p-4 bg-surface rounded-xl border border-white border-opacity-5">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold" style={{ color: primaryColor }}>{source}</h3>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray hover:text-white transition-colors"
                >
                    <ExternalLink size={14} />
                </a>
            </div>
            <p className="text-sm text-gray leading-relaxed">{description}</p>
        </div>
    );
}
