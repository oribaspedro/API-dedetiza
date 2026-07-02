import Employee from "@modules/employees/typeorm/entities/Employee";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('services')
export default class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    client: string;

    @Column()
    address: string;

    @Column()
    type: string;

    @Column('decimal')
    price: number;

    @ManyToOne(() => Employee)
    @JoinColumn({name: 'employee_in_charge_id'})
    employeeInCharge: Employee;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}