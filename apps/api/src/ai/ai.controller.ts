import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  chat(@Body() dto: ChatDto, @Request() req: { user?: { sub: string } }) {
    const userId = req.user?.sub;
    return this.aiService.chat(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  getSessions(@Request() req: { user: { sub: string } }) {
    return this.aiService.getSessions(req.user.sub);
  }

  @Get('sessions/:id/messages')
  getHistory(@Param('id') id: string) {
    return this.aiService.getHistory(id);
  }
}
