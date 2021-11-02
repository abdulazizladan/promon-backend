import { User } from "src/auth/user.decorator";
import { Connection, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
  .from(User, 'user')
  .select('user.id', 'id')
  .addSelect('user.username', 'username')
  .addSelect('user.email', 'email')
  .addSelect('user.phone', 'phone')
  .addSelect('user.first_name', 'first_name')
  .addSelect('user.last_name', 'last_name')
})
export class UserShortView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  username: string;

  @ViewColumn()
  phone: string;

  @ViewColumn()
  email: string;

  @ViewColumn({name: 'first_name'})
  firstName: string;

  @ViewColumn({name: 'last_name'})
  lastName: string;
}