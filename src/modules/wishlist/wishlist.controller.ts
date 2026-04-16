import { Controller, Post, Get, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/modules/users/entities/user.entity';

@Controller('wishlist')
export class WishlistController {
  constructor(private service: WishlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':productId')
  add(@Param('productId') productId: number, @Req() req) {
    return this.service.add(req.user, { id: +productId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMy(@Req() req) {
    return this.service.getMy(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  remove(@Param('productId') productId: number, @Req() req) {
    return this.service.remove(req.user.id, +productId);
  }
}