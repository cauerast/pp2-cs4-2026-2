export type CreateCarDto = {
 brand: string,
 model: string
 color: string,
 year_manufacture: number,
 imported: boolean,
 plates: string,
 selling_date?: Date
 selling_price?: number
}