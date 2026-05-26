import { IsOptional, IsString, IsArray, IsNumberString} from "class-validator"

export class QueryProductsDto {

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsArray()
  brand?: string[]

  @IsOptional()
  @IsArray()
  store?: string[]

  @IsOptional()
  @IsString()
  discount?: string

  @IsOptional()
  @IsNumberString()
  minPrice?: string

  @IsOptional()
  @IsNumberString()
  maxPrice?: string

  @IsOptional()
  @IsNumberString()
  page?: number

  @IsOptional()
  @IsNumberString()
  limit?: number
}