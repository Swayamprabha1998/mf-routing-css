import React, { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice'
import type { RootState, AppDispatch } from '../store'
import { useToken } from 'container/context/TokenContext'
import UIButton from 'ui/Button'
import { addToCart } from 'cart/cartSlice'
import type { Product } from '../store/slices/productsSlice'

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  )

  const token = useToken()

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token))
    }
  }, [dispatch, token])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  if (loading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products?.map((product: Product) => (
          <li key={product?.id}>
            <h3>{product?.title}</h3>
            <p>{product?.description}</p>
            <p>Price: ${product?.price}</p>
            <Suspense fallback={<div>Loading Button...</div>}>
              <UIButton onClick={() => handleAddToCart(product)}>
                Add to Cart
              </UIButton>
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsList
