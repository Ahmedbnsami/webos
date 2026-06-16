
export const Desktop = () => {
  return (
    <div>
        {/* Desktop Icons column */}
      <div className="flex flex-col gap-16 p-16 select-none max-w-[80px]">
        {/* Terminal Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer group text-center">
          <div className="w-40 h-40 flex items-center justify-center rounded">
            <svg className="w-[24px] h-[24px] stroke-os-accent fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M6 9l3 3-3 3" />
              <path d="M11 15h6" />
            </svg>
          </div>
          <span className="text-[10px] font-sans text-os-text font-bold mt-4">Terminal</span>
        </div>

        {/* Storage Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer group text-center">
          <div className="w-40 h-40 flex items-center justify-center rounded">
            <svg className="w-[24px] h-[24px] stroke-os-accent fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-[10px] font-sans text-os-text font-bold mt-4">Storage</span>
        </div>

        {/* Gallery Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer group text-center">
          <div className="w-40 h-40 flex items-center justify-center rounded">
            <svg className="w-[24px] h-[24px] stroke-os-accent fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" className="fill-os-accent" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <span className="text-[10px] font-sans text-os-text font-bold mt-4">Gallery</span>
        </div>

        {/* Music Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer group text-center">
          <div className="w-40 h-40 flex items-center justify-center rounded">
            <svg className="w-[24px] h-[24px] stroke-os-accent fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span className="text-[10px] font-sans text-os-text font-bold mt-4">Music</span>
        </div>

        {/* Settings Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer group text-center">
          <div className="w-40 h-40 flex items-center justify-center rounded">
            <svg className="w-[24px] h-[24px] stroke-os-accent fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <span className="text-[10px] font-sans text-os-text font-bold mt-4">Settings</span>
        </div>
      </div>
    </div>
  )
}
