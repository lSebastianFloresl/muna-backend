import { Controller, Get } from '@nestjs/common'

import { FiltersService } from './filters.service'

@Controller('filters')
export class FiltersController {

  constructor(
    private readonly filtersService: FiltersService,
  ) {}

  @Get('brands')
  getBrands() {
    return this.filtersService.getBrands()
  }

  @Get('stores')
  getStores() {
    return this.filtersService.getStores()
  }

  @Get('spf')
  getSpfValues() {
    return this.filtersService.getSpfValues()
  }
}