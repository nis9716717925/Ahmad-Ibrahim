import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findPublished() {
    return this.prisma.course.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnailUrl: true,
        duration: true,
      },
      orderBy: { title: 'asc' },
    });
  }

  findAllAdmin() {
    return this.prisma.course.findMany({
      include: { _count: { select: { enrollments: true, exams: true } } },
      orderBy: { title: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: { exams: { select: { id: true, title: true, passingScore: true } } },
    });
    if (!course || !course.isPublished) throw new NotFoundException('Course not found');
    return course;
  }

  create(dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...dto,
        modules: dto.modules as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.prisma.course.findUniqueOrThrow({ where: { id } });
    const { modules, ...rest } = dto;
    return this.prisma.course.update({
      where: { id },
      data: {
        ...rest,
        ...(modules !== undefined ? { modules: modules as Prisma.InputJsonValue } : {}),
      },
    });
  }
}
