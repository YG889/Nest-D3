import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private repo: Repository<Wishlist>,
  ) {}

  async add(user, product) {
    const exists = await this.repo.findOne({
      where: { user: { id: user.id }, product: { id: product.id } },
    });

    if (exists) throw new BadRequestException('Already in wishlist');

    const item = this.repo.create({ user, product });
    return this.repo.save(item);
  }

  async getMy(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async remove(userId: number, productId: number) {
    const item = await this.repo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (!item) throw new NotFoundException();

    await this.repo.remove(item);
  }
}