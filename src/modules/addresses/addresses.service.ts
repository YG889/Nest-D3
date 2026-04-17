import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';



@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private repo: Repository<Address>,
  ) {}

 
  async create(user: any, dto: CreateAddressDto) {
    
    if (dto.isDefault) {
      await this.repo.update(
        { user: { id: user.id } },
        { isDefault: false },
      );
    }

    const address = this.repo.create({
      ...dto,
      user,
    });

    return this.repo.save(address);
  }

 
  findMyAddresses(user: any) {
    return this.repo.find({
      where: { user: { id: user.id } },
    });
  }

  
  async update(user: any, id: number, dto: UpdateAddressDto) {
    const address = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address || address.user.id !== user.id) {
      throw new ForbiddenException('Not allowed');
    }

    if (dto.isDefault) {
      await this.repo.update(
        { user: { id: user.id } },
        { isDefault: false },
      );
    }

    Object.assign(address, dto);
    return this.repo.save(address);
  }

 
  async remove(user: any, id: number) {
    const address = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address || address.user.id !== user.id) {
      throw new ForbiddenException('Not allowed');
    }

    return this.repo.remove(address);
  }
}