'use client';
import Footer from '@/components/layout/footer';
import Menu from '@/components/layout/menu';
import Topbar from '@/components/layout/topbar';
import NewsSection from '@/components/news/newssection';
import { classNames } from '@primeuix/utils';
import Head from 'next/head';
//import { useRouter } from 'next/router';
import { PrimeReactContext } from '@primereact/core/config';
import { useContext, useState } from 'react';

// @todo: refactor
export default function Layout({ children }) {
    const [sidebarActive, setSidebarActive] = useState(false);
    // const [configActive, setConfigActive] = useState(false);
    const { ripple, inputStyle } = useContext(PrimeReactContext);
    const { isNewsActive } = {}; //useContext(NewsContext);
    const { isDarkMode, toggleDarkMode } = {}; //useContext(PresetContext);

    //const router = useRouter();

    const wrapperClassName = classNames('layout-wrapper', {
        'layout-news-active': isNewsActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-dark': isDarkMode,
        'layout-light': !isDarkMode
    });

    /*useEffect(() => {
        const handleRouteChangeComplete = (l) => {
            setSidebarActive(false);
        };

        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, []);*/ // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={wrapperClassName}>
            <Head>
                <title>PrimeReact - React UI Component Library</title>
                <meta charSet="UTF-8" />
                <meta name="description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@primereact" />
                <meta name="twitter:title" content="PrimeReact | React UI Component Library" />
                <meta name="twitter:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="PrimeReact | React UI Component Library" />
                <meta property="og:url" content="https://primereact.org" />
                <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                <meta property="og:image" content="https://www.primefaces.org/static/social/primereact-preview.jpg" />
                <meta property="og:ttl" content="604800" />
                <link rel="icon" href="https://primefaces.org/cdn/primereact/images/favicon.ico" type="image/x-icon" />
            </Head>
            <NewsSection />
            <Topbar showConfigurator showMenuButton onMenuButtonClick={() => setSidebarActive(true)} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className={classNames('layout-mask', { 'layout-mask-active': sidebarActive })} onClick={() => setSidebarActive(false)} />
            <div className="layout-content">
                <Menu active={sidebarActive} />
                <div className="layout-content-slot">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
