import Product from '../entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepository';
import { IProduct } from 'src/types';
import AppError from '@shared/errors/appError';
class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    await productsRepository.remove(product);
    throw new AppError('Produto excluido com sucesso');
  }
}

export default DeleteProductService;
