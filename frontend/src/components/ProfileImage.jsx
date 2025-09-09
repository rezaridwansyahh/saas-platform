import { useEffect, useState } from "react";

const ProfileImage = ({ userId, initial }) => {
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!userId) return;
      try {
        const token = localStorage.getItem("token"); // Adjust if token stored differently
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
      <div className="w-9 h-9 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold">
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Profile"
      className="w-9 h-9 rounded-full object-cover border border-red-300"
    />
  );
};

export default ProfileImage;
