import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userTable1634565648333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '36',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'is_blocked',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'reset_password',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'scope',
                    type: 'varchar',
                    length: '36',
                    isNullable: false
                },
                {
                    name: 'role_name',
                    type: 'varchar',
                    length: '36',
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
                    isNullable: true
                },
                {
                    name: 'last_updated_by',
                    type: 'int',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['role_name'],
                    referencedColumnNames: ['name'],
                    referencedTableName: 'role'
                }
            ],
            indices: [
                {
                    columnNames: ['username'],
                    isUnique: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('user');
    }
}
