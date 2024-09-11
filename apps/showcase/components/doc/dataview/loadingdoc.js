import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { DataView, DataViewLayoutOptions } from '@/components/lib/dataview/DataView';
import { classNames } from '@/components/lib/utils/Utils';
import Link from 'next/link';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from 'react';
import { ProductService } from '../../../service/ProductService';

export function LoadingDoc(props) {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid grid-cols-12 gap-4');

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 6)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const listItem = (product, index) => {
        return (
            <div className="col-span-12" key={product.id}>
                <div className={classNames('flex flex-col xl:flex-row xl:items-start p-6 gap-6', { 'border-t border-surface': index !== 0 })}>
                    <Skeleton className="w-9/12 sm:w-64 xl:w-40 shadow h-24 block xl:block mx-auto rounded-border" />
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <Skeleton className="w-32 rounded-border h-8" />
                            <Skeleton className="w-24 rounded-border h-4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-24 rounded-border h-4" />
                                <Skeleton className="w-12 rounded-border h-4" />
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <Skeleton className="w-16 rounded-border h-8" />
                            <Skeleton shape="circle" className="w-12 h-12" />
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
                        <Skeleton className="w-24 rounded-border h-4" />
                        <Skeleton className="w-12 rounded-border h-4" />
                    </div>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <Skeleton className="w-9/12 shadow rounded-border h-40" />
                        <Skeleton className="w-32 rounded-border h-8" />
                        <Skeleton className="w-24 rounded-border h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="w-16 rounded-border h-8" />
                        <Skeleton shape="circle" className="w-12 h-12" />
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
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';
import { ProductService } from './service/ProductService';

export default function BasicDemo() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid grid-cols-12 gap-4');

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 6)));
    }, []);

    const listItem = (product, index) => {
        return (
            <div className="col-span-12" key={product.id}>
                <div className={classNames('flex flex-col xl:flex-row xl:items-start p-6 gap-6', { 'border-t border-surface': index !== 0 })}>
                    <Skeleton className="w-9/12 sm:w-64 xl:w-40 shadow h-24 block xl:block mx-auto rounded-border" />
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <Skeleton className="w-32 rounded-border h-8" />
                            <Skeleton className="w-24 rounded-border h-4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-24 rounded-border h-4" />
                                <Skeleton className="w-12 rounded-border h-4" />
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <Skeleton className="w-16 rounded-border h-8" />
                            <Skeleton shape="circle" className="w-12 h-12" />
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
                        <Skeleton className="w-24 rounded-border h-4" />
                        <Skeleton className="w-12 rounded-border h-4" />
                    </div>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <Skeleton className="w-9/12 shadow rounded-border h-40" />
                        <Skeleton className="w-32 rounded-border h-8" />
                        <Skeleton className="w-24 rounded-border h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="w-16 rounded-border h-8" />
                        <Skeleton shape="circle" className="w-12 h-12" />
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
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';
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
    const [layout, setLayout] = useState('grid grid-cols-12 gap-4');

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 6)));
    }, []);

    const listItem = (product, index) => {
        return (
            <div className="col-span-12" key={product.id}>
                <div className="flex flex-col xl:flex-row xl:items-start p-6 gap-6">
                    <Skeleton className="w-9/12 sm:w-64 xl:w-40 shadow h-24 block xl:block mx-auto rounded-border" />
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <Skeleton className="w-32 rounded-border h-8" />
                            <Skeleton className="w-24 rounded-border h-4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-24 rounded-border h-4" />
                                <Skeleton className="w-12 rounded-border h-4" />
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <Skeleton className="w-16 rounded-border h-8" />
                            <Skeleton shape="circle" className="w-12 h-12" />
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
                        <Skeleton className="w-24 rounded-border h-4" />
                        <Skeleton className="w-12 rounded-border h-4" />
                    </div>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <Skeleton className="w-9/12 shadow rounded-border h-40" />
                        <Skeleton className="w-32 rounded-border h-8" />
                        <Skeleton className="w-24 rounded-border h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="w-16 rounded-border h-8" />
                        <Skeleton shape="circle" className="w-12 h-12" />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product: Product, layout: string) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
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
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
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
                    While data is being loaded. <Link href="/skeleton">Skeleton</Link> component may be used to indicate the busy state.
                </p>
            </DocSectionText>
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
            <DocSectionCode code={code} service={['ProductService']} />
        </>
    );
}
