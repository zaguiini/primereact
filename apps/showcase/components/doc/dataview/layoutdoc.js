import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { DataView, DataViewLayoutOptions } from '@/components/lib/dataview/DataView';
import { classNames } from '@/components/lib/utils/Utils';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { ProductService } from '../../../service/ProductService';

export function LayoutDoc(props) {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid grid-cols-12 gap-4');

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
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

    const listItem = (product, index) => {
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

    const gridItem = (product) => {
        return (
            <div className="col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-4 p-2" key={product.id}>
                <div className="p-6 border border-surface bg-surface-0 dark:bg-surface-900 rounded-border">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <i className="pi pi-tag" />
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                    </div>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <img className="w-9/12 shadow rounded-border" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') {
            return listItem(product, index);
        } else if (layout === 'grid grid-cols-12 gap-4') {
            return gridItem(product);
        }
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-cols-12 gap-4 grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    const code = {
        basic: `
<DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
        `,
        javascript: `
import React, { useState, useEffect } from 'react';
import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

export default function BasicDemo() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid grid-cols-12 gap-4');

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
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

    const listItem = (product, index) => {
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

    const gridItem = (product) => {
        return (
            <div className="col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-4 p-2" key={product.id}>
                <div className="p-6 border border-surface bg-surface-0 dark:bg-surface-900 rounded-border">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <img className="w-9/12 shadow rounded-border" src={\`https://primefaces.org/cdn/primereact/images/product/\${product.image}\`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold">\${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid grid-cols-12 gap-4') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-cols-12 gap-4 grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}
        `,
        typescript: `
import React, { useState, useEffect } from 'react';
import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

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
    const [layout, setLayout] = useState('grid grid-cols-12 gap-4');

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
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

    const listItem = (product: Product, index: number) => {
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

    const gridItem = (product: Product) => {
        return (
            <div className="col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-4 p-2" key={product.id}>
                <div className="p-6 border border-surface bg-surface-0 dark:bg-surface-900 rounded-border">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <img className="w-9/12 shadow rounded-border" src={\`https://primefaces.org/cdn/primereact/images/product/\${product.image}\`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold">\${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product: Product, layout: string, index: number) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product: Product, index);
        else if (layout === 'grid grid-cols-12 gap-4') return gridItem(product);
    };

    const listTemplate = (products: Product[], layout: string) => {
        return <div className="grid grid-cols-12 gap-4 grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
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
                    DataView supports <i>list</i> and <i>grid</i> display modes defined with the <i>layout</i> property. The helper <i>DataViewLayoutOptions</i> component can be used to switch between the modes however this component is optional and
                    you may use your own UI to switch modes as well. As in <i>list</i> layout, the <i>grid</i> layout also requires PrimeFlex Grid classes to define how the grid is displayed per screen sizes.
                </p>
            </DocSectionText>
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
            <DocSectionCode code={code} service={['ProductService']} />
        </>
    );
}
