import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';



@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private service: AddressesService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateAddressDto) {
    return this.service.create(req.user, dto);
  }

  @Get('me')
  getMy(@Req() req) {
    return this.service.findMyAddresses(req.user);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateAddressDto) {
    return this.service.update(req.user, +id, dto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.service.remove(req.user, +id);
  }
}