import { Camera, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ avatar: base64Image });
    };
  };

  return (
    <div className="w-full">
      <div className="w-[95%] max-w-7xl mx-auto p-4">
        <h1 className="font-bold text-3xl">
          Your <span className="text-secondary">Profile</span>
        </h1>

        <div className="w-full flex flex-col items-center mt-10">
          <div className="w-max relative">
            <div className="rounded-full overflow-hidden border-4 relative">
              <img
                src={selectedImage || authUser.avatar || "https://yt3.ggpht.com/yti/ANjgQV96rjJJoBtGHdYzxFN7AOYMP_etvMu4ZvUo1CY3XJE=s88-c-k-c0x00ffffff-no-rj"}
                className="rounded-full w-[120px] aspect-square object-cover"
                alt="Profile"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400 mt-8">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
        </div>

        <div className="space-y-6 mt-10">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
