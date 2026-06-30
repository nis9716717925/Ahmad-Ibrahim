import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { EnrollDto } from './dto/enroll.dto';

@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('enrollments/me')
  myEnrollments(@Request() req: { user: { sub: string } }) {
    return this.examsService.getMyEnrollments(req.user.sub);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.examsService.findByCourse(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOneForStudent(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateExamDto) {
    return this.examsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('enroll')
  enroll(@Request() req: { user: { sub: string } }, @Body() dto: EnrollDto) {
    return this.examsService.enroll(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/submit')
  submit(
    @Param('id') id: string,
    @Request() req: { user: { sub: string } },
    @Body() dto: SubmitExamDto,
  ) {
    return this.examsService.submitAttempt(req.user.sub, id, dto);
  }
}
