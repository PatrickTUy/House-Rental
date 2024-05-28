import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MigrationService } from '../migration.service';

@Injectable()
export class UserSeed {
  constructor(private readonly migrationService: MigrationService) {}

  @Command({
    command: 'seed:user',
    describe: 'seed users',
  })
  async seeds(): Promise<void> {
    const dataString = `
    CREATE (user1:User {
      id:'seed 1',
      fname:'LaFlare',
      lname:'TUYISHIMIRE',
      type:'owner',
      phone:'0789810670',
      email:'laflare@gmail.com',
      password:'password'
    })

    CREATE (user2:User {
      id:'seed 2',
      fname:'Doe',
      lname:'JOHN',
      type:'owner',
      phone:'0788393032',
      email:'johndoe@gmail.com',
      password:'password'
    })

    CREATE (user3:User {
      id:'seed 3',
      fname:'Doe',
      lname:'JANE',
      type:'client',
      phone:'0783903030',
      email:'janedoe@gmail.com',
      password:'password'
    })

    RETURN true
    `;

    try {
      await this.migrationService.seeds(dataString);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Command({
    command: 'remove:user',
    describe: 'Remove users',
  })
  async remove(): Promise<void> {
    const dataString = `
    MATCH (user:User) DETACH DELETE user
    `;
    try {
      await this.migrationService.seeds(dataString);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  }
}
