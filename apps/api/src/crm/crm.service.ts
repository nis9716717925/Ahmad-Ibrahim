import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  findAll(status?: string) {
    return this.prisma.crmContact.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const contact = await this.prisma.crmContact.findUnique({ where: { id } });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  create(dto: CreateContactDto) {
    return this.prisma.crmContact.create({ data: dto });
  }

  async update(id: string, dto: UpdateContactDto) {
    await this.findOne(id);
    return this.prisma.crmContact.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.crmContact.delete({ where: { id } });
  }

  getStats() {
    return this.prisma.crmContact.groupBy({
      by: ['status'],
      _count: { id: true },
    });
  }
}
