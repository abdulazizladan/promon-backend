import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class contract1636595976093 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'contract',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'project_id',
                    type: 'varchar',
                    length: '36',
                    isNullable: false
                },
                {
                    name: 'contractor_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'start_date',
                    type: 'date',
                    isNullable: false
                },
                {
                    name: 'end_date',
                    type: 'date',
                    isNullable: false
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
                    columnNames: ['project_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'project'
                },
                {
                    columnNames: ['contractor_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'contractor'
                },
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
        queryRunner.dropTable('contract');
    }

}
