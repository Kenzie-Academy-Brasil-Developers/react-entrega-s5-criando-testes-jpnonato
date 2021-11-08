import {screen, render, fireEvent} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Search from '../components/Search'
import Adress from '../components/Cep/index'
import api from '../services'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'


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
        apiMock.onGet("/21820170").replyOnce(200,[{}])
        render(<Search />)
        render( <Adress />) 
        const input =  screen.getByPlaceholderText("Insira o CEP") 
        const button = screen.getByRole("button")
        const inputSearch = screen.queryByTestId("inputSearch") 
        
        userEvent.type(input, "21820170") 
        userEvent.click(button) 

       expect(inputSearch).toBeInTheDocument()
       

    })   
})

