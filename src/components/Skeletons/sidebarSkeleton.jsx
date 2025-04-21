const SidebarSkeleton = () => {
    const skeletonUsers = Array(8).fill(null); // You can adjust the number if needed
  
    return (
      <div className="w-full h-full overflow-y-auto p-4 space-y-4 animate-pulse">
        {skeletonUsers.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 w-full"
          >
            {/* Avatar */}
            <div className="skeleton w-10 h-10 rounded-full" />
  
            {/* Name and last message preview - hidden on small screens */}
            <div className="hidden lg:block flex-1 space-y-2">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-3 w-40 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SidebarSkeleton;
  