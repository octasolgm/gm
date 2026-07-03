import { Controller, Get } from '@nestjs/common';
import {
  profile,
  experiences,
  education,
  skillCategories,
  projects,
  responsibilities,
} from '../data/portfolio';

@Controller('portfolio')
export class PortfolioController {
  @Get()
  getAll() {
    return {
      profile,
      experiences,
      education,
      skillCategories,
      projects,
      responsibilities,
    };
  }
}
