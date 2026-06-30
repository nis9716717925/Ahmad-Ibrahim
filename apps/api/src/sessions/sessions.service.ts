import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

function generateMeetCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const part = () =>
    Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${part()}-${part()}-${part()}`;
}

@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  findAll(upcomingOnly = false) {
    return this.prisma.liveSession.findMany({
      where: upcomingOnly ? { scheduledAt: { gte: new Date() } } : undefined,
      include: {
        course: { select: { id: true, title: true, slug: true } },
        host: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.liveSession.findUnique({
      where: { id },
      include: {
        course: true,
        host: { select: { firstName: true, lastName: true, email: true } },
      },
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  create(dto: CreateSessionDto, hostId?: string) {
    const meetCode = generateMeetCode();
    const baseUrl = this.config.get('GOOGLE_MEET_BASE_URL', 'https://meet.google.com');
    const meetLink = `${baseUrl}/${meetCode}`;

    return this.prisma.liveSession.create({
      data: {
        courseId: dto.courseId,
        title: dto.title,
        description: dto.description,
        meetLink,
        meetCode,
        scheduledAt: new Date(dto.scheduledAt),
        durationMin: dto.durationMin ?? 60,
        hostId,
      },
      include: { course: { select: { title: true } } },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.liveSession.delete({ where: { id } });
  }
}
