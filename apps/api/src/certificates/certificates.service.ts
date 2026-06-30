import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.certificate.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        enrollment: { include: { course: { select: { title: true } } } },
      },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const cert = await this.prisma.certificate.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        enrollment: { include: { course: true } },
      },
    });
    if (!cert) throw new NotFoundException('Certificate not found');
    return cert;
  }

  async issueForEnrollment(enrollmentId: string) {
    const existing = await this.prisma.certificate.findUnique({ where: { enrollmentId } });
    if (existing) return existing;

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { user: true, course: true },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');

    const count = await this.prisma.certificate.count();
    const certificateNo = `CERT-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;

    return this.prisma.certificate.create({
      data: {
        certificateNo,
        userId: enrollment.userId,
        enrollmentId,
      },
    });
  }

  async streamPdf(id: string, res: Response) {
    const cert = await this.findOne(id);
    const name = `${cert.user.firstName} ${cert.user.lastName}`;
    const courseTitle = cert.enrollment.course.title;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${cert.certificateNo}.pdf"`);

    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 });
    doc.pipe(res);

    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke('#1349e1');
    doc.fontSize(14).fillColor('#1349e1').text('Ahmad Ibrahim', { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(28).fillColor('#1349e1').text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).fillColor('#333').text('This certifies that', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(24).fillColor('#000').text(name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('has successfully completed', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(20).fillColor('#1349e1').text(courseTitle, { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(12).fillColor('#666').text(`Certificate No: ${cert.certificateNo}`, { align: 'center' });
    doc.text(`Issued: ${cert.issuedAt.toLocaleDateString()}`, { align: 'center' });

    doc.end();
  }
}
