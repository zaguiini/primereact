import { Badge } from 'primereact/badge';
//import { StyleClass } from 'primereact/styleclass';
import { classNames } from '@primeuix/utils';
import Link from 'next/link';
//import { useRouter } from 'next/router';
import { useRef } from 'react';

function MenuItem(props) {
    const router = {}; //useRouter();
    const { menuItem, root } = props;

    const btnRef = useRef(null);

    const isActiveRootmenuItem = (rootItem) => {
        //return rootItem.children && !rootItem.children.some((item) => item.to === router.pathname || (item.children && item.children.some((it) => it.to === router.pathname)));
    };

    return (
        <li>
            {menuItem?.href && (
                <Link legacyBehavior href={menuItem.href} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                        {menuItem?.icon && root && (
                            <span className="menu-icon">
                                <i className={menuItem?.icon} />
                            </span>
                        )}
                        <span>{menuItem?.name}</span>
                        {menuItem?.badge && <Badge value={menuItem?.badge} className="ml-auto" />}
                    </a>
                </Link>
            )}
            {menuItem?.to && (
                <Link legacyBehavior href={menuItem?.to} passHref>
                    <a className={classNames({ 'router-link-active': menuItem.to === router.pathname })}>
                        {menuItem?.icon && root && (
                            <span className="menu-icon">
                                <i className={menuItem.icon} />
                            </span>
                        )}
                        <span>{menuItem?.name}</span>
                        {menuItem?.badge && <Badge value={menuItem.badge} className="ml-auto" />}
                    </a>
                </Link>
            )}
            {!root && menuItem.children && <span className="menu-child-category">{menuItem?.name}</span>}
            {menuItem?.children && (
                <div className={classNames('overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out', { hidden: menuItem.children && root && isActiveRootmenuItem(menuItem) })}>
                    <ol>
                        {menuItem.children.map((item, index) => (
                            <MenuItem root={false} menuItem={item} key={`_root${index}`} />
                        ))}
                    </ol>
                </div>
            )}
        </li>
    );
}

export default MenuItem;
