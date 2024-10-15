"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

const Wishlist = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<ProductType[]>([])

  // Fetch signed-in user data
  const getUser = async () => {
    setLoading(true) // Ensure loading state is set to true when fetching
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setSignedInUser(data)
    } catch (err) {
      console.error("[users_GET]", err)
    } finally {
      setLoading(false) // Ensure loading is always set to false after the request
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  // Fetch wishlist products if the signed-in user exists
  const getWishlistProducts = async () => {
    if (!signedInUser || !Array.isArray(signedInUser.wishlist)) return

    setLoading(true)
    try {
      const wishlistProducts = await Promise.all(
        signedInUser.wishlist.map(async (productId) => {
          const res = await getProductDetails(productId)
          return res
        })
      )
      setWishlist(wishlistProducts)
    } catch (err) {
      console.error("[wishlist_GET]", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch wishlist products when the signed-in user is updated
  useEffect(() => {
    if (signedInUser && Array.isArray(signedInUser.wishlist)) {
      getWishlistProducts()
    }
  }, [signedInUser])

  // Helper to update the signed-in user state if needed
  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }

  // Render loading spinner or wishlist content
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              updateSignedInUser={updateSignedInUser}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const dynamic = "force-dynamic"

export default Wishlist
