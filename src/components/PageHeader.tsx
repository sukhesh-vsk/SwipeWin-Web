import { Backico, Filterico } from '@/assets/icons'
import React from 'react'

export interface PageHeaderProps {
    title: string;
    filter: boolean;
}

export default function PageHeader({ title, filter }: PageHeaderProps) {
    return (
        <header className={`flex items-center mt-4 ${filter ? 'justify-between' : ''}`}>
            <button className="p-2">
                <Backico className='w-4'/>
            </button>
            
            <div className={`${filter ? '' : 'flex-1'} uppercase text-center font-cairo font-semibold tracking-widest text-lg`}>
                {title}
            </div>
            
            {filter && (
                <button className='p-2'>
                    <Filterico className='w-4'/>
                </button>
            )}
        </header>
    );
}
