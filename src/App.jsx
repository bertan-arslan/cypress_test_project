import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody } from 'reactstrap';
import './App.css'

const formInitial = {
  email: "",
  password: "",
  terms: false
}

function App() {

  const [formData, setFormData] = useState(formInitial)

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }


  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  return (
    <Card>
      <CardTitle tag="h5">
      Kayıt ol
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">
              Eposta:
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Eposta adresinizi giriniz"
              type="email"
              onChange = {handleChange}
              value={formData.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Şifre:
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Güçlü bir şifre seçiniz"
              type="password"
              onChange = {handleChange}
              value={formData.password}
            />
          </FormGroup>
          <FormGroup check>
            <Input 
              type="checkbox"
              id="password"
              name="password"
              onChange = {handleChange}
              checked={formData.terms}
            />
            <Label check for="terms">
              Kullanım koşullarını, gizlilik politikasını ve KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum.
            </Label>
          </FormGroup>
          <Button>
          Kayıt ol
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default App
