import React from 'react'

const SmallPdSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white my-2">
            <div className="aspect-square animate-pulse bg-gray-200" />
            <div className="space-y-3 p-4">
                <div className="h-2 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200" />
            </div>
        </div>
    )
}

export default SmallPdSkeleton