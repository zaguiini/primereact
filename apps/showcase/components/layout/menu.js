import { classNames } from '@primeuix/utils';
//import { useRouter } from 'next/router';
import { memo } from 'react';
import MenuData from './menu.json';
import MenuItem from './menuitem';

const Menu = memo((props) => {
    //const router = useRouter();
    const menu = MenuData.data.map((data) => {
        const rootItem = { ...data };

        //rootItem.expanded = rootItem.children && rootItem.children.some((item) => item.to === router.pathname || (item.children && item.children.some((it) => it.to === router.pathname)));

        return rootItem;
    });

    const scrollToActiveItem = () => {
        const activeItem = document.querySelector('.router-link-active');

        if (activeItem) {
            activeItem.scrollIntoView({ block: 'center' });
        }
    };

    const sidebarClassName = classNames('layout-sidebar', { active: props.active });

    return (
        <aside className={sidebarClassName}>
            <nav>
                <ol className="layout-menu">
                    {menu.map((item, index) => (
                        <MenuItem menuItem={item} root={true} key={`_root${index}`} />
                    ))}
                </ol>
            </nav>
        </aside>
    );
});

export default Menu;
