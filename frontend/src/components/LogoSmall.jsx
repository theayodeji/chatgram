import { MessagesSquare } from "lucide-react";
import React from "react";

const LogoSmall = () => {
  return (
    <div className="text-center flex items-center gap-2">
      <div className="flex flex-col items-center gap-2 group">
          <MessagesSquare className="size-10 text-primary" />
        </div>
      <p className="font-bold text-2xl">
        chat<span className="text-primary">gram</span>
      </p>
    </div>
  );
};

export default LogoSmall;
