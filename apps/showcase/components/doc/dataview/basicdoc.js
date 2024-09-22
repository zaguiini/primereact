import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { DataView } from '@/components/lib/dataview/DataView';
import { classNames } from '@/components/lib/utils/Utils';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { ProductService } from '../../../service/ProductService';

export function BasicDoc(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-span-12" key={product.id}>
                <div className={classNames('flex flex-col xl:flex-row xl:items-start p-6 gap-6', { 'border-t border-surface': index !== 0 })}>
                    <img className="w-9/12 sm:w-64 xl:w-40 shadow block xl:block mx-auto rounded-border" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <div className="text-2xl font-bold text-surface-900 dark:text-surface-0">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false} />
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag" />
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) {
            return null;
        }

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-cols-12 gap-4 grid-nogutter">{list}</div>;
    };

    const code = {
        basic: `
<DataView value={products} listTemplate={listTemplate} />
        `,
        javascript: `
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ProductService } from './service/ProductService';

export default function BasicDemo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-span-12" key={product.id}>
                <div className={classNames('flex flex-col xl:flex-row xl:items-start p-6 gap-6', { 'border-t border-surface': index !== 0 })}>
                    <img className="w-9/12 sm:w-64 xl:w-40 shadow block xl:block mx-auto rounded-border" src={\`https://primefaces.org/cdn/primereact/images/product/\${product.image}\`} alt={product.name} />
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <div className="text-2xl font-bold text-surface-900 dark:text-surface-0">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <span className="text-2xl font-semibold">\${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-cols-12 gap-4 grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} />
        </div>
    )
}
        `,
        typescript: `
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ProductService } from './service/ProductService';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

export default function BasicDemo() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    }, []);

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (product: Product, index: number) => {
        return (
            <div className="col-span-12" key={product.id}>
                <div className={classNames('flex flex-col xl:flex-row xl:items-start p-6 gap-6', { 'border-t border-surface': index !== 0 })}>
                    <img className="w-9/12 sm:w-64 xl:w-40 shadow block xl:block mx-auto rounded-border" src={\`https://primefaces.org/cdn/primereact/images/product/\${product.image}\`} alt={product.name} />
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <div className="text-2xl font-bold text-surface-900 dark:text-surface-0">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <span className="text-2xl font-semibold">\${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items: Product[]) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-cols-12 gap-4 grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} />
        </div>
    )
}
        `,
        data: `
/* ProductService */
{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
...
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    DataView requires a <i>value</i> to display along with an <i>listTemplate</i> that receives an object in the collection to return content.
                </p>
            </DocSectionText>
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} />
            </div>
            <DocSectionCode code={code} service={['ProductService']} />
        </>
    );
}
