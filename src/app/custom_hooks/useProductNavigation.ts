export const useProductNavigation = () => {
  /**
   * Generate a product detail URL using the product's reference as identifier
   */
  const getProductDetailUrl = (product: { reference: string } | { id: string, reference?: string }): string => {
    // Handle different product object structures
    const identifier = 'reference' in product && product.reference 
      ? product.reference 
      : ('id' in product ? product.id : '');
      
    return `/product/${encodeURIComponent(identifier)}`;
  };

  return {
    getProductDetailUrl
  };
};