import { MessagesSquare } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-2 group">
        <div className="size-20 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MessagesSquare className="size-12 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">
        chat<span className="text-primary">gram</span>
      </p>
    </div>
  );
};

export default Logo;
