import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Product } from 'src/modules/products/entities/product.entity';
@Entity()
@Unique(['user', 'product'])
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product: Product;
}