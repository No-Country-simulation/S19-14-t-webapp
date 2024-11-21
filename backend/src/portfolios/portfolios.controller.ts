import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    const portfolioData = {
      ...createPortfolioDto,
      user_id: id,
    };
    return this.portfoliosService.create(portfolioData);
  }

  @Get('all/:id')
  findAllByUser(@Param('id') id: string) {
    return this.portfoliosService.findAllByUser(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfoliosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfoliosService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfoliosService.remove(+id);
  }
}
