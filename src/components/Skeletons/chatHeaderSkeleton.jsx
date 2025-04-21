const ChatHeaderSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {skeletonMessages.map((_, idx) => (
          <div
            key={idx}
            className={`chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`}
          >
            {/* Avatar Skeleton */}
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full">
                <div className="skeleton w-full h-full rounded-full"></div>
              </div>
            </div>
  
            {/* Message Skeleton */}
            <div className="chat-bubble bg-transparent p-0">
              <div className="skeleton h-4 w-40 mb-2 rounded"></div>
              <div className="skeleton h-3 w-20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatHeaderSkeleton;
  