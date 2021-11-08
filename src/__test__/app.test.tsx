import {screen, render, fireEvent, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Search from '../components/Search'
import Adress from '../components/Cep/index'
import api from '../services'
import App from '../App'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Providers from '../providers'


const apiMock = new MockAdapter(api)

jest.mock("../providers/CepProvider", () => {
    return{
        useLocateCep: () =>({
            setCepNumber: jest.fn(),
            ceps: jest.fn(),
            handleSearch: jest.fn() 
        })
    
    }
})

describe("when everything is ok", () => { 
    
    test("when nothing is typed in the input, the button must be desable", () => {
    
        render(<Search />)
       expect(screen.getByRole("button")).toBeDisabled();

    })

    test("when some word is typed in the input, it value must be null", () => {
     
        render(<Search />)
        const input =  screen.getByPlaceholderText("Insira o CEP")
        userEvent.type(input,"batata")
       expect(input).toHaveValue(null);

    })
    test("when a number is typed in the input, its value must be this number",  () => {
     
        render(<Search />)
        const input =  screen.getByPlaceholderText("Insira o CEP")
        userEvent.type(input, ("212121"))  
        expect(input).toHaveValue(212121)  
      

    }) 
    test("when a available CEP is typed and the user click the button, will apear 6  new input's text ", async() => {
        apiMock.onGet("21820170").replyOnce(200, {"bairro": "Bangu", "cidade": "Rio de Janeiro", "logradouro": "Rua dos Tintureiros", "estado_info": {"area_km2": "43.781,566", "codigo_ibge": "33", "nome": "Rio de Janeiro"}, "cep": "21820170", "cidade_info": {"area_km2": "1200,179", "codigo_ibge": "3304557"}, "estado": "RJ"})
        render(
            <Providers>
              <App />
            </Providers>
          );
        const input =  screen.getByPlaceholderText("Insira o CEP") 
        const button = screen.getByRole("button")
        const form = await screen.queryByTestId("inputSearch") 

        userEvent.type(input, "21820170")   
        userEvent.click(button) 

        await waitFor(() => {
            expect(input).toHaveValue(21820170)    
                 
            expect(screen.getByDisplayValue('Rua dos Tintureiros')).toBeInTheDocument() 
        })

       

    })   
})

