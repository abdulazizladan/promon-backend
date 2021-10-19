import { User } from "src/users/entity/user.entity";
import { Scope } from "src/users/type/scope.type";
import {MigrationInterface, QueryRunner} from "typeorm";

export class adminUser1634599116606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.insert<User>(User, {
            firstName: 'admin', 
            lastName: 'admin',
            username: 'admin',
            email: 'admin@promon.demo',
            scope: Scope.ADMINISTRATOR,
            password: '$2b$10$A26kjAopsFS6Qhl9lipcGe7mMv5lKpsNrcYWMHHXMddX2Nr/Gi1mC',
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
