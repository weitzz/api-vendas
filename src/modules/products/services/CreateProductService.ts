import { IProduct } from 'src/types';
import Product from '../entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepository';
import AppError from '@shared/errors/appError';

class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Produto já existente com este nome.');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
