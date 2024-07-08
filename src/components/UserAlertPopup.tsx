"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { isIOS, isAndroid, isDesktop, isChrome, isSafari } from 'react-device-detect';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(isAndroid || isIOS);  
  const [heading, setHeading] = useState('');
  const [install, setInstall] = useState('');
  const [instructions, setInstructions] = useState('');
  const [qr, setQr] = useState(false);
  
  useEffect(() => {
    if(isMobile) {
        if(isAndroid) {
            (!isChrome) ? setHeading('Wrong browser detected') : setHeading('Add To Home Screen');
            setInstall('To install the app, you need to add this website to your home screen.');
            setInstructions('In your Chrome browser menu, tap the More button and choose Install App in the options');
        } else if(isIOS) {
            (!isSafari) ? setHeading('Wrong browser detected') : setHeading('Add To Home Screen');
            setInstall('To install the app, you need to add this website to your home screen.');
            setInstructions('In your Safari browser menu, tap the Share icon and choose Add to Home Screen in the options. Then open the wakanda.bets app on your home screen.');
        }
    } else {
        setHeading('Wrong platform detected');
        setInstall('This webapp is optimized for mobile screens. For the best experience, please use the PWA version. It may work on desktops, but is not prefered.');
        setInstructions('To install the app, you need to add this website to your home screen.');
        setQr(true);
    }
    setIsDataLoaded(true);
  }, [isMobile]);

  if (!isDataLoaded) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 text-black rounded-lg shadow-lg max-w-sm w-full flex flex-col justify-center items-center">
        <span className='text-center font-regular text-xs mb-4 flex flex-col justify-center items-center'>
            <h2 className="font-semibold text-center text-lg font-metro mb-3">{heading}</h2>
            <p className='mb-1'>{instructions}</p>
            <p className='mb-4'>{install}</p>
            {qr && <Image src='/images/wakanda-qr.png' alt='PWA QR' width={200} height={200} />}
        </span>
        {!isMobile && (
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
