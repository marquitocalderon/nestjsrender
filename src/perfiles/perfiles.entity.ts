import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "perfiles"})
export class PerfilesEntity {

    @PrimaryGeneratedColumn()
    id_perfil: number;

    @Column({unique: true})
    nombre_perfil: string;

    @Column({default: true})
    estado_perfil: boolean;

    @OneToMany(() => UsuariosEntity, (usuario) => usuario.perfiles)
    usuarios: UsuariosEntity[];

}