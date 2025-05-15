import FormularioNota from '@/components/FormularioNota';
import ModalBienvenida from '@/components/ModalBienvenida';

export default function PaginaPrincipal() {
  return (
    <main>
      <ModalBienvenida />
      <FormularioNota />
    </main>
  );
}
