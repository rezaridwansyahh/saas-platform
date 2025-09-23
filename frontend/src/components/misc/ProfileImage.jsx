//src/components/misc/ProfileImage.jsx
import { useEffect, useState } from "react";

const ProfileImage = ({ userId, initial, size = "md" }) => {
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(false);

  // Mapping ukuran
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
    xxl: "w-32 h-32 text-xl",
  };

  const appliedSize = sizeClasses[size] || sizeClasses.md;

  useEffect(() => {
    const fetchImage = async () => {
      if (!userId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/images/employee/${userId}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl);
      } catch (err) {
        console.error("Image fetch failed:", err);
        setError(true);
      }
    };

    fetchImage();
  }, [userId]);

  if (error || !src) {
    return (
      <div
        className={`${appliedSize} rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Profile"
      className={`${appliedSize} rounded-full object-cover border border-red-300`}
    />
  );
};

export default ProfileImage;
