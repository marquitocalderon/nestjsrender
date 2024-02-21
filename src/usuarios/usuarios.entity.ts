import { PerfilesEntity } from "src/perfiles/perfiles.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "usuarios"})
export class UsuariosEntity {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ length: 16 , unique: true}) // Especifica la longitud máxima de la columna usuario
    usuario: string;

    @Column() // Especifica la longitud máxima de la columna password
    password: string;

    @Column({default: true})
    estado_usuario: boolean;

    @ManyToOne(() => PerfilesEntity, (perfil) => perfil.id_perfil, {
        // cascade: true,
        eager: true, // para que traiga todos los datos de la columna relacionada
      })
    @JoinColumn({name: "idperfil"})
    perfiles: PerfilesEntity

    

}
