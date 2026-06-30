import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { EnrollDto } from './dto/enroll.dto';
import { CertificatesService } from '../certificates/certificates.service';

type ExamQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

@Injectable()
export class ExamsService {
  constructor(
    private prisma: PrismaService,
    private certificates: CertificatesService,
  ) {}

  findByCourse(courseId: string) {
    return this.prisma.exam.findMany({
      where: { courseId },
      select: {
        id: true,
        title: true,
        passingScore: true,
        timeLimitMin: true,
        createdAt: true,
      },
    });
  }

  async findOneForStudent(examId: string) {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) throw new NotFoundException('Exam not found');
    const questions = (exam.questions as ExamQuestion[]).map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));
    return {
      id: exam.id,
      courseId: exam.courseId,
      title: exam.title,
      passingScore: exam.passingScore,
      timeLimitMin: exam.timeLimitMin,
      questions,
    };
  }

  create(dto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        courseId: dto.courseId,
        title: dto.title,
        questions: dto.questions as Prisma.InputJsonValue,
        passingScore: dto.passingScore ?? 70,
        timeLimitMin: dto.timeLimitMin,
      },
    });
  }

  async enroll(userId: string, dto: EnrollDto) {
    const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');

    return this.prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId: dto.courseId } },
      create: { userId, courseId: dto.courseId, organizationId: dto.organizationId },
      update: {},
      include: { course: { select: { title: true, slug: true } } },
    });
  }

  getMyEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
        certificate: true,
        examAttempts: { orderBy: { completedAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async submitAttempt(userId: string, examId: string, dto: SubmitExamDto) {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) throw new NotFoundException('Exam not found');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: exam.courseId } },
    });
    if (!enrollment) throw new BadRequestException('You must enroll in the course first');

    const questions = exam.questions as ExamQuestion[];
    let correct = 0;
    for (const q of questions) {
      if (dto.answers[q.id] === q.correctIndex) correct++;
    }
    const score = questions.length ? (correct / questions.length) * 100 : 0;
    const passed = score >= exam.passingScore;

    const attempt = await this.prisma.examAttempt.create({
      data: {
        examId,
        enrollmentId: enrollment.id,
        answers: dto.answers,
        score,
        passed,
      },
    });

    await this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        examScore: score,
        status: passed ? EnrollmentStatus.COMPLETED : EnrollmentStatus.FAILED,
        progress: passed ? 100 : enrollment.progress,
        completedAt: passed ? new Date() : undefined,
      },
    });

    let certificate = null;
    if (passed) {
      certificate = await this.certificates.issueForEnrollment(enrollment.id);
    }

    return { attempt, score, passed, certificate };
  }
}
