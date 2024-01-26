import React from 'react';
import TemplateFeatures from '@/components/templates/TemplateFeatures';
import TemplateConfiguration from '@/components/templates/TemplateConfiguration';
import TemplateRelated from '@/components/templates/TemplateRelated';
import TemplateHero from '@/components/templates/templateHero/TemplateHero';
import TemplateFeaturesAnimation from '@/components/templates/templateFeaturesAnimation';
import CaliforniaLogo from './CaliforniaLogo';
import TemplateSeparator from '@/components/templates/TemplateSeparator';

const apolloFeatures2Data = [
    {
        title: 'Fully Responsive',
        description: 'Diamond is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
        src: '/images/templates/california/california-features2-responsive.png'
    },
    {
        title: 'Cross Browser Compatible',
        description: 'First class support for Firefox, Safari, Chrome and Edge.',
        src: '/images/templates/apollo/apollo-features2-compatible.png'
    },
    {
        title: 'Lifetime Support',
        description: 'Diamond has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
        src: '/images/templates/apollo/apollo-features2-lifetime.png'
    },
    {
        title: 'Customizable Design',
        description: 'Fully customizable with a mixture of Sass and CSS variables.',
        src: '/images/templates/apollo/apollo-features2-customizable.png'
    },
    {
        title: 'Ready to Use Pages',
        description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.',
        src: '/images/templates/california/california-features2-ready.png'
    },
    {
        title: 'Mobile Experience',
        description: 'Touch optimized enhanced mobile experience with responsive design.',
        src: '/images/templates/california/california-features2-mobile.png'
    }
];

const apolloRelatedData = [
    {
        src: '/images/templates/babylon-react.jpg',
        href: 'https://www.primefaces.org/layouts/babylon-react'
    },
    {
        src: '/images/templates/apollo-react.jpg',
        href: '/templates/apollo'
    },
    {
        src: '/images/templates/roma-react.jpg',
        href: 'https://www.primefaces.org/layouts/roma-react'
    }
];

const animationFeaturesData1 = [
    {
        id: 1,
        title: 'PrimeFlex CSS Utilities',
        description: 'PrimeFlex is a CSS utility library featuring various helpers such as a grid system, flexbox, spacing, elevation and more.',
        src: '/images/templates/california/features-animation-utilities.png'
    },
    {
        id: 2,
        title: 'PrimeBlocks',
        description: 'Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.',
        src: '/images/templates/california/features-animation-blocks.png'
    },
    {
        id: 3,
        title: 'PrimeIcons',
        description: 'Diamond ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
        src: '/images/templates/california/features-animation-icons.png'
    },
];

const animationFeaturesData2 = [
    {
        id: 1,
        title: 'Mega Menu',
        description: 'California offers a new mega option as an intuitive way to enhance the user experience across different devices.',
        src: '/images/templates/california/features-animation-mega.png'
    },
    {
        id: 2,
        title: 'Special and Solid Themes',
        description: 'California Theme is highly customizable, there are 20 built-in themes and creating your own theme is a matter of defining couple of sass variables.',
        src: '/images/templates/california/features-animation-theme.png'
    },
    {
        id: 3,
        title: '3 Different Menu Color ',
        description: 'Choose from Static and Slim menu orientations.',
        src: '/images/templates/california/features-animation-color.png'
    }
];

const apolloFeatures1Data = [
    {
        src: '/images/templates/avalon/avalon-features1-feature1.png',
        title: 'Ready to Use Applications',
        description: 'Mail, File System, Tasks, Calendar, Blog and Chat are the sample applications to get started with ease.'
    },
    {
        src: '/images/templates/avalon/avalon-features1-feature2.png',
        title: 'E-Commerce Pages',
        description: 'Avalon offers E-commerce pages to kickstart your e-commerce project powered by PrimeBlocks.'
    },
    {
        src: '/images/templates/avalon/avalon-features1-feature3.png',
        title: 'Ready to Use Pages',
        description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.'
    }
];


const templateHeroData = {
    logo: <CaliforniaLogo />,
    pattern: '/images/templates/california/california-hero-pattern.png',
    rectangle: true,
    dashboard1: '/images/templates/california/california-hero-dashboard1.png',
    dashboard2: '/images/templates/california/california-hero-dashboard2.png',
    description: 'A modern and easy to use premium application template with various color schemes.Based on flat design language, it is fully responsive, touch optimized, built with SASS, CSS3 and HTML5.',
    liveHref: 'https://diamond.primereact.org',
    docHref: 'https://diamond.primereact.org/documentation'
};

const CaliforniaSeparator = () => {
    return (
        <TemplateSeparator
            separatorLogo={
                <svg width="24" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0876 0L13.9043 2.1136L12.6009 3.85069L12.0386 3.42929L12.0363 13.583L16.231 15.1112L19.1018 1.34789L22.1539 4.382L21.3935 6.14085L20.4104 5.71186L17.8451 18.0106L12.0363 15.8953L12.0345 24H10.134L10.1358 15.886L4.30245 18.0106L1.74345 5.71186L0.450113 6.14085L0 4.382L3.05322 1.34691L5.91759 15.1112L10.1358 13.5737L10.1382 3.42619L9.57319 3.85069L8.26983 2.1136L11.0876 0Z" fill="url(#paint0_linear_1894_9038)" />
                    <defs>
                        <linearGradient id="paint0_linear_1894_9038" x1="1107.7" y1="0" x2="1107.7" y2="2400" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#5CACF4" />
                            <stop offset="1" stop-color="#1B74C5" />
                        </linearGradient>
                    </defs>
                </svg>
            }
        />
    );
};

const CaliforniaPage = () => {
    const featuresAnimationTitle = (
        <h2>
            Features that the <br />
            Avalon template gives you
        </h2>
    );

    return (
        <div className="california template">
            <TemplateHero {...templateHeroData} />
            <CaliforniaSeparator />
            <TemplateFeaturesAnimation featuresData={animationFeaturesData2} title={featuresAnimationTitle} />
            <CaliforniaSeparator />
            <TemplateConfiguration
                title="Next.js App with No Configuration"
                description="Diamond is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
            />
            <CaliforniaSeparator />
            <TemplateFeaturesAnimation featuresData={animationFeaturesData1} />
            <CaliforniaSeparator />
            <TemplateFeatures featuresData={apolloFeatures2Data} displayType="vertical" />
            <CaliforniaSeparator />
            <TemplateRelated relatedData={apolloRelatedData} />
        </div>
    );
};

export default CaliforniaPage;
