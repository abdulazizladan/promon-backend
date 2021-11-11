import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity()
export class ContractView {
  @ViewColumn()
  id: number;

  @ViewColumn({name: 'start_date'})
  startDate: Date;

  @ViewColumn({name: 'end_date'})
  endDate: Date;

  @ViewColumn({name: 'project_id'})
  projectId: string;

  @ViewColumn({name: 'project_title'})
  projectTitle: string;

  @ViewColumn({name: 'contractor_id'})
  contractorId: number;

  @ViewColumn({name: 'contractor_name'})
  contractorName: string;
}