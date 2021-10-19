import { table } from "console";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class roleTable1634565643836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'role',
            columns: [
                {
                    name: 'name',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        queryRunner.createTable(new Table({
            name: 'role-permission',
            columns: [
                {
                    name: 'role_name',
                    type: 'varchar',
                    length: '32',
                    isNullable: false
                },
                {
                    name: 'permission_name',
                    type: 'varchar',
                    length: '16',
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['role_name'],
                    referencedColumnNames: ['name'],
                    referencedTableName: 'role',
                    onDelete: 'CASCADE'
                },
                {
                    columnNames: ['permission_name'],
                    referencedColumnNames: ['name'],
                    referencedTableName: 'permission',
                    onDelete: 'CASCADE'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('role-permission');
        queryRunner.dropTable('role');
    }

}
