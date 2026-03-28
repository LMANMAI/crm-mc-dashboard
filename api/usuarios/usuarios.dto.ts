export interface UsuarioDTO {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'cliente';
}
