import { ProductType } from "@/type/productType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  // const discountPercentage = Math.round(
  //   // ((product. - product.price) / product.originalPrice) * 100
  // );

  return (
    <Link href={`/${product.slug}`}>
      <Card className="group overflow-hidden transition-all relative duration-300 hover:-translate-y-1 border-0 shadow-md">
        <div className="relative overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={450}
            height={450}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            {/* {product. && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              Nuevo
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive">-{discountPercentage}%</Badge>
          )} */}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {!product.stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button variant="secondary" className="text-sm font-semibold">
                Agotado
              </Button>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </CardTitle>
            <Button variant="outline" className="text-xs shrink-0">
              {product.category}
            </Button>
          </div>
          <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(parseInt(product.rating))
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating})
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.price > product.price && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>

          <Button
            className="w-full"
            disabled={!product.stock}
            variant={product.stock ? "default" : "secondary"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock ? "Agregar al Carrito" : "No Disponible"}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
