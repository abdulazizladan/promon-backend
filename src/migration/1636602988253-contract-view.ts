import {Connection, MigrationInterface, QueryRunner} from "typeorm";
import { View } from "typeorm/schema-builder/view/View";

export class contractView1636602988253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createView(new View({
            name: 'contract_view',
            expression: (connection: Connection) => connection.createQueryBuilder()
                .select('contract.id', 'id')
                .addSelect('contract.start_date', 'start_date')
                .addSelect('contract.end_date', 'end_date')
                .addSelect('contract.project_id', 'project_id')
                .addSelect('contract.contractor_id', 'contractor_id')
                .addSelect('contractor.name', 'contractor_name')
                .addSelect('project.title', 'project_title')
                .from('contract', 'contract')
                .leftJoin('project', 'project', 'project.id = contract.project_id')
                .leftJoin('contractor', 'contractor', 'contractor.id = contract.contractor_id')
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropView('contract_view');
    }

}
