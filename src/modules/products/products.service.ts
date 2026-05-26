import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { QueryProductsDto } from './dto/query-products.dto'

@Injectable()
export class ProductsService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async findAll(query: QueryProductsDto) {

    const {
      search,
      brand,
      store,
      discount,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
    } = query

    // PAGINATION SAFE CAST
    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    // WHERE DINÁMICO
    const where: any = {}

    // SEARCH
    if (search) {

      where.nombre = {
        contains: search,
        mode: 'insensitive',
      }
    }

    // BRAND FILTER
    if (brand?.length) {

      where.marca = {
        in: Array.isArray(brand)
          ? brand
          : [brand],
      }
    }

    // STORE FILTER
    if (store?.length) {

      where.product_store = {
        some: {
          stores: {
            tienda: {
              in: Array.isArray(store)
                ? store
                : [store],
            },
          },
        },
      }
    }

    // ONLY DISCOUNTS
    if (discount === "true") {

      where.price_history = {
        some: {
          descuento_pct: {
            gt: 0,
          },
        },
      }
    }

    // PRICE_HISTORY FILTERS
    if (
      discount === "true" ||
      minPrice ||
      maxPrice
    ) {

      where.price_history = {
        some: {},
      }

      // DISCOUNT
      if (discount === "true") {

        where.price_history.some.descuento_pct = {
          gt: 0,
        }
      }

      // PRICE RANGE
      if (minPrice || maxPrice) {

        where.price_history.some.precio_actual = {

          gte: minPrice
            ? Number(minPrice)
            : undefined,

          lte: maxPrice
            ? Number(maxPrice)
            : undefined,
        }
      }
    }

    // TOTAL PRODUCTS
    const total = await this.prisma.products.count({
      where,
    })

    // PRODUCTS
    const products = await this.prisma.products.findMany({

      where,

      skip: (pageNumber - 1) * limitNumber,

      take: limitNumber,

      include: {

        product_store: {
          include: {
            stores: true,
          },
        },

        price_history: {
          orderBy: {
            fecha_scraping: 'desc',
          },
          take: 1,
        },
      },
    })

    // DTO MAPPING
    const mappedProducts = products.map((p) => {

      const latestPrice = p.price_history?.[0]

      const store = p.product_store?.[0]

      return {

        product_id: p.product_id,

        nombre: p.nombre ?? "",

        marca: p.marca ?? "",

        ml: p.ml ?? null,

        spf: p.spf ?? null,

        imagen: store?.imagen ?? "",

        url: store?.url ?? "",

        tienda: store?.stores?.tienda ?? "",

        precio_actual: latestPrice?.precio_actual
          ? Number(latestPrice.precio_actual)
          : 0,

        precio_original: latestPrice?.precio_original
          ? Number(latestPrice.precio_original)
          : 0,

        descuento_pct: latestPrice?.descuento_pct
          ? Math.round(Number(latestPrice.descuento_pct))
          : 0,
      }
    })

    // RESPONSE PAGINADA
    return {

      data: mappedProducts,

      total,

      page: pageNumber,

      limit: limitNumber,

      totalPages: Math.ceil(total / limitNumber),
    }
  }
}