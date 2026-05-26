export interface ProductCatalogDto {
  product_id: string;
  nombre: string;
  marca: string;

  ml?: number | null;
  spf?: number | null;

  imagen: string | null;
  url: string | null;
  tienda: string | null;

  precio_actual?: number;
  precio_original?: number;
  descuento_pct?: number;
}