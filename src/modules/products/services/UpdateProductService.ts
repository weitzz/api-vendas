import Product from '../entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepository';
import { IProduct } from 'src/types';
import AppError from '@shared/errors/appError';
class UpdateProductService {
  public async execute({ id,name,price,quantity }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('Produto já existente com este nome.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);


    return product;
  }
}

export default UpdateProductService;
