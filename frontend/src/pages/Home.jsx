import React from "react";
import Logo from "../components/Logo";
import HomePlaceholder from "../components/HomePlaceholder";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full h-full">
      <div className="w-95% max-w-6xl mx-auto h-[calc(100vh-72px)] xl:h-[calc(100vh-7rem)] bg-neutral/10">
        <div className="w-full flex h-full rounded-lg overflow-hiden">
          <Sidebar />
          {!selectedUser ? <HomePlaceholder /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default Home;
