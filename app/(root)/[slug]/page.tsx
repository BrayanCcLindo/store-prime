import AddToCart from "@/components/product/add-to-cart";
import ProductImages from "@/components/product/product-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Heart,
  Package,
  RotateCcw,
  Share2,
  Shield,
  Star,
  Truck
} from "lucide-react";
import React from "react";

export default async function ProductDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Banner si está disponible */}

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería de imágenes */}
        <ProductImages images={product.images} />

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <h1 id="titulo" className="text-3xl font-bold tracking-tight">
                  {product.name}
                </h1>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  // onClick={() => setIsFavorite(!isFavorite)}
                  // className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 `} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary">{product.category}</Badge>
              {product.isFeatured && (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  Destacado
                </Badge>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${product.price}</span>
              <span className="text-sm text-muted-foreground">USD</span>
            </div>
          </div>

          <Separator />

          {/* Descripción */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Stock y cantidad */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Stock disponible:</span>
              <span
                className={`text-sm font-semibold ${
                  product.stock > 10
                    ? "text-green-600"
                    : product.stock > 0
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 0 ? `${product.stock} unidades` : "Sin stock"}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => handleQuantityChange(-1)}
                    // disabled={quantity <= 1}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                    {1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => handleQuantityChange(1)}
                    // disabled={quantity >= product.stock}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            {/* <Button className="w-full" size="lg" disabled={product.stock === 0}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </Button> */}
            <AddToCart
              item={{
                productId: product.id,
                image: product.images[0],
                name: product.name,
                price: product.price,
                qty: 1,
                slug: product.slug
              }}
            />
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              disabled={product.stock === 0}
            >
              Comprar ahora
            </Button>
          </div>

          {/* Información adicional */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Información de envío y garantía
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Envío gratis en pedidos superiores a $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-4 h-4 text-green-600" />
                <span>Entrega en 2-3 días hábiles</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Garantía de 1 año incluida</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-4 h-4 text-orange-600" />
                <span>Devoluciones dentro de 30 días</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
