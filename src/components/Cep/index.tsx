import { useLocateCep } from "../../providers/CepProvider";
import { Divider, Form, Input, Label, Header } from "semantic-ui-react";

const Address = () => {
  const { ceps } = useLocateCep();

  return (
    <>
      <Divider horizontal>Endereço buscado</Divider>

      {ceps.cep && (
        <div className="Address">
          <Form>
            <Form.Field inline>
              <Header size="small">Logradouro</Header>
              <Input fluid value={ceps.logradouro} />
            </Form.Field>
            <Form.Field inline>
              <Header size="small">Número</Header>
              <Input fluid />
              {ceps.complemento ? (
                <Label basic color="red" pointing>
                  {ceps.complemento}
                </Label>
              ) : (
                <Label basic color="red" pointing>
                  Toda a extensão
                </Label>
              )}
              <Form.Field inline>
                <Header size="small">Complemento</Header>
                <Input fluid placeholder="Apartamento, bloco, ..." on />
              </Form.Field>
            </Form.Field>
            <Form.Field inline>
              <Header size="small">Bairro</Header>
              <Input fluid value={ceps.bairro} />
            </Form.Field>
            <Form.Field inline>
              <Header size="small">Cidade</Header>
              <Input fluid value={ceps.cidade} />
            </Form.Field>
            <Form.Field inline>
              <Header size="small">Estado</Header>
              <Input fluid value={ceps.estado} />
            </Form.Field>
          </Form>
        </div>
      )}
    </>
  );
};

export default Address;
