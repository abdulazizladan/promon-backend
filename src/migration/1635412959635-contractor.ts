import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class contractor1635412959635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'contractor',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'rc_number',
                    type: 'varchar',
                    length: '64',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'contacts',
                    type: 'jsonb',
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
        queryRunner.dropTable('contractor');
    }

}
