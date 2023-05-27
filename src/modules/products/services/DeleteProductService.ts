import Product from '../entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepository';
import { IRequestProduct } from 'src/types';
import ValidationError from '@shared/errors/ValidationError';



class DeleteProductService {
  public async execute({ id }: IRequestProduct): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new ValidationError('Produto não encontrado');
    }
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
