import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { AuditsModule } from './audits/audits.module';
import { CoursesModule } from './courses/courses.module';
import { HealthModule } from './health/health.module';
import { CrmModule } from './crm/crm.module';
import { ExamsModule } from './exams/exams.module';
import { CertificatesModule } from './certificates/certificates.module';
import { SessionsModule } from './sessions/sessions.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    AuditsModule,
    CoursesModule,
    HealthModule,
    CrmModule,
    ExamsModule,
    CertificatesModule,
    SessionsModule,
    AiModule,
  ],
})
export class AppModule {}
