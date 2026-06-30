import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const AUDIT_TYPES = [
  { name: 'Food Safety Audit', slug: 'food-safety', category: 'food_safety' },
  { name: 'Water Safety Audit', slug: 'water-safety', category: 'water_safety' },
  { name: 'Pest Control Audit', slug: 'pest-control', category: 'pest_control' },
  { name: 'Facility Inspection', slug: 'facility-inspection', category: 'facility' },
  { name: 'GMP Audit', slug: 'gmp-audit', category: 'gmp' },
  { name: 'HACCP Audit', slug: 'haccp-audit', category: 'haccp' },
  { name: 'ISO 9001 Audit', slug: 'iso-9001', category: 'iso_9001' },
  { name: 'ISO 22000 Audit', slug: 'iso-22000', category: 'iso_22000' },
  { name: 'Fire Safety Audit', slug: 'fire-safety', category: 'fire_safety' },
  { name: 'Environmental Audit', slug: 'environmental', category: 'environmental' },
  { name: 'Hygiene Inspection', slug: 'hygiene-inspection', category: 'hygiene' },
  { name: 'Internal Compliance Audit', slug: 'internal-compliance', category: 'compliance' },
];

const FULL_CHECKLIST = [
  { id: 'gi-1', section: 'General Information', question: 'Company Name verified', weight: 5 },
  { id: 'gi-2', section: 'General Information', question: 'Facility confirmed', weight: 5 },
  { id: 'gi-3', section: 'General Information', question: 'Contact Person available', weight: 5 },
  { id: 'gi-4', section: 'General Information', question: 'Audit Date documented', weight: 5 },
  { id: 'bf-1', section: 'Building & Facility', question: 'Walls clean', weight: 8 },
  { id: 'bf-2', section: 'Building & Facility', question: 'Floors maintained', weight: 8 },
  { id: 'bf-3', section: 'Building & Facility', question: 'Ceiling condition', weight: 8 },
  { id: 'bf-4', section: 'Building & Facility', question: 'Lighting adequate', weight: 8 },
  { id: 'bf-5', section: 'Building & Facility', question: 'Ventilation adequate', weight: 8 },
  { id: 'bf-6', section: 'Building & Facility', question: 'Drainage proper', weight: 8 },
  { id: 'bf-7', section: 'Building & Facility', question: 'Waste management compliant', weight: 10 },
  { id: 'fs-1', section: 'Food Safety', question: 'Storage temperature monitored', weight: 10 },
  { id: 'fs-2', section: 'Food Safety', question: 'Cold chain maintained', weight: 10 },
  { id: 'fs-3', section: 'Food Safety', question: 'Food labelling correct', weight: 8 },
  { id: 'fs-4', section: 'Food Safety', question: 'Expiry dates checked', weight: 10 },
  { id: 'fs-5', section: 'Food Safety', question: 'Cross contamination prevented', weight: 10 },
  { id: 'fs-6', section: 'Food Safety', question: 'Cleaning records up to date', weight: 8 },
  { id: 'pc-1', section: 'Pest Control', question: 'No pest activity observed', weight: 10 },
  { id: 'pc-2', section: 'Pest Control', question: 'Bait stations in place', weight: 8 },
  { id: 'pc-3', section: 'Pest Control', question: 'Rodent control effective', weight: 8 },
  { id: 'pc-4', section: 'Pest Control', question: 'Insect monitoring active', weight: 8 },
  { id: 'pc-5', section: 'Pest Control', question: 'Service records current', weight: 8 },
  { id: 'ws-1', section: 'Water Safety', question: 'Water testing completed', weight: 10 },
  { id: 'ws-2', section: 'Water Safety', question: 'Tank cleaning schedule met', weight: 8 },
  { id: 'ws-3', section: 'Water Safety', question: 'Chlorination levels correct', weight: 10 },
  { id: 'ws-4', section: 'Water Safety', question: 'Water reports available', weight: 8 },
  { id: 'st-1', section: 'Staff', question: 'PPE used correctly', weight: 10 },
  { id: 'st-2', section: 'Staff', question: 'Training records current', weight: 8 },
  { id: 'st-3', section: 'Staff', question: 'Medical certificates valid', weight: 8 },
  { id: 'st-4', section: 'Staff', question: 'Hygiene compliance observed', weight: 10 },
];

async function main() {  const passwordHash = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@connect.local' },
    update: {},
    create: {
      email: 'admin@connect.local',
      passwordHash,
      firstName: 'Platform',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
    },
  });

  const org = await prisma.organization.upsert({
    where: { id: 'seed-org-demo' },
    update: {},
    create: {
      id: 'seed-org-demo',
      name: 'Demo Foods Ltd',
      type: 'company',
      email: 'contact@demofoods.com',
      city: 'Dubai',
      country: 'UAE',
    },
  });

  let facility = await prisma.facility.findFirst({ where: { organizationId: org.id } });
  if (!facility) {
    facility = await prisma.facility.create({
      data: {
        name: 'Main Production Plant',
        address: 'Industrial Zone A',
        city: 'Dubai',
        country: 'UAE',
        latitude: 25.0657,
        longitude: 55.1713,
        organizationId: org.id,
      },
    });
  }

  const foodSafety = await prisma.serviceType.upsert({
    where: { slug: 'food-safety' },
    update: {},
    create: {
      name: 'Food Safety Audit',
      slug: 'food-safety',
      category: 'food_safety',
      description: 'HACCP and food safety compliance audits',
    },
  });

  for (const type of AUDIT_TYPES) {
    if (type.slug === 'food-safety') continue;
    await prisma.serviceType.upsert({
      where: { slug: type.slug },
      update: { name: type.name },
      create: {
        name: type.name,
        slug: type.slug,
        category: type.category,
        description: `${type.name} — comprehensive compliance inspection`,
      },
    });
  }

  let template = await prisma.checklistTemplate.findFirst({
    where: { serviceTypeId: foodSafety.id, name: 'Comprehensive Audit Checklist' },
  });
  if (!template) {
    template = await prisma.checklistTemplate.create({
      data: {
        name: 'Comprehensive Audit Checklist',
        version: 2,
        serviceTypeId: foodSafety.id,
        items: FULL_CHECKLIST,
        scoringRules: { passThreshold: 70, maxScore: 100 },
      },
    });
  } else {
    await prisma.checklistTemplate.update({
      where: { id: template.id },
      data: { items: FULL_CHECKLIST, version: 2 },
    });
  }

  const allServiceTypes = await prisma.serviceType.findMany();
  for (const st of allServiceTypes) {
    const exists = await prisma.checklistTemplate.findFirst({
      where: { serviceTypeId: st.id, name: 'Comprehensive Audit Checklist' },
    });
    if (!exists) {
      await prisma.checklistTemplate.create({
        data: {
          name: 'Comprehensive Audit Checklist',
          version: 2,
          serviceTypeId: st.id,
          items: FULL_CHECKLIST,
          scoringRules: { passThreshold: 70, maxScore: 100 },
        },
      });
    }
  }

  const existingAudit = await prisma.audit.findFirst({ where: { organizationId: org.id } });
  if (!existingAudit) {
    const audit = await prisma.audit.create({
      data: {
        referenceNumber: `AUD-${new Date().getFullYear()}-00001`,
        serviceTypeId: foodSafety.id,
        templateId: template.id,
        organizationId: org.id,
        facilityId: facility.id,
        auditorId: admin.id,
        createdById: admin.id,
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        industry: 'Food Manufacturing',
        gpsRequired: true,
        contactPerson: 'John Smith',
        siteLocation: 'Industrial Zone A, Dubai',
        scheduledAt: new Date(),
        scheduledTime: '09:00',
        startedAt: new Date(),
        sectionScores: {
          'Food Safety': 92,
          'Water Safety': 88,
          'Building & Facility': 95,
          Staff: 90,
          Overall: 91,
        },
      },
    });

    await prisma.auditTimelineEvent.createMany({
      data: [
        { auditId: audit.id, event: 'Audit Scheduled', detail: 'Initial audit scheduled' },
        { auditId: audit.id, event: 'Auditor Checked In (GPS)', detail: '25.06570, 55.17130' },
        { auditId: audit.id, event: 'Inspection Started', detail: 'On-site inspection began' },
      ],
    });

    await prisma.auditFinding.create({
      data: {
        auditId: audit.id,
        title: 'Cold chain temperature log gap',
        description: 'Missing entries for weekend monitoring',
        severity: 'HIGH',
        responsiblePerson: 'QA Manager',
        status: 'OPEN',
        aiSuggestion: 'Implement automated temperature logging with alerts for out-of-range readings.',
      },
    });

    await prisma.correctiveAction.create({
      data: {
        auditId: audit.id,
        title: 'Implement automated temperature monitoring',
        rootCause: 'Manual logging process prone to gaps',
        correctiveAction: 'Install IoT temperature sensors with cloud logging',
        preventiveAction: 'Weekly audit of temperature log completeness',
        assignedTo: 'Facilities Manager',
        severity: 'HIGH',
        status: 'OPEN',
      },
    });
  }

  const course = await prisma.course.upsert({
    where: { slug: 'haccp-fundamentals' },
    update: { isPublished: true },
    create: {
      title: 'HACCP Fundamentals',
      slug: 'haccp-fundamentals',
      description: 'Introduction to Hazard Analysis and Critical Control Points',
      duration: 480,
      isPublished: true,
      modules: [
        {
          id: 'm1',
          title: 'Introduction to HACCP',
          lessons: [
            { id: 'l1', title: 'What is HACCP?', duration: 15 },
            { id: 'l2', title: 'The 7 Principles', duration: 20 },
            { id: 'l3', title: 'Hazard Types', duration: 15 },
          ],
        },
        {
          id: 'm2',
          title: 'Critical Control Points',
          lessons: [
            { id: 'l4', title: 'Identifying CCPs', duration: 25 },
            { id: 'l5', title: 'Monitoring Procedures', duration: 20 },
          ],
        },
      ],
    },
  });

  const existingExam = await prisma.exam.findFirst({ where: { courseId: course.id } });
  if (!existingExam) {
    await prisma.exam.create({
      data: {
        courseId: course.id,
        title: 'HACCP Fundamentals Final Exam',
        passingScore: 70,
        timeLimitMin: 30,
        questions: [
          {
            id: 'q1',
            question: 'What does HACCP stand for?',
            options: [
              'Hazard Analysis Critical Control Points',
              'Health And Care Control Program',
              'Hygiene Assessment Compliance Protocol',
              'Hazard Avoidance Checklist',
            ],
            correctIndex: 0,
          },
          {
            id: 'q2',
            question: 'How many HACCP principles are there?',
            options: ['5', '7', '10', '12'],
            correctIndex: 1,
          },
          {
            id: 'q3',
            question: 'A Critical Control Point (CCP) is:',
            options: [
              'Any step where control can be applied to prevent hazards',
              'Only the final packaging step',
              'A type of pest control record',
              'An optional documentation step',
            ],
            correctIndex: 0,
          },
        ],
      },
    });
  }

  const sessionExists = await prisma.liveSession.findFirst({ where: { title: 'HACCP Live Q&A' } });
  if (!sessionExists) {
    await prisma.liveSession.create({
      data: {
        courseId: course.id,
        title: 'HACCP Live Q&A',
        description: 'Interactive live training session with instructor',
        meetLink: 'https://meet.google.com/abc-defg-hij',
        meetCode: 'abc-defg-hij',
        scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        durationMin: 60,
        hostId: admin.id,
      },
    });
  }

  const crmCount = await prisma.crmContact.count();
  if (crmCount === 0) {
    await prisma.crmContact.createMany({
      data: [
        {
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah@freshfoods.ae',
          company: 'Fresh Foods LLC',
          status: 'lead',
          source: 'website',
        },
        {
          firstName: 'Ahmed',
          lastName: 'Hassan',
          email: 'ahmed@industrial.ae',
          company: 'Industrial Co.',
          status: 'qualified',
          source: 'referral',
        },
        {
          firstName: 'Maria',
          lastName: 'Garcia',
          email: 'maria@cafegroup.com',
          company: 'Cafe Group',
          status: 'proposal',
          source: 'trade show',
        },
      ],
    });
  }

  console.log('Seed complete:', {
    admin: admin.email,
    org: org.name,
    course: course.slug,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
