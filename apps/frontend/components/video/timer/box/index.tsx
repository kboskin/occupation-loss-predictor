import React from 'react'

interface numProp {
    num: string | number,
    unit: string
}

export const NumberBox = ({num, unit}: numProp) => {
    return (
        <div className="flex flex-col items-center mt-4 px-2">
            <div
                className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-32 h-32 text-2xl md:text-4xl mt-4 ">
                <div className="rounded-t-lg rounded-b-lg w-full h-full"/>

                <div className="text-5xl absolute z-10 font-bold md:text-7xl font-mono stroked-only">
                    {num}
                </div>

                <div className="rounded-b-lg rounded-t-lg w-full h-full"/>

                <div className={`absolute w-full h-1/2 top-0 rounded-t-lg z-5`}/>

                {/* Two Small Dots */}
                <div className="absolute -right-1 top-[60px] rounded-full w-[12px] h-[12px]"/>
                <div className="absolute -left-1 top-[60px] rounded-full w-[12px] h-[12px]"/>

            </div>
            <p className="text-lg font-semibold md:text-2xl ">
                {unit}
            </p>
        </div>
    )
}