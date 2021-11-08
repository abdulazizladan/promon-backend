import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class project1635177067414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'project',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'beneficiary',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                },
                {
                    name: 'budget',
                    type: 'decimal',
                    precision: 15,
                    scale: 2,
                    default: '0'
                },
                {
                    name: 'state',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                },
                {
                    name: 'street_address',
                    type: 'varchar',
                    length: '512',
                    isNullable: true
                },
                {
                    name: 'lga',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'last_updated_by',
                    type: 'int',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['created_by'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user'
                },
                {
                    columnNames: ['last_updated_by'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('project');
    }

}
