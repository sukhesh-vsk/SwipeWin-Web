"use client"

import { Backico, Filterico } from '@/assets/icons'
import { useRouter } from 'next/navigation';
import React from 'react'

export interface PageHeaderProps {
    title: string;
    filter: boolean;
}

export default function PageHeader({ title, filter }: PageHeaderProps) {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    }

    return (
        <header className={`container-fluid flex items-center mt-4 ${filter ? 'justify-between' : ''}`}>
            <button className="p-2 flex items-center justify-center" onClick={handleClick}>
                <Backico className='w-5'/>
            </button>
            
            <div className={`${filter ? '' : 'flex-1'} flex justify-center items-center uppercase text-center heading2 !mt-0`}>
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
