"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch user data and set the 'isLiked' state based on the wishlist
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data?.wishlist?.includes(product._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (err) {
      console.error("[users_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the user data when the user is available
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  // Handle the like/unlike action
  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!user) {
      router.push("/sign-in");
      return;
    }

    try {
      setLoading(true);

      // Optimistic UI update: update the heart status before the request finishes
      setIsLiked(!isLiked);

      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      // Check if the response is ok
      if (!res.ok) {
        throw new Error("Failed to update wishlist");
      }

      const updatedUser = await res.json();

      // Update the liked state based on the response
      setIsLiked(updatedUser.wishlist.includes(product._id));

      // If a function is passed to update the signed-in user, call it
      updateSignedInUser && updateSignedInUser(updatedUser);

    } catch (err) {
      console.error("[wishlist_POST]", err);
      // Rollback optimistic update in case of error
      setIsLiked(!isLiked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavorite;
