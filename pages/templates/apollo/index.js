import React from 'react';
import { useRef } from 'react';
import ApolloPlayIcon from './ApolloPlayIcon';
import useAnimatedFeatures from './useAnimatedFeatures ';
import ApolloFeaturesSection from './ApolloFeaturesSection';

const apolloFeatures1Data = [
    {
        src: "/images/templates/apollo/apollo-features1-feature1.png",
        title: "Ready to Use Applications",
        description: "Mail, File System, Tasks, Calendar, Blog and Chat are the sample applications to get started with ease."
    },
    {
        src: "/images/templates/apollo/apollo-features1-feature2.png",
        title: "E-Commerce Pages",
        description: "Apollo offers E-commerce pages to kickstart your e-commerce project powered by PrimeBlocks."
    },
    {
        src: "/images/templates/apollo/apollo-features1-feature3.png",
        title: "Ready to Use Pages",
        description: "Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app."
    },
]

const apolloFeatures2Data = [
    {
        title: "Fully Responsive",
        description: "Apollo is crafted to provide optimal viewing and interaction experience for a wide range of devices.",
        src: "/images/templates/apollo/apollo-features2-responsive.png"
    },
    {
        title: "Cross Browser Compatible",
        description: "First class support for Firefox, Safari, Chrome and Edge.",
        src: "/images/templates/apollo/apollo-features2-compatible.png"
    },
    {
        title: "Lifetime Support",
        description: "Apollo has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.",
        src: "/images/templates/apollo/apollo-features2-lifetime.png"
    },
    {
        title: "Customizable Design",
        description: "Fully customizable with a mixture of Sass and CSS variables.",
        src: "/images/templates/apollo/apollo-features2-customizable.png"
    },
    {
        title: "Top Notch Quality",
        description: "Superior standards with 100% compatibility for strict mode and linting tools.",
        src: "/images/templates/apollo/apollo-features2-quality.png"
    },
    {
        title: "Mobile Experience",
        description: "Touch optimized enhanced mobile experience with responsive design.",
        src: "/images/templates/apollo/apollo-features2-mobile.png"
    }
];

const apolloRelatedData = [
    {
        src: "/images/templates/related-atlantis.png",
        href: ""
    },
    {
        src: "/images/templates/related-avalon.png",
        href: ""
    },
    {
        src: "/images/templates/related-diamond.png",
        href: ""
    },
]

const animationFeaturesData1 = [
    {
        id: 1,
        title: "PrimeFlex CSS Utilities",
        description: "PrimeFlex is a CSS utility library featuring various helpers such as a grid system, flexbox, spacing, elevation and more.",
        src: "/images/templates/apollo/features-animation-utilities.png"
    },
    {
        id: 2,
        title: "PrimeBlocks",
        description: "Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.",
        src: "/images/templates/apollo/features-animation-blocks.png"
    },
    {
        id: 3,
        title: "PrimeIcons",
        description: "Apollo ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.",
        src: "/images/templates/apollo/features-animation-icons.png"
    },
    {
        id: 4,
        title: "Figma File",
        description: "Apollo uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeVue UI components are excluded from the Apollo Figma file as they are available in PrimeOne for Figma only.",
        src: "/images/templates/apollo/features-animation-figma.png"
    },
]

const animationFeaturesData2 = [
    {
        id: 1,
        title: "Light / Dark / Dim Modes",
        description: "Apollo has 3 display modes to choose from; Light, Dim and Dark.",
        src: "/images/templates/apollo/features-animation-darkmode.png"
    },
    {
        id: 2,
        title: "Component Themes",
        description: "Apollo offers 24 built-in component themes and creating your own theme is a matter of defining couple of sass variables.",
        src: "/images/templates/apollo/features-animation-component-themes.png"
    },
    {
        id: 3,
        title: "7 Menu Orientations",
        description: "Static, Overlay, Slim, Slim+, Reveal, Drawer and Horizontal are the available menu layouts depending on your preference.",
        src: "/images/templates/apollo/features-animation-orientations.png",
        type: "inline-animation",
        inlineFeaturesData: [
            {
                id:1,
                title:"Static",
                src: "/images/templates/apollo/Static.png",
            },
            {
                id:2,
                title:"Slim",
                src: "/images/templates/apollo/Slim.png",
            },
            {
                id:3,
                title:"Reveal",
                src: "/images/templates/apollo/Reveal.png",
            },
            {
                id:4,
                title:"Horizontal",
                src: "/images/templates/apollo/Horizontal.png",
            },
            {
                id:5,
                title:"Overlay",
                src: "/images/templates/apollo/Overlay.png",
            },
            {
                id:6,
                title:"Slim+",
                src: "/images/templates/apollo/Slim+.png",
            },
            {
                id:7,
                title:"Drawer",
                src: "/images/templates/apollo/Drawer.png",
            },
        ],
    },
    {
        id: 4,
        title: "Menu Themes",
        description: "Stunning theming for the main menu with 3 alternatives; Color Scheme, Primary Color and Transparent.",
        src: "/images/templates/apollo/features-animation-menu-themes.png"
    },
]

