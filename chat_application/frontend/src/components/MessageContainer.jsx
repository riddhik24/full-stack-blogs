import React, { useEffect, useRef } from "react";
import SelectUser from "./SelectUser";
import formatTime from "../utils/formatTime";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowLeft } from "lucide-react";
import MessageInput from "./MessageInput";

export const MessageContainer = () => {
  const {
    selectedUser,
    messages,
    subscribeToMessages,
    setSelectedUser,
    fetchingMessages,
    unSubscribeToMessages,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  console.log(messages);
  const messagesEndRef = useRef(null);

  //Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (authUser) {
      subscribeToMessages();
    }
    return () => {
      unSubscribeToMessages();
    };
  }, [selectedUser, subscribeToMessages, unSubscribeToMessages]);

  if (!selectedUser) {
    return <SelectUser />;
  }
  return (
    // Change: flex flex-col ensures header stays at top and input stays at bottom
    <div className="flex flex-col h-[calc(100vh-64px)] ml-72 max-sm:ml-0 bg-white pt-16">
      {/* Header - Removed absolute/top-20 to make it stick to the top of THIS container */}
      <div className="w-full bg-white border-b h-[61px] shadow-sm z-40 px-4 flex items-center">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => setSelectedUser(null)}
            className="hidden max-sm:flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedUser?.avatar}
                alt="User avatar"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
              {onlineUsers.includes(selectedUser?._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <h3 className="font-semibold text-lg text-gray-700 truncate">
              {selectedUser?.userName}
            </h3>
          </div>
        </div>
      </div>

      {/* Messages Area - flex-1 allows it to scroll between header and input */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {fetchingMessages ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : messages?.length > 0 ? (
          messages.map((message) => {
            
            const isMe =
              message?.senderId === authUser?._id ||
              message?.senderId === authUser?.data?._id;

            return (
              <div
                key={message._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-md ${isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-900 border border-gray-200 rounded-tl-none"}`}
                >
                  <p className="text-sm sm:text-base font-medium leading-normal wrap-break-word">
                    {message?.text}
                  </p>
                  <time
                    className={`text-[10px] mt-1 block text-right opacity-70 ${isMe ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {formatTime(message?.createdAt)}
                  </time>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-50">
            <p className="text-sm">No messages yet. Say hi!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Naturally stays at bottom of flex container */}
      <div className="p-4 bg-white border-t border-gray-100">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
