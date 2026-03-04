import { Module } from '@nestjs/common';
import * as Modules from './index';

@Module({
  imports: Object.values(Modules),
  controllers: [],
  providers: [],
})
export class ModulesModule {}