const ApolloSeparator = () => {
    return (
        <div className='' style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span className='' style={{ flex: "1", height: "1px", backgroundColor: "var(--surface-border)" }}></span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3rem", width: "3rem", background: "#FFF", borderRadius: "2.5rem", border: "1px solid var(--surface-border)" }}>
                <span style={{ padding: "0.625rem 0.75rem 0.875rem 0.75rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.3576 23.9999L7.64711 18.0474L5.27539 23.9999H10.3576Z" fill="#212121" />
                        <path d="M15.8454 18.0474L18.5559 23.9999H13.4736L15.8454 18.0474Z" fill="#212121" />
                        <path d="M12.0043 0L0.000976562 23.937H4.05014L12.0048 6.94625L19.7995 23.937H24.009L12.0043 0Z" fill="#212121" />
                    </svg>
                </span>
            </span>
            <span className='' style={{ flex: "1", height: "1px", backgroundColor: "var(--surface-border)" }}></span>
        </div>
    )
}

const ApolloPage = () => {

    return (
        <div className='apollo'>
            <div className='apollo-hero'>
                <img className='apollo-hero-pattern' src='/images/templates/apollo/apollo-hero-pattern.png' alt='Apollo Pattern' />
                <img className='apollo-hero-rectangle1' src='/images/templates/apollo/apollo-hero-rectangle1.png' alt='Apollo Pattern' />
                <img className='apollo-hero-light' src='/images/templates/apollo/apollo-hero-light.png' alt='Apollo Pattern' />
                <div className='apollo-hero-card'>
                    <img className='apollo-hero-card-logo' src='/images/templates/apollo/apollo-hero-logo.svg' alt='Apollo Logo' />
                    <p>Angular CLI template with mode options, menu layouts, sample apps, pre-made pages, and 24 PrimeNG themes.</p>
                    <div className='apollo-hero-card-buttons'>
                        <button className='apollo-hero-card-buttons-btn1'>Live Demo</button>
                        <button className='apollo-hero-card-buttons-btn2'>Buy Now</button>
                    </div>
                    <div className='apollo-hero-card-links'>
                        <a href='#'>
                            <i className="pi pi-github" style={{ fontSize: '1rem' }}></i>
                            <span>Get Support</span>
                        </a>
                        <a href='#'>
                            <i className="pi pi-book" style={{ fontSize: '1rem' }}></i>
                            <span>Read Doc</span>
                        </a>
                    </div>
                </div>
                <img className='apollo-hero-dashboard1' src='/images/templates/apollo/apollo-hero-dashboard1.png' alt='Dashboard Image 1' />
                <img className='apollo-hero-dashboard2' src='/images/templates/apollo/apollo-hero-dashboard2.png' alt='Dashboard Image 2' />
            </div>
            <ApolloSeparator />
            <div className='apollo-youtube'>
                <div className='template-youtube'>
                    <div className='template-youtube-title'>
                        <h2>Integration with</h2>
                        <h2>Existing Vite Applications</h2>
                    </div>
                    <div className='template-youtube-description'>
                        Only the folders that are related to the layout needs to move in to your project. We‘ve already created a short tutorial with details for Sakai Vue. The both templates have the same implementation.
                    </div>
                    <div className='template-youtube-screen'>
                        <div className='template-youtube-screen-blur'>
                            <div className='template-youtube-screen-play'>
                                <ApolloPlayIcon />
                            </div>
                        </div>
                        <img src="/images/templates/apollo/apollo-youtube-screen.png" alt="Apollo Youtube Screen"></img>
                    </div>
                </div>
            </div>
            <ApolloSeparator />
            <ApolloFeaturesSection featuresData={animationFeaturesData2} />
            <ApolloSeparator />
            <div className='apollo-features1'>
                <div className='template-features1'>
                    {apolloFeatures1Data.map((data, i) => (
                        <div key={i} className='template-features1-card'>
                            <div className='template-features1-card-top'>
                                <img src={data.src} alt={data.title}></img>
                            </div>
                            <div className='template-features1-card-bottom'>
                                <h5 className='template-features1-card-bottom-title'>
                                    {data.title}
                                </h5>
                                <p className='template-features1-card-bottom-description'>
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ApolloSeparator />
            <div className='apollo-configuration'>
                <div className='template-configuration'>
                    <div className='template-configuration-screen'>
                        <div className='template-configuration-screen-top'>
                            <div className='template-configuration-screen-top-close template-configuration-screen-top-circle'></div>
                            <div className='template-configuration-screen-top-minimize template-configuration-screen-top-circle'></div>
                            <div className='template-configuration-screen-top-zoom template-configuration-screen-top-circle'></div>
                        </div>
                        <div className='template-configuration-screen-bottom'>
                            <p>&gt; npm install -g angular-cli</p>
                            <p>&gt; ng new my-apollo-app</p>
                            <p>&gt; cd my-apollo-app</p>
                            <p>&gt; ng serve</p>
                            <img className='template-configuration-screen-bottom-logo' src='/images/templates/angular-3d-logo.png' alt='Angular 3D Logo' />
                        </div>
                    </div>
                    <h3 className='template-configuration-title'>Angular with CLI</h3>
                    <p className='template-configuration-description'>Apollo is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support </p>
                </div>
            </div>
            <ApolloSeparator />
            <ApolloFeaturesSection featuresData={animationFeaturesData1} />
            <ApolloSeparator />
            <div className='apollo-features2'>
                <div className='template-features2'>
                    {apolloFeatures2Data.map((data, i) => (
                        <div key={i} className={`template-features2-card ${i === 1 && "template-features2-card-withMargin"} ${(i != 0 && (i % 2 === 0)) && "template-features2-card-withoutMargin"}`}>
                            <img className='template-features2-card-img' src={data.src} alt={data.title} />
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <ApolloSeparator />
            <div className='apollo-related'>
                <div className='template-related'>
                    <h2 className='template-related-title'>Related Layouts</h2>
                    <div className='template-related-slide'>
                        {apolloRelatedData.map((data, i) => (
                            <a href={data.href} key={i} className='template-related-slide-card'>
                                <img src={data.src} alt={"Related Image " + i} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApolloPage;