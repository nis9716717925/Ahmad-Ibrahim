import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { ChatDto } from './dto/chat.dto';

const KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['audit', 'checklist', 'inspection'],
    answer:
      'Audits use configurable checklists per service type (food safety, pest control, etc.). Open an audit from Admin → Audits, complete each item, and submit. GPS check-in is available on mobile for field verification.',
  },
  {
    keywords: ['certificate', 'cert', 'complete'],
    answer:
      'Certificates are issued automatically when you pass a course exam (default pass score: 70%). Download your PDF from the Academy course page or Client Portal.',
  },
  {
    keywords: ['course', 'training', 'lms', 'academy'],
    answer:
      'Enroll in a course from the Academy, complete modules, take the exam, and earn your certificate. Live sessions use Google Meet links scheduled by your administrator.',
  },
  {
    keywords: ['meet', 'live', 'session', 'google'],
    answer:
      'Live training sessions appear under Academy → Live Sessions. Each session includes a Google Meet link generated when the admin schedules it.',
  },
  {
    keywords: ['corrective', 'action', 'follow'],
    answer:
      'Corrective actions are created from audit findings. Track status (Open → Resolved → Verified) in the audit detail page and client portal.',
  },
  {
    keywords: ['crm', 'lead', 'contact'],
    answer:
      'CRM leads are managed in Admin → CRM. Update status from lead to qualified, proposal, or won.',
  },
];

@Injectable()
export class AiService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async chat(userId: string | undefined, dto: ChatDto) {
    let sessionId = dto.sessionId;
    if (!sessionId) {
      const session = await this.prisma.aiChatSession.create({
        data: { userId, title: dto.message.slice(0, 50) },
      });
      sessionId = session.id;
    } else {
      const session = await this.prisma.aiChatSession.findUnique({ where: { id: sessionId } });
      if (!session) throw new NotFoundException('Session not found');
    }

    await this.prisma.aiChatMessage.create({
      data: { sessionId, role: 'user', content: dto.message },
    });

    const reply = await this.generateReply(dto.message);

    await this.prisma.aiChatMessage.create({
      data: { sessionId, role: 'assistant', content: reply },
    });

    return { sessionId, reply };
  }

  getHistory(sessionId: string) {
    return this.prisma.aiChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }

  getSessions(userId?: string) {
    return this.prisma.aiChatSession.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { updatedAt: 'desc' },
      take: 20,
    });
  }

  private async generateReply(message: string): Promise<string> {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful assistant for Ahmad Ibrahim platform — audit, consulting, and training. Answer concisely about audits, LMS, certificates, CRM, and field operations.',
              },
              { role: 'user', content: message },
            ],
            max_tokens: 400,
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
          const content = data.choices?.[0]?.message?.content;
          if (content) return content;
        }
      } catch {
        // fall through to local knowledge base
      }
    }

    const lower = message.toLowerCase();
    for (const item of KNOWLEDGE) {
      if (item.keywords.some((k) => lower.includes(k))) {
        return item.answer;
      }
    }

    return (
      'I can help with audits, checklists, training courses, exams, certificates, live Google Meet sessions, corrective actions, and CRM. ' +
      'Ask me something specific, e.g. "How do I complete an audit?" or "How do I get my certificate?"'
    );
  }
}
