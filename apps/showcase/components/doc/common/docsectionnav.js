'use client';
import { useEventListener } from '@primereact/hooks';
import { classNames, find, findSingle, getHeight, getOffset, getWindowScrollTop, isNotEmpty } from '@primeuix/utils';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function DocSectionNav({ docs = [] }) {
    //const router = useRouter();
    const [activeId, setActiveId] = useState(null);
    const navRef = useRef(null);
    const topbarHeight = useRef(0);
    const isScrollBlocked = useRef(false);
    const scrollEndTimer = useRef(undefined);

    const [bindDocumentScrollListener] = useEventListener({
        target: 'window',
        type: 'scroll',
        listener: (event) => {
            if (!isScrollBlocked.current) {
                const labels = find(event.target, ':is(h1,h2,h3).doc-section-label');
                const windowScrollTop = getWindowScrollTop();

                labels.forEach((label) => {
                    const { top } = getOffset(label);
                    const threshold = getThreshold(label);

                    if (top - threshold <= windowScrollTop) {
                        const link = findSingle(label, 'a');

                        setActiveId(link.id);
                    }
                });
            }

            clearTimeout(scrollEndTimer.current);
            scrollEndTimer.current = setTimeout(() => {
                isScrollBlocked.current = false;

                const activeItem = findSingle(navRef.current, '.active-navbar-item');

                activeItem && activeItem.scrollIntoView({ block: 'nearest', inline: 'start' });
            }, 50);
        }
    });

    const onClick = (id) => {
        setActiveId(id);
        setTimeout(() => {
            scrollToLabelById(id, 'smooth');
            isScrollBlocked.current = true;
        }, 1);
    };

    const scrollToLabelById = (id, behavior) => {
        const label = document.getElementById(id);

        label && label.parentElement.scrollIntoView({ block: 'start', behavior });
    };

    const getThreshold = (label) => {
        if (!topbarHeight.current) {
            const topbar = findSingle(document.body, '.layout-topbar');

            topbarHeight.current = topbar ? getHeight(topbar) : 0;
        }

        return topbarHeight.current + getHeight(label) * 1.5;
    };

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const hasHash = isNotEmpty(hash);
        const id = hasHash ? hash : (docs[0] || {}).id;

        setActiveId(id);
        hasHash && scrollToLabelById(id);
        bindDocumentScrollListener();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const createItem = ({ id, label, children }, level = 0) => {
        return (
            <li key={id} className={classNames('navbar-item', { 'active-navbar-item': activeId === id })}>
                <div className="navbar-item-content">
                    <Link href={`#${id}`}>
                        <button className="px-link" onClick={() => onClick(id)} title={label}>
                            {label}
                        </button>
                    </Link>
                </div>

                <ul>{level !== 1 && children && children.map((child) => createItem(child, 1))}</ul>
            </li>
        );
    };

    return (
        <ul ref={navRef} className="doc-section-nav">
            {docs.map((item) => createItem(item))}
        </ul>
    );
}
