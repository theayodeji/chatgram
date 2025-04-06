import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Binoculars, Loader2Icon, MessageCircleOffIcon } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, selectedUser, getMessages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const chatRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages()

    return () => unsubscribeFromMessages()
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full flex flex-col overflow-auto">
      <ChatHeader />

      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatRef}>
          {!messages[0] && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <MessageCircleOffIcon className="text-primary/30 size-30 animate-pulse mb-3" />
              <p className="text-xl md:text-3xl font-bold text-neutral/90 text-center">
                Nothing to see here!
              </p>
            </div>
          )}
          {messages.map((message) => {
            return (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId == authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="size-8 sm:size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.avatar || "/user.png"
                          : selectedUser.avatar || "/user.png"
                      }
                      alt="prof"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div
                  className={`chat-bubble flex flex-col ${
                    message.senderId === authUser._id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            );
          })}
          {messages[0] && (
            <div ref={messageEndRef} className="bg-neutral/60 size-0.5"></div>
          )}
        </div>
      )}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
