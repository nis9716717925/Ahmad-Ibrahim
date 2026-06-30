import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { CrmService } from './crm.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('crm')
@UseGuards(JwtAuthGuard)
export class CrmController {
  constructor(private crmService: CrmService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.crmService.findAll(status);
  }

  @Get('stats')
  getStats() {
    return this.crmService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crmService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.crmService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.crmService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crmService.remove(id);
  }
}
