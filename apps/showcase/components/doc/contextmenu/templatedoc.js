import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { ContextMenu } from '@/components/lib/contextmenu/ContextMenu';
import { ProductService } from '@/service/ProductService';
import { Badge } from 'primereact/badge';
import { useEffect, useRef, useState } from 'react';

export function TemplateDoc(props) {
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const cm = useRef(null);

    const itemTemplate = (item) => (
        <a className="flex items-center px-4 py-2 cursor-pointer">
            <span className={item.icon} />
            <span className="ml-2">{item.label}</span>
            <Badge className="ml-auto" value={item.badge} />
        </a>
    );

    const items = [
        {
            label: 'Favorite',
            icon: 'pi pi-star',
            shortcut: '⌘+D'
        },
        {
            label: 'Add',
            icon: 'pi pi-shopping-cart',
            shortcut: '⌘+A'
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 2,
                    template: itemTemplate
                },
                {
                    label: 'Instagram',
                    icon: 'pi pi-instagram',
                    badge: 3,
                    template: itemTemplate
                }
            ]
        }
    ];

    const onRightClick = (event, id) => {
        if (cm.current) {
            setSelectedId(id);
            cm.current.show(event);
        }
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const code = {
        basic: `
<div className="card flex md:justify-center">
    <ul className="m-0 p-0 list-none border border-surface rounded-border p-4 flex flex-col gap-2 w-full md:w-[30rem]">
        {products.map((product) => (
            <li
                key={product.id}
                className={\`p-2 hover:bg-emphasis rounded-border border border-transparent transition-all duration-200 \${selectedId === product.id && 'border-primary'}\`}
                onContextMenu={(e) => onRightClick(e, product.id)}
            >
                <div className="flex flex-wrap p-2 items-center gap-4">
                    <img className="w-16 shadow shrink-0 rounded-border" src={\`/images/product/\${product.image}\`} alt="product.name" />
                    <div className="flex-1 flex flex-col gap-1">
                        <span className="font-bold">{product.name}</span>
                        <div className="flex items-center gap-2">
                            <i className="pi pi-tag text-sm"></i>
                            <span>{product.category}</span>
                        </div>
                    </div>
                    <span className="font-bold text-surface-900 dark:text-surface-0 ml-8">{product.price}</span>
                </div>
            </li>
        ))}
    </ul>
    <ContextMenu model={items} ref={cm} breakpoint="767px" onHide={() => setSelectedId(undefined)} />
</div>
`,
        javascript: `
import { useState, useRef, useEffect } from 'react';
import { ProductService } from './service/ProductService';
import { ContextMenu } from 'primereact/contextmenu';

export default function TemplateDemo() {
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const cm = useRef(null);
    const items = [
        {
            label: 'Favorite',
            icon: 'pi pi-star',
            shortcut: '⌘+D'
        },
        {
            label: 'Add',
            icon: 'pi pi-shopping-cart',
            shortcut: '⌘+A'
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 2
                },
                {
                    label: 'Instagram',
                    icon: 'pi pi-instagram',
                    badge: 3
                }
            ]
        }
    ];

    const onRightClick = (event, id) => {
      if (cm.current) {
          setSelectedId(id);
          cm.current.show(event);
      }
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div className="card flex md:justify-center">
          <ul className="m-0 p-0 list-none border border-surface rounded-border p-4 flex flex-col gap-2 w-full md:w-[30rem]">
              {products.map((product) => (
                  <li
                      key={product.id}
                      className={\`p-2 hover:bg-emphasis rounded-border border border-transparent transition-all duration-200 \${selectedId === product.id && 'border-primary'}\`}
                      onContextMenu={(e) => onRightClick(e, product.id)}
                  >
                      <div className="flex flex-wrap p-2 items-center gap-4">
                          <img className="w-16 shadow shrink-0 rounded-border" src={\`/images/product/\${product.image}\`} alt="product.name" />
                          <div className="flex-1 flex flex-col gap-1">
                              <span className="font-bold">{product.name}</span>
                              <div className="flex items-center gap-2">
                                  <i className="pi pi-tag text-sm"></i>
                                  <span>{product.category}</span>
                              </div>
                          </div>
                          <span className="font-bold text-surface-900 dark:text-surface-0 ml-8">{product.price}</span>
                      </div>
                  </li>
              ))}
          </ul>
          <ContextMenu model={items} ref={cm} breakpoint="767px" onHide={() => setSelectedId(undefined)} />
      </div>
    )
}
        `,
        typescript: `
import React, { useState, useRef, useEffect } from 'react';
import { ProductService } from './service/ProductService';
import { MenuItem } from 'primereact/menuitem';

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
}

interface ContextMenuRef {
  show: (e: MouseEvent) => void;
}

export default function TemplateDemo() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const cm = useRef<ContextMenu>(null);
    const items: MenuItem[] = [
        {
            label: 'Favorite',
            icon: 'pi pi-star',
            shortcut: '⌘+D'
        },
        {
            label: 'Add',
            icon: 'pi pi-shopping-cart',
            shortcut: '⌘+A'
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 2
                },
                {
                    label: 'Instagram',
                    icon: 'pi pi-instagram',
                    badge: 3
                }
            ]
        }
    ];

    const onRightClick = (event: React.MouseEvent, id: string): void => {
      if (cm.current) {
        setSelectedId(id);
        cm.current.show(event);
      }
    };

    useEffect(() => {
      ProductService.getProductsSmall().then((data: Product[]) => setProducts(data.slice(0, 5)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div className="card flex md:justify-center">
        <ul className="m-0 p-0 list-none border border-surface rounded-border p-4 flex flex-col gap-2 w-full md:w-[30rem]">
          {products.map((product: Product) => (
            <li
              key={product.id}
              className={\`p-2 hover:bg-emphasis rounded-border border border-transparent transition-all duration-200 \${selectedId === product.id && 'border-primary'}\`}
              onContextMenu={(e) => onRightClick(e, product.id)}
            >
              <div className="flex flex-wrap p-2 items-center gap-4">
                <img className="w-16 shadow shrink-0 rounded-border" src={\`/images/product/\${product.image}\`} alt={product.name} />
                <div className="flex-1 flex flex-col gap-1">
                  <span className="font-bold">{product.name}</span>
                  <div className="flex items-center gap-2">
                    <i className="pi pi-tag text-sm"></i>
                    <span>{product.category}</span>
                  </div>
                </div>
                <span className="font-bold text-surface-900 dark:text-surface-0 ml-8">{product.price}</span>
              </div>
            </li>
          ))}
        </ul>
        <ContextMenu model={items} ref={cm} breakpoint="767px" onHide={() => setSelectedId(undefined)} />
      </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    ContextMenu offers item customization with the items <i>template</i> property that receives the item instance and returns an element.
                </p>
            </DocSectionText>
            <div className="card flex md:justify-center">
                <ul className="m-0 p-0 list-none border border-surface rounded-border p-4 flex flex-col gap-2 w-full md:w-[30rem]">
                    {products.map((product) => (
                        <li key={product.id} className={`p-2 hover:bg-emphasis rounded-border border border-transparent transition-all duration-200 ${selectedId === product.id && 'border-primary'}`} onContextMenu={(e) => onRightClick(e, product.id)}>
                            <div className="flex flex-wrap p-2 items-center gap-4">
                                <img className="w-16 shadow shrink-0 rounded-border" src={`/images/product/${product.image}`} alt="product.name" />
                                <div className="flex-1 flex flex-col gap-1">
                                    <span className="font-bold">{product.name}</span>
                                    <div className="flex items-center gap-2">
                                        <i className="pi pi-tag text-sm" />
                                        <span>{product.category}</span>
                                    </div>
                                </div>
                                <span className="font-bold text-surface-900 dark:text-surface-0 ml-8">{product.price}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <ContextMenu model={items} ref={cm} breakpoint="767px" onHide={() => setSelectedId(undefined)} />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
