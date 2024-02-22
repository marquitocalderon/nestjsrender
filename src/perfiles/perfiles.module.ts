import { Module } from '@nestjs/common';
import { PerfilesController } from './perfiles.controller';
import { PerfilesService } from './perfiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilesEntity } from './perfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilesEntity])],
  controllers: [PerfilesController],
  providers: [PerfilesService],
  exports: [PerfilesService]
})
export class PerfilesModule {}
