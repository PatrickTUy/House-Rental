import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { QueryRepository } from '../neo4j/query.repository';

@Injectable()
export class MigrationService {
  constructor(private readonly queryRepo: QueryRepository) {}

  async seeds(data: string): Promise<any> {
    try {
      await this.queryRepo.initQuery().raw(data).run();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
