import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../../prisma/prisma.service'

@Injectable()
export class FiltersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  // BRANDS
  async getBrands() {

    const brands = await this.prisma.products.findMany({
      distinct: ['marca'],

      select: {
        marca: true,
      },

      where: {
        marca: {
          not: null,
        },
      },

      orderBy: {
        marca: 'asc',
      },
    })

    return brands.map((b) => b.marca)
  }

  // STORES
  async getStores() {

    const stores = await this.prisma.stores.findMany({
      select: {
        tienda: true,
      },

      orderBy: {
        tienda: 'asc',
      },
    })

    return stores.map((s) => s.tienda)
  }

  // SPF
  async getSpfValues() {

    const spf = await this.prisma.products.findMany({
      distinct: ['spf'],

      select: {
        spf: true,
      },

      where: {
        spf: {
          not: null,
        },
      },

      orderBy: {
        spf: 'asc',
      },
    })

    return spf.map((s) => s.spf)
  }
}