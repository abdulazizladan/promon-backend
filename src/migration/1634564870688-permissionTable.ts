import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class permissionTable1634564870688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'permission',
            columns: [
                {
                    name: 'name',
                    type: 'varchar',
                    length: '16',
                    isPrimary: true
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '64'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('permission');
    }
}
