import Product from '../entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepository';
import { IProduct } from 'src/types';
import AppError from '@shared/errors/appError';
class ShowProductService {
  public async execute({ id }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    return product;
  }
}

export default ShowProductService;
