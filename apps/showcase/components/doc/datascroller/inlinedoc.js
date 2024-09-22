import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { DataScroller } from '@/components/lib/datascroller/DataScroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { ProductService } from '../../../service/ProductService';

export function InlineDataScrollerDoc(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
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

    const itemTemplate = (data) => {
        return (
            <div className="col-span-12">
                <div className="flex flex-col xl:flex-row xl:items-start p-6 gap-6">
                    <img className="w-9/12 sm:w-64 xl:w-40 shadow block xl:block mx-auto rounded-border" src={`https://primefaces.org/cdn/primereact/images/product/${data.image}`} alt={data.name} />
                    <div className="flex flex-col lg:flex-row justify-between items-center xl:items-start lg:flex-1 gap-6">
                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-2xl font-bold text-surface-900 dark:text-surface-0">{data.name}</div>
                                <div className="text-surface-700 dark:text-surface-100">{data.description}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Rating value={data.rating} readOnly cancel={false} />
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag product-category-icon" />
                                    <span className="font-semibold">{data.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-6 lg:gap-2">
                            <span className="text-2xl font-semibold">${data.price}</span>
                            <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} />
                            <Tag value={data.inventoryStatus} severity={getSeverity(data)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const code = {
        basic: `
<DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
        `,
        javascript: `
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProductService } from './service/ProductService';

export default function InlineDataScrollerDemo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
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

    const itemTemplate = (data) => {
        return (
            <div className="col-span-12">
                <div className="flex flex-col xl:flex-row xl:items-start p-6 gap-6">
                    <img className="w-9/12 sm:w-64 xl:w-40 shadow block xl:block mx-auto rounded-border" src={\`https://primefaces.org/cdn/primereact/images/product/\${data.image}\`} alt={data.name} />
                    <div className="flex flex-col lg:flex-row justify-between items-center xl:items-start lg:flex-1 gap-6">
                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-2xl font-bold text-surface-900 dark:text-surface-0">{data.name}</div>
                                <div className="text-surface-700 dark:text-surface-100">{data.description}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Rating value={data.rating} readOnly cancel={false}></Rating>
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-6 lg:gap-2">
                            <span className="text-2xl font-semibold">\${data.price}</span>
                            <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
        </div>
    )
}
        `,
        typescript: `
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
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

export default function InlineDataScrollerDemo() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    const itemTemplate = (data: Product) => {
        return (
            <div className="col-span-12">
                <div className="flex flex-col xl:flex-row xl:items-start p-6 gap-6">
                    <img className="w-9/12 sm:w-64 xl:w-40 shadow block xl:block mx-auto rounded-border" src={\`https://primefaces.org/cdn/primereact/images/product/\${data.image}\`} alt={data.name} />
                    <div className="flex flex-col lg:flex-row justify-between items-center xl:items-start lg:flex-1 gap-6">
                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-2xl font-bold text-surface-900 dark:text-surface-0">{data.name}</div>
                                <div className="text-surface-700 dark:text-surface-100">{data.description}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Rating value={data.rating} readOnly cancel={false}></Rating>
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-6 lg:gap-2">
                            <span className="text-2xl font-semibold">\${data.price}</span>
                            <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
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
                <p>DataScroller can listen scroll event of itself rather than document in inline mode.</p>
            </DocSectionText>
            <div className="card">
                <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
            </div>
            <DocSectionCode code={code} service={['ProductService']} />
        </>
    );
}
