import { useState, useEffect } from 'react';

export default function HeaderStats() {

  return (
    <>
      {/* Header */}
      <div className="relative bg-orange-600">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex w-full justify-center items-center">
              <h1 className='text-white text-5xl  px-8 py-8 font-semibold'>SKP Decor</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